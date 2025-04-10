import { schedule } from "node-cron";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import db from "./config/database.js"; // Ensure this is correctly configured

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the cron job (Runs every minute for testing)
// schedule("* * * * *", async () => {
// cron job every 5 minuts
// schedule("*/5 * * * *", async () => {
// cron job evey hour
schedule("0 * * * *", async () => {

     console.log("Running the cron job...");

     // Define log file path
     const logPath = join(__dirname, "../logs/cron.log");
     const logTime = new Date().toISOString();
     let logMessage = `[${logTime}] Cron job executed.\n`;

     try {
          // Fetch all tasks
          const [tasks] = await db.query("SELECT id, date, isPending FROM task_tb");

          if (tasks.length === 0) {
               logMessage += "No tasks found in task_tb.\n";
          } else {
               let updatedTasks = [];

               for (const task of tasks) {
                    const taskDate = new Date(task.date);
                    const currentDate = new Date();
                    const isPending = taskDate < currentDate ? 1 : 0;

                    // Update task status
                    await db.query("UPDATE task_tb SET isPending = ? WHERE id = ?", [isPending, task.id]);

                    // Add to log
                    updatedTasks.push(`Task ID: ${task.id}, Date: ${task.date}, isPending: ${isPending}`);
               }

               logMessage += `Updated ${updatedTasks.length} tasks:\n` + updatedTasks.join("\n") + "\n";
          }
     } catch (error) {
          logMessage += `ERROR: ${error.message}\n`;
          console.error("Database error:", error.message);
     }

     // Ensure the logs directory exists
     if (!existsSync(dirname(logPath))) {
          mkdirSync(dirname(logPath), { recursive: true });
     }

     // Append log to the file
     appendFileSync(logPath, logMessage, "utf8");

     console.log("Cron job completed. Log saved to:", logPath);
});
