import { appendFile } from "fs";

export class File {
  fileModules;
  constructor(fileModules) {
    this.fileModules = fileModules;
  }

  async writeToFile(fileName, content) {
    try {
      await this.fileModules.appendFile(fileName, content + "\n", {
        flag: "a",
      });
    } catch (error) {
      return error;
    }
  }
}

