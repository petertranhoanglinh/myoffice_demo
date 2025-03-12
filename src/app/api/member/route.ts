import { NextResponse } from "next/server";
import { getOracleConnection } from "@/app/lib/oracle";

export async function GET() {
  let connection;
  try {
    connection = await getOracleConnection();
    const result = await connection.execute("SELECT * FROM MEMBER");

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error) {
    console.error("❌ Database Error:", error);

    // Kiểm tra nếu error là một instance của Error thì lấy message
    const errorMessage = error instanceof Error ? error.message : "Database error";
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
