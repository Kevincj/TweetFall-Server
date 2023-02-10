import fs from "fs";

const jsonContent = JSON.stringify({ a: 3 });

fs.writeFile("output.json", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});
