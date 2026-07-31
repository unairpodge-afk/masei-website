import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "members-db.json");

const readDb = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      return [];
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
};

export async function GET(req) {
  try {
    // Basic Auth Check
    const authHeader = req.headers.get("authorization");
    
    // In a production app, use a real token/session. For this scratch panel, we use a simple hardcoded token.
    if (!authHeader || authHeader !== "Bearer admin123") {
      return Response.json(
        { success: false, message: "Unauthorized. Kata sandi admin salah." },
        { status: 401 }
      );
    }

    const members = readDb();

    // Admin endpoint returns all member data including NIK
    return Response.json({ success: true, members });
  } catch (error) {
    console.error("API Error in admin member listing:", error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
