import fs from "fs";

let resumeToken = fs.existsSync("./key.json") ? require("../key.json") : undefined;

export const saveKey = (data: any): void => {
  resumeToken = data;
  const key = JSON.stringify(data);
  fs.writeFile("./key.json", key, (err: any) => {
    if (err) {
      throw err;
    }
  });
};
