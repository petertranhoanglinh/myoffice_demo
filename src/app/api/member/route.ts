import { NextResponse } from "next/server";
import { getOracleConnection } from "@/app/lib/oracle";
import crypto from "crypto";

// export async function GET() {
//   let connection;
//   try {
//     connection = await getOracleConnection();
//     const result = await connection.execute("SELECT * FROM MEMBER");
//     return NextResponse.json({ data: result.rows }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Database Error:", error);
//     // Kiểm tra nếu error là một instance của Error thì lấy message
//     const errorMessage = error instanceof Error ? error.message : "Database error";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
//

export async function POST(req : Request) {
  let connection;
  try {
    const body = await req.json();
    const { username, email, mobile, gender, passwd , birthDay } = body;
    if (!username || !email || !mobile || !gender || !passwd || !birthDay) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comId = process.env.ORACLE_USER?.toUpperCase()
    connection = await getOracleConnection();
    const userId = crypto.randomUUID().slice(0, 10).toUpperCase(); // Tạo USERID ngẫu nhiên
    const regDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
    const hashedPassword = crypto.createHash("sha256").update(passwd).digest("hex");
    const sql = `
      INSERT INTO MEMBER (USERID, USERNAME, E_MAIL, MOBILE, GENDER, PASSWD, REG_DATE , BIRTHDAY , COM_ID)
      VALUES (:userId, :username, :email, :mobile, :gender, :passwd, :regDate , :birthDay , :comId)
    `;
    await connection.execute(sql, {
      userId,
      username,
      email,
      mobile,
      gender,
      passwd: hashedPassword,
      regDate,
      birthDay,
      comId
    }, { autoCommit: true });

    return NextResponse.json({ message: "Member inserted successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Database Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
