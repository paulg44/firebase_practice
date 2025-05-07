import { pool } from "./server.js";
import crypto from "crypto";

function hashUid(uid) {
  return crypto.createHash("sha256").update(uid).digest("hex");
}

export async function addUsernameToDB(body) {
  const { username, uid } = body;
  const hashedUid = hashUid(uid);
  try {
    const client = await pool.connect();
    const addUsernameQuery = await client.query(
      "INSERT INTO authfirebase (username, firebaseuid) VALUES ($1, $2)",
      [username, hashedUid]
    );

    client.release();
    return addUsernameQuery;
  } catch (error) {
    console.error("Error adding username:", error);
    throw error;
  }
}

export async function retrieveData() {
  try {
    const client = await pool.connect();
    const retrieveDataQuery = await pool.query("SELECT * FROM authfirebase");

    client.release();
    return retrieveDataQuery;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}
