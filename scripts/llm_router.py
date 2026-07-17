import os
import re
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

def sanitize_reply(reply):
    if not reply:
        return reply
    # 1. Remove all asterisks (* and **)
    cleaned = reply.replace("*", "")
    # 2. Remove the word "Supabase" (case-insensitive)
    cleaned = re.sub(r'supabase', 'sistem database', cleaned, flags=re.IGNORECASE)
    # 3. Append Telegram bot notice
    cleaned = cleaned.strip() + "\n\nJika belum puas atau ingin konsultasi interaktif, silakan lanjut ke Telegram Bot kami di @masei_id_bot."
    return cleaned

SYSTEM_PROMPT = """Anda adalah MASEI AI Assistant, asisten kecerdasan buatan resmi Majelis Sarjana Ekonomi Islam (MASEI).
Tugas Anda adalah melayani dan menjawab pertanyaan pengguna terkait:
1. Profil MASEI: wadah para sarjana ekonomi Islam di Indonesia untuk riset, pengembangan, dan edukasi ekonomi syariah.
2. Keanggotaan: alur pendaftaran anggota secara online di website, di mana anggota akan mendapatkan Kartu Tanda Anggota (KTA) Digital.
3. Jurnal Ekonomi Islam: portal jurnal OJS (Open Journal Systems) MASEI di /journal yang mempermudah submit artikel ilmiah menggunakan Google Login.
4. Zakat Portofolio: kalkulator zakat saham & emas otomatis yang terhubung ke sistem database kami dan Telegram bot @masei_id_bot.

PENTING: Jangan pernah menggunakan format markdown seperti tanda bintang (* atau **) untuk menebalkan/memiringkan teks. Berikan respon dalam bentuk teks biasa (plain text). Jangan pernah menggunakan kata "Supabase", gantilah dengan "sistem database" atau "database kami".

Jawablah dalam bahasa Indonesia yang sopan, profesional, ringkas, dan informatif."""

@app.route('/chat', methods=['POST'])
def chat_router():
    try:
        data = request.get_json()
        message = data.get('message')
        if not message:
            return jsonify({"error": "Pesan tidak boleh kosong"}), 400

        # 1. TRY GROQ
        groq_key = os.getenv("GROQ_API_KEY")
        if groq_key:
            try:
                print("[ROUTER] Mencoba Groq API...")
                url = "https://api.groq.com/openai/v1/chat/completions"
                headers = {
                    "Authorization": f"Bearer {groq_key}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": "llama-3.1-8b-instant",
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": message}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 500
                }
                res = requests.post(url, json=payload, timeout=5)
                if res.status_code == 200:
                    result = res.json()
                    reply = result['choices'][0]['message']['content']
                    return jsonify({"reply": sanitize_reply(reply), "provider": "Groq (Llama)"})
                else:
                    print(f"[ROUTER] Groq gagal dengan kode status {res.status_code}")
            except Exception as e:
                print(f"[ROUTER] Pengecualian terjadi pada Groq: {e}")

        # 2. TRY OPENAI
        openai_key = os.getenv("OPENAI_API_KEY")
        if openai_key:
            try:
                print("[ROUTER] Mencoba OpenAI API...")
                url = "https://api.openai.com/v1/chat/completions"
                headers = {
                    "Authorization": f"Bearer {openai_key}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": message}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 500
                }
                res = requests.post(url, json=payload, timeout=5)
                if res.status_code == 200:
                    result = res.json()
                    reply = result['choices'][0]['message']['content']
                    return jsonify({"reply": sanitize_reply(reply), "provider": "OpenAI (GPT)"})
                else:
                    print(f"[ROUTER] OpenAI gagal dengan kode status {res.status_code}")
            except Exception as e:
                print(f"[ROUTER] Pengecualian terjadi pada OpenAI: {e}")

        # 3. TRY GEMINI
        gemini_key = os.getenv("GEMINI_API_KEY")
        if gemini_key:
            try:
                print("[ROUTER] Mencoba Gemini API...")
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
                headers = {"Content-Type": "application/json"}
                payload = {
                    "contents": [
                        {
                            "role": "user",
                            "parts": [{"text": f"{SYSTEM_PROMPT}\n\nPengguna bertanya: \"{message}\""}]
                        }
                    ]
                }
                res = requests.post(url, json=payload, timeout=5)
                if res.status_code == 200:
                    result = res.json()
                    reply = result['candidates'][0]['content']['parts'][0]['text']
                    return jsonify({"reply": sanitize_reply(reply), "provider": "Gemini (Google)"})
                else:
                    print(f"[ROUTER] Gemini gagal dengan kode status {res.status_code}")
            except Exception as e:
                print(f"[ROUTER] Pengecualian terjadi pada Gemini: {e}")

        # 4. HEURISTIC FALLBACK (Offline mode)
        print("[ROUTER] Semua API limit/tidak tersedia. Menjalankan fallback offline...")
        reply = get_local_fallback(message)
        return jsonify({"reply": sanitize_reply(reply), "provider": "Local Heuristics (Offline Mode)"})

    except Exception as error:
        print(f"[ROUTER] Galat internal: {error}")
        return jsonify({"error": "Terjadi kesalahan internal"}), 500

def get_local_fallback(message):
    query = message.lower()
    if "zakat" in query:
        return "Zakat Portofolio adalah salah satu program inovasi MASEI. Sistem kami dapat menghitung zakat saham dan emas Anda berdasarkan batas Nisab (85 gram emas) dengan nisbah 2,5%. Anda dapat mendaftarkan portofolio Anda via website di menu Keanggotaan."
    if "jurnal" in query or "ojs" in query or "naskah" in query:
        return "Untuk mempublikasikan karya ilmiah Anda di Jurnal Ekonomi Islam MASEI, silakan masuk ke Portal Jurnal OJS kami di tautan masei.vercel.app/journal (Menu Publikasi -> Jurnal Ekonomi Islam). Cukup masuk dengan akun Google Anda dan ikuti panduan upload 5 langkah yang mudah."
    if "daftar" in query or "anggota" in query or "kta" in query:
        return "Menjadi anggota MASEI sangatlah mudah! Silakan masuk ke halaman Pendaftaran Anggota di menu Keanggotaan (masei.vercel.app/menjadi-anggota). Setelah melengkapi formulir 3-langkah, Anda akan diarahkan ke dasbor portal untuk mencetak Kartu Tanda Anggota (KTA) Digital Anda secara langsung."
    return "Terima kasih atas pesan Anda! MASEI AI Assistant saat ini berada dalam Offline Mode karena batas kuota API eksternal sedang penuh. Hubungi Sekretariat Pusat MASEI melalui surel sekretariat@masei.id atau WhatsApp Center +62 851 6324 0059."

if __name__ == '__main__':
    # Run the server locally on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
