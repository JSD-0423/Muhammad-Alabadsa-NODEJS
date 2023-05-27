import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { File } from "./file.js";
import { HOST, PORT } from "./constants.js";
import { statusCode } from "./statusCode.js";
import { errorMessages } from "./errors.js";

const fileController = new File(fs);

const recordRequests = (req, res) => {
  const { method, url } = req;
  if (method === "GET") {
    if (url === "/log") {
      const fileName = "requests.txt";
      const content = `${method}:: ${url} - ${new Date().toLocaleString()}`;
      try {
        fileController.writeToFile(fileName, content);
        res.statusCode = statusCode.SUCCESS;
        res.setHeader("Content-Type", "text/plain");
        res.end("Content added successfully");
      } catch (error) {
        res.statusCode = statusCode.SERVER_ERROR;
        res.end(error.message);
      }
    } else {
      res.statusCode = statusCode.NOT_FOUND;
      res.end(errorMessages.NOT_EXISTED);
    }
  }
};

const server = createServer(recordRequests);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

