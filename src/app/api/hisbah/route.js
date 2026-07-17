import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

export async function GET(request) {
  try {
    // 1. Simulasi ambil data dari API eksternal (misal hargapangan.id)
    const hargaHariIni = 15000; // Contoh harga beras naik
    const komoditas = "Beras";

    // 2. Ambil harga kemarin dari Supabase
    const { data: dataKemarin, error: readError } = await supabase
      .from("harga_komoditas")
      .select("harga")
      .eq("komoditas", komoditas)
      .order("tanggal", { ascending: false })
      .limit(1);

    if (readError) {
      console.error("Error reading from Supabase:", readError);
    }

    const hargaKemarin = dataKemarin?.[0]?.harga || 14000;

    // 3. Kalkulasi persentase kenaikan
    const persenNaik = ((hargaHariIni - hargaKemarin) / hargaKemarin) * 100;

    // 4. Jika naik > 5%, kirim alert ke Telegram
    if (persenNaik > 5) {
      const pesan = `⚠️ *Peringatan Hisbah*\nHarga ${komoditas} melonjak ${persenNaik.toFixed(2)}% menjadi Rp${hargaHariIni}. Cek indikasi penimbunan pasar!`;
      
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: pesan, parse_mode: "Markdown" })
      });
    }

    // 5. Simpan harga hari ini ke database
    const { error: insertError } = await supabase
      .from("harga_komoditas")
      .insert([{ komoditas, harga: hargaHariIni }]);

    if (insertError) {
      console.error("Error inserting to Supabase:", insertError);
    }

    return NextResponse.json({ status: "Pengecekan Hisbah selesai", persenNaik });
  } catch (error) {
    console.error("Internal server error in Hisbah route handler:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 });
  }
}

// Support POST triggers as well (e.g. manually testing from tools)
export async function POST(request) {
  return GET(request);
}
