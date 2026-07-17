import fs from "fs";
import path from "path";

// Define absolute path to local database file
const dbPath = path.join(process.cwd(), "members-db.json");

// Helper function to read the database safely
const readDb = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
};

// Helper function to write to the database safely
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
    const body = await req.json();
    const {
      fullName,
      nik,
      birthPlace,
      birthDate,
      gender,
      email,
      phone,
      education,
      university,
      major,
      graduationYear,
      occupation,
      company,
      position
    } = body;

    // Validate required inputs
    if (!fullName || !nik || !email || !phone || !university || !major || !graduationYear) {
      return Response.json(
        { success: false, message: "Kolom bertanda bintang (*) wajib diisi." },
        { status: 400 }
      );
    }

    const members = readDb();

    // Check if NIK or Email is already registered
    const isNikExists = members.some((m) => m.nik === nik);
    if (isNikExists) {
      return Response.json(
        { success: false, message: "NIK KTP ini sudah terdaftar sebagai anggota." },
        { status: 400 }
      );
    }

    const isEmailExists = members.some((m) => m.email.toLowerCase() === email.toLowerCase());
    if (isEmailExists) {
      return Response.json(
        { success: false, message: "Alamat email ini sudah terdaftar." },
        { status: 400 }
      );
    }

    // Generate consecutive Membership ID (e.g. MSEI-2026-0003)
    const nextNumber = String(members.length + 1).padStart(4, "0");
    const memberId = `MSEI-2026-${nextNumber}`;

    const newMember = {
      memberId,
      fullName,
      nik,
      birthPlace,
      birthDate,
      gender,
      email,
      phone,
      education,
      university,
      major,
      graduationYear,
      occupation,
      company,
      position,
      joinedAt: new Date().toISOString()
    };

    members.push(newMember);
    const writeSuccess = writeDb(members);

    if (!writeSuccess) {
      return Response.json(
        { success: false, message: "Terjadi kesalahan internal saat menulis ke database." },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "Pendaftaran anggota berhasil.", member: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error in member registration:", error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
