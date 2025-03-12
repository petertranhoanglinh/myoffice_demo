import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING,
};

export async function getOracleConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Connected to Oracle DB");
    return connection;
  } catch (error) {
    console.error("❌ OracleDB Connection Error:", error);
    throw error;
  }
}
