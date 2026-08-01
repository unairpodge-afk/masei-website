import fs from "fs";
import path from "path";

const dbPath = process.env.NODE_ENV === "production" 
  ? path.join("/tmp", "members-db.json") 
  : path.join(process.cwd(), "members-db.json");

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

const writeDb = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to database:", error);
    return false;
  }
};

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    
    // Auth check using admin token
    if (!authHeader || authHeader !== "Bearer admin123") {
      return Response.json(
        { success: false, message: "Unauthorized. Akses ditolak." },
        { status: 401 }
      );
    }

    const { memberId, status } = await req.json();

    if (!memberId || !["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return Response.json(
        { success: false, message: "Member ID dan status (APPROVED/REJECTED/PENDING) valid wajib diisi." },
        { status: 400 }
      );
    }

    const members = readDb();
    const index = members.findIndex((m) => m.memberId === memberId);

    if (index === -1) {
      return Response.json(
        { success: false, message: "Anggota dengan ID tersebut tidak ditemukan." },
        { status: 404 }
      );
    }

    members[index].status = status;
    members[index].updatedAt = new Date().toISOString();

    const writeSuccess = writeDb(members);
    if (!writeSuccess) {
      return Response.json(
        { success: false, message: "Gagal menyimpan perubahan ke database." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: `Status anggota ${memberId} berhasil diperbarui menjadi ${status}.`,
      member: members[index]
    });
  } catch (error) {
    console.error("API Error in admin member verification:", error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
