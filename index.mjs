import express from "express";
import prisma from "@prisma/client";

const app = express();

app.get("/room/create", function (req, res) {
  console.log(prisma.room);
});

app.listen(8080);

console.log("listening");
