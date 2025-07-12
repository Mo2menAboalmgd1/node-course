const fs = require("fs");
const readline = require("readline");

// rl setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// question function
const ask = (question) => {
  return new Promise((res) => {
    rl.question(question, (answer) => res(answer));
  });
};

const main = async () => {
  // dynamic import
  const { default: chalk } = await import("chalk");
  const FILE_PATH = "students.json";

  let students = [];

  // check if file exists
  if (fs.existsSync(FILE_PATH)) {
    const keepData = await ask(
      "Do you want to keep existing students file data? (y/n): "
    );

    if (keepData.toLowerCase() === "y") {
      try {
        const content = fs.readFileSync(FILE_PATH, "utf8");
        students = JSON.parse(content);
      } catch (error) {
        console.error(chalk.red("The file exists but has invalid data ⚠️"));
        console.error(chalk.red("Starting fresh with empty data..."));
        students = [];
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
      }
    } else {
      console.log(chalk.yellow("Clearing existing file data..."));
      students = [];
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
  }

  let trials = 0;
  while (true) {
    // questions
    const name = await ask("Enter the student name: ");
    const age = await ask("Enter his age: ");
    const stage = await ask("What stage he wants to join: ");

    // check data
    if (!name || !age || !stage) {
      trials++;
      if (trials < 5) {
        console.log(chalk.red("You must enter all data!"));
        console.log(chalk.red("Trying again..."));
        console.log(chalk.yellow(`You have (${5 - trials}) trials left...\n`));
        continue;
      } else {
        console.log("You're out of trials, the program will close now");
        console.log("Bye 👋");
        rl.close();
        process.exit(1);
      }
    }
    trials = 0;

    // add student
    students.push({ name, age, stage });

    // ask to add more
    const addMore = await ask("Do you want to add another student? (y/n): ");
    if (addMore.toLowerCase() !== "y") {
      break;
    }
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2), "utf8");

  console.log(chalk.green("✔ Students added successfully!"));
  console.table(students);
  rl.close();
};

main();
