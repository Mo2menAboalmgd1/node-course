// const fs = require("fs");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function ask(question) {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => resolve(answer));
//   });
// }

// async function main() {
//   const fileName = await ask("Enter file name (without .json): ");
//   const filePath = `${fileName}.json`;

//   let courses = [];

//   // Check if file exists and load existing data
//   if (fs.existsSync(filePath)) {
//     const data = fs.readFileSync(filePath, "utf8");
//     try {
//       courses = JSON.parse(data);
//     } catch (e) {
//       console.log("⚠️ File exists but contains invalid data. Starting fresh.");
//     }
//   }

//   while (true) {
//     const name = await ask("Course name: ");
//     const price = await ask("Course price: ");

//     courses.push({ name, price });

//     const addMore = await ask("Add another course? (yes/no): ");
//     if (addMore.toLowerCase() !== "yes") {
//       break;
//     }
//   }

//   // Save data
//   fs.writeFileSync(filePath, JSON.stringify(courses, null, 2), "utf8");

//   console.log("\n📋 Courses added:");
//   console.table(courses);

//   rl.close();
// }

// main();
