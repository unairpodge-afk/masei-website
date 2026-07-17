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
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId");

    const members = readDb();

    if (memberId) {
      // Find specific member
      const member = members.find(
        (m) => m.memberId.toLowerCase() === memberId.toLowerCase()
      );

      if (!member) {
        return Response.json(
          { success: false, message: "Anggota dengan ID tersebut tidak ditemukan." },
          { status: 404 }
        );
      }

      return Response.json({ success: true, member });
    }

    // Return all members if no specific ID is requested (sanitized to remove NIK for security)
    const sanitizedMembers = members.map(({ nik, ...rest }) => rest);
    return Response.json({ success: true, members: sanitizedMembers });
  } catch (error) {
    console.error("API Error in member listing:", error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
