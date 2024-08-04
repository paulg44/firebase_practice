import { pool } from "./server.js";

export async function addUsernameToDB(body) {
  const { username } = body;

  try {
    const client = await pool.connect();
    const addUsernameQuery = await client.query(
      "INSERT INTO authfirebase (username) VALUES ($1)",
      [username]
    );

    client.release();
    return addUsernameQuery;
  } catch (error) {
    console.error("Error adding username:", error);
    throw error;
  }
}
