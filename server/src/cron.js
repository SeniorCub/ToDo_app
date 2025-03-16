import { schedule } from "node-cron";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { join, dirname } from "path";

// Define the task you want to run at 12 AM
// schedule("0 0 * * *", () => {
schedule("* * * * *", () => {
     console.log("Running the cron job at 12 AM...");

     // Example Task: Write to a log file
     const logPath = join(__dirname, "./logs/cron.log");
     const logMessage = `[${new Date().toISOString()}] Cron job executed.\n`;

     // Ensure the logs directory exists
     if (!existsSync(dirname(logPath))) {
          mkdirSync(dirname(logPath), { recursive: true });
     }

     appendFileSync(logPath, logMessage, "utf8");

     console.log("Cron job completed.");
});
