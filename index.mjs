import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/room/create", function (req, res) {
  let roomName = req.query.roomName;
  
  let object = await prisma.room.create({
      roomName: roomName,
      
  })
  
  res.end();
});

app.listen(8080);

console.log("listening");
