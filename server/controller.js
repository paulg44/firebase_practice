import * as addUserModel from "./model.js";

export async function addUsernameController(req, res) {
  try {
    const data = req.body;
    const addUsername = await addUserModel.addUsernameToDB(data);
    console.log(`Success, payload ${addUsername.rows}`);
    res.status(200).json(addUsername.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal add username server error" });
  }
}

export async function retrieveDataController(req, res) {
  try {
    const data = req.body;
    const retrieveDataFromDB = await addUserModel.retrieveData(data);
    console.log(`Success, payload ${retrieveDataFromDB.rows}`);
    res.status(200).json(retrieveDataFromDB.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
