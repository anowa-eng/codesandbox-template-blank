import express from "express";
import { PrismaClient } from "@prisma/client";

import http from "node:http";
import Server from "socket.io";

const app = express();
const prisma = new PrismaClient();

app.post("/room/create", async function (req, res) {
  let roomName = decodeURIComponent(req.query.roomName),
    userId = parseInt(req.query.userId);

  let room = await prisma.room.create({
    data: { roomName, userId },
  });

  res.send(room);
});

app.get("/room/get", async function (req, res) {
  let roomId = req.query.id;
  let room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  res.send(room);
  res.end();
});

app.post("/room/update", async function (req, res) {
  let { id, userId } = req.query,
    roomName = decodeURIComponent(req.query.roomName);

  let room = prisma.room.findUnique({
    where: { id },
  });
  let newData = {
    roomName: roomName || room.roomName,
    userId: userId || room.userId,
  };

  await prisma.room.update({
    where: { id: id },
    data: newData,
  });

  res.end();
});

app.post("/room/delete", async function (req, res) {
  let id = req.query.id;

  await prisma.room.delete({
    where: { id },
  });

  res.end();
});

export default app;
