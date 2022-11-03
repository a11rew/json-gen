const fs = require("fs");
const crypto = require("crypto");
const csv = require("csvtojson");
const { Parser } = require("json2csv");
const jsonGen = require("./utils/chipJSONGen");

const args = process.argv.slice(2);

// Validate args
const csvPath = args[0];
if (!csvPath) {
  console.log("Please provide a path to a CSV file");
  process.exit(1);
}

// Read the CSV file
csv()
  .fromFile(csvPath)
  .then((jsonObj) => {
    // Use number of rows to determine series_total
    const series_total = jsonObj.length;

    console.log(jsonObj[0]);

    const output = jsonObj.map((obj) => {
      // Generate CHIP-0007 JSON
      const json = jsonGen({
        name: obj["Name"],
        series_number: obj["Series Number"],
        description: obj["Description"],
        gender: obj["Gender"],
        attributes: obj["Attributes"],
        series_total,
      });

      // Generate sha256 hash
      const hash = crypto.createHash("sha256");
      hash.update(JSON.stringify(json));
      const hashHex = hash.digest("hex");

      return {
        obj,
        json,
        hash: hashHex,
      };
    });

    // Add hash to JSON objects and convert to csv
    const csvOutput = output.map((e) => ({ ...e.obj, Hash: e.hash }));

    // Convert to CSV with hash included
    const parser = new Parser({
      // Disable quotes around fields
      quote: "",
    });
    const csv = parser.parse(csvOutput);

    // Write csv to file
    // Append .output to the filename
    const outputFilename = csvPath.split(".csv")[0] + ".output" + ".csv";
    fs.writeFileSync(outputFilename, csv);

    // Write json to file
    // Append .output to the filename
    const jsonOutputFilename = csvPath.split(".csv")[0] + ".output" + ".json";
    const jsonOutput = output.map((e) => e.json);
    fs.writeFileSync(jsonOutputFilename, JSON.stringify(jsonOutput));
  });
