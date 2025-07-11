const { createReadStream, createWriteStream } = require("fs");

const rStream = createReadStream("./content/big.txt", "utf8");
// const wStream = createWriteStream("./content/big-copy.txt");

rStream.on("data", (chunk) => {
  console.log("===== chunk =====", chunk.length);
  // wStream.write(chunk);
});