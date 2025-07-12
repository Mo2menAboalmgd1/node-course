
const fs = require("fs");
const { promise } = require("readdirp");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer))
  })
}

const main = async () => {
  const fileName = await ask("enter the file name: ");
  const filePath = `${fileName}.json`;

  let courses = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    try {
      courses = JSON.parse(data);
    } catch (error) {
      throw new Error("Invalid JSON format in the file.");
    }
  }

  while (true) {
    const courseName = await ask("enter the course name: ");
    const coursePrice = await ask("enter the course price: ");

    if (!courseName || !coursePrice) {
      console.log("Course name and price are required. Exiting...");
      break;
    }

    const course = {
      name: courseName,
      price: parseFloat(coursePrice),
    };

    courses.push(course);

    const addMore = await ask("do you want to add another course? (yes/no): ");

    if (addMore.toLowerCase() !== "yes") {
      break;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(courses, null, 2));
  console.log(`Courses saved to ${filePath}`);
  console.table(courses);
  rl.close();
}

main();