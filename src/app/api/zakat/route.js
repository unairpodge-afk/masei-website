import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

let supabase;
function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase environment variables (SUPABASE_URL, SUPABASE_KEY) are missing.");
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const message = body.message;
    if (!message || !message.text) {
      return new Response("OK", { status: 200 });
    }

    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/cekzakat") {
      // 1. Ambil data portofolio dari Supabase
      const { data: user, error: dbError } = await getSupabaseClient()
        .from("portofolio_zakat")
        .select("*")
        .eq("chat_id", chatId)
        .single();

      if (dbError || !user) {
        console.warn("User portfolio not found or error reading Supabase:", dbError);
        await kirimTelegram(chatId, "Maaf, data portofolio zakat Anda belum terdaftar di sistem.");
        return new Response("OK", { status: 200 });
      }

      // 2. Simulasi tarik harga API (Bisa diganti dengan fetch ke API betulan)
      const hargaSaham = 2500; // Contoh harga BRIS
      const hargaEmas = 1200000; // Harga emas per gram hari ini

      // 3. Kalkulasi Zakat
      const totalNilaiSaham = user.jumlah_lot * 100 * hargaSaham;
      const totalNilaiEmas = user.gram_emas * hargaEmas;
      const totalHarta = totalNilaiSaham + totalNilaiEmas;
      
      const nisab = 85 * hargaEmas; // Nisab 85 gram emas
      
      let balasan = `📊 *Laporan Zakat Portofolio*\n\n`;
      balasan += `- Total Harta: Rp${totalHarta.toLocaleString("id-ID")}\n`;
      balasan += `- Nisab Saat Ini: Rp${nisab.toLocaleString("id-ID")}\n\n`;

      if (totalHarta >= nisab) {
        const wajibZakat = totalHarta * 0.025; // 2.5%
        balasan += `✅ *Status: WAJIB ZAKAT*\nNominal yang harus dibayar: *Rp${wajibZakat.toLocaleString("id-ID")}*`;
      } else {
        balasan += `❌ *Status: BELUM WAJIB ZAKAT*\nHarta Anda belum mencapai nisab.`;
      }

      await kirimTelegram(chatId, balasan);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Internal server error in Zakat webhook bot:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Fungsi helper untuk mengirim pesan balik ke Telegram
async function kirimTelegram(chatId, text) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "Markdown" })
    });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
}
