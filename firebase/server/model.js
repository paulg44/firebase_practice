import { pool } from "./server.js";

export async function addUsernameToDB(body) {
  const { username, uid } = body;

  try {
    const client = await pool.connect();
    const addUsernameQuery = await client.query(
      "INSERT INTO authfirebase (username, firebaseuid) VALUES ($1, $2)",
      [username, uid]
    );

    client.release();
    return addUsernameQuery;
  } catch (error) {
    console.error("Error adding username:", error);
    throw error;
  }
}
