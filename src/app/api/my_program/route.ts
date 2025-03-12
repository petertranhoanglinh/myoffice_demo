import { NextRequest, NextResponse } from "next/server";
import { getOracleConnection } from "@/app/lib/oracle";
import { MemberDataLogin } from "@/app/models/member-data-login.model";

type DatabaseRow = (string | number | boolean | null | undefined)[];

interface OracleResult {
  rows: DatabaseRow[];
  metaData: { name: string }[];
}

export async function GET(req: NextRequest) {
  try {
    const userDataJson = req.headers.get('x-user-data');
    let userid: string | undefined;

    if (userDataJson) {
      const userData: MemberDataLogin = JSON.parse(userDataJson);
      userid = userData.userid; // Đảm bảo sử dụng username
      console.log(userid)
    }
   
    const connection = await getOracleConnection();
    const result = await connection.execute<OracleResult>(
      "SELECT * FROM MY_PROGRAM WHERE PRG_KIND = 'mo' AND USE_YN = 'Y' " 
    );

    if (!result.rows || result.rows.length === 0) {
      await connection.close();
      return NextResponse.json({ success: false, error: "No data found" }, { status: 404 });
    }

    // Directly return the rows without transformation
    const data = result.rows;

    await connection.close();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Database error" 
      }, 
      { status: 500 }
    );
  }
}
