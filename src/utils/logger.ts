import { promises as fs } from "fs";

export default async function logger(
  filename: string,
  controllerName: string,
  success: boolean,
  username: string,
  ipAddress: string,
  userId: string
) {
  try {
    const file = await fs.open(`./src/logs/${filename}`, "a");

    const logEntry = `
[${new Date().toISOString()}] 
Controller: ${controllerName}
Status: ${success ? "SUCCESS" : "FAILED"}
User: ${username} (ID: ${userId})
IP Address: ${ipAddress}
---------------------------
`;

    await file.write(logEntry);
    await file.close();
  } catch (err) {
    console.error(`Failed to write log: ${err}`);
  }
}
