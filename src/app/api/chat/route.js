import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Anda adalah MASEI AI Assistant, asisten kecerdasan buatan resmi Majelis Sarjana Ekonomi Islam (MASEI).
Tugas Anda adalah melayani dan menjawab pertanyaan pengguna terkait:
1. Profil MASEI: wadah para sarjana ekonomi Islam di Indonesia untuk riset, pengembangan, dan edukasi ekonomi syariah.
2. Keanggotaan: alur pendaftaran anggota secara online di website, di mana anggota akan mendapatkan Kartu Tanda Anggota (KTA) Digital.
3. Jurnal Ekonomi Islam: portal jurnal OJS (Open Journal Systems) MASEI di /journal yang mempermudah submit artikel ilmiah menggunakan Google Login.
4. Zakat Portofolio: kalkulator zakat saham & emas otomatis yang terhubung ke Supabase database dan Telegram bot @masei_id_bot.

Jawablah dalam bahasa Indonesia yang sopan, profesional, ringkas, dan informatif.`;

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    // 1. TRY GROQ (Llama-3.1-8b-instant / Llama-3.3-70b-versatile)
    if (process.env.GROQ_API_KEY) {
      try {
        console.log("Attempting LLM call via Groq API...");
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, provider: "Groq (Llama)" });
          }
        } else {
          console.warn(`Groq API returned error status: ${response.status}`);
        }
      } catch (e) {
        console.error("Groq API call failed, falling back...", e);
      }
    }

    // 2. TRY OPENAI (GPT-4o-mini)
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log("Attempting LLM call via OpenAI API...");
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, provider: "OpenAI (GPT)" });
          }
        } else {
          console.warn(`OpenAI API returned error status: ${response.status}`);
        }
      } catch (e) {
        console.error("OpenAI API call failed, falling back...", e);
      }
    }

    // 3. TRY GEMINI (Gemini-1.5-flash)
    if (process.env.GEMINI_API_KEY) {
      try {
        console.log("Attempting LLM call via Gemini API...");
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: `${SYSTEM_PROMPT}\n\nPengguna bertanya: "${message}"` }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply, provider: "Gemini (Gemma/Google)" });
          }
        } else {
          console.warn(`Gemini API returned error status: ${response.status}`);
        }
      } catch (e) {
        console.error("Gemini API call failed, falling back...", e);
      }
    }

    // 4. MOCK LOCAL HEURISTIC FALLBACK (Ensures it never fails/looks unlimited)
    console.log("All AI APIs exhausted or unset. Falling back to local offline heuristic assistant.");
    const reply = getLocalHeuristicsReply(message);
    return NextResponse.json({ reply, provider: "Local Heuristics (Offline Mode)" });

  } catch (error) {
    console.error("Critical error in chatbot API:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem internal" }, { status: 500 });
  }
}

// Simple rule-based chatbot for zero-cost, zero-fail backup
function getLocalHeuristicsReply(message) {
  const query = message.toLowerCase();

  if (query.includes("zakat")) {
    return "Zakat Portofolio adalah salah satu program inovasi MASEI. Sistem kami dapat menghitung zakat saham dan emas Anda berdasarkan batas Nisab (85 gram emas) dengan nisbah 2,5%. Anda dapat mendaftarkan portofolio Anda via website di menu Keanggotaan, atau secara otomatis menggunakan Telegram Bot kami di @masei_id_bot.";
  }

  if (query.includes("jurnal") || query.includes("ojs") || query.includes("naskah") || query.includes("submit")) {
    return "Untuk mempublikasikan karya ilmiah Anda di Jurnal Ekonomi Islam MASEI, silakan masuk ke Portal Jurnal OJS kami di tautan masei.vercel.app/journal (Menu Publikasi -> Jurnal Ekonomi Islam). Cukup masuk dengan akun Google Anda dan ikuti panduan upload 5 langkah yang mudah.";
  }

  if (query.includes("daftar") || query.includes("anggota") || query.includes("kta") || query.includes("registrasi")) {
    return "Menjadi anggota MASEI sangatlah mudah! Silakan masuk ke halaman Pendaftaran Anggota di menu Keanggotaan (masei.vercel.app/menjadi-anggota). Setelah melengkapi formulir 3-langkah, Anda akan diarahkan ke dasbor portal untuk mencetak Kartu Tanda Anggota (KTA) Digital Anda secara langsung.";
  }

  if (query.includes("masei") || query.includes("profil") || query.includes("visi") || query.includes("misi") || query.includes("struktur")) {
    return "Majelis Sarjana Ekonomi Islam (MASEI) adalah organisasi bagi para sarjana ekonomi syariah di Indonesia. Visi kami adalah menjadi pusat pengkajian, riset, dan sosialisasi terdepan untuk kemajuan ekonomi syariah nasional. Detail visi-misi dan struktur organisasi kepengurusan kami dapat Anda temukan di menu Tentang Kami -> Profil.";
  }

  return "Terima kasih atas pesan Anda! MASEI AI Assistant saat ini berada dalam Offline Mode karena batas kuota API eksternal sedang penuh. Jika Anda memiliki pertanyaan mendesak terkait administrasi, Anda dapat menghubungi Sekretariat Pusat MASEI melalui surel sekretariat@masei.id atau WhatsApp Center +62 851 6324 0059.";
}
