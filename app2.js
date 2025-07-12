const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => {
  return new Promise((res) => {
    rl.question(question, (answer) => res(answer));
  });
};

const main = async () => {
  const fileName = await ask("what is the name of the file: ");
  const filePath = `${fileName}.json`;

  let courses = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    try {
      courses = JSON.parse(fileContent);
    } catch (error) {
      throw new Error("the file exist with invalid data ⚠️");
    }
  }

  while (true) {
    const courseName = ask("enter the course name: ");
    const coursePrice = ask("enter the course price: ");

    if (!courseName || !coursePrice) {
      console.log("you must enter the course name and price ...");
      break;
    }

    courses.push({
      course: courseName,
      price: parseFloat(coursePrice),
    });

    const addMore = ask("do you want to continue? (yes | no)");

    if (addMore.toLowerCase() !== "yes") {
      break;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(courses, null, 2), "utf8");
  console.log(`course add to ${filePath} successfully ✅`);
  console.table(courses);
};

main();