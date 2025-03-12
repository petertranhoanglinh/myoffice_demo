import { NextRequest, NextResponse } from 'next/server';
import oracledb from 'oracledb';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { getOracleConnection } from '@/app/lib/oracle';

const SECRET_KEY = "WowViet@123";

interface User {
  USERNAME: string;
  USERID: string;
}

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();
    
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }
    const hashedPassword = hashPassword(password);
    const connection = await getOracleConnection();
    
    const result = await connection.execute<User>(
      `SELECT username, userid FROM member WHERE username = :username AND Passwd = :password`,
      { username, password: hashedPassword },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await connection.close();

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // 🛠 Fix lỗi bằng cách ép kiểu
    const user = result.rows[0] as User;

    const token = jwt.sign(
      { username: user.USERNAME, userid: user.USERID }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
