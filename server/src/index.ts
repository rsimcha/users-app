import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

const port = 8080;
const allowedOrigins = [
  "http://localhost",
  "https://www.google.com",
  "https://www.facebook.com",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const isAllowed =
        !origin ||
        allowedOrigins.some((allowedOrigin) =>
          origin.startsWith(allowedOrigin)
        );

      isAllowed
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

const MONGO_URL =
  "mongodb+srv://rina:Cr0dHfSaGYpAB7sy@cluster0.sztugj6.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
