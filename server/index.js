const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { Client } = require("pg");
import * as IPFS from "ipfs";
import * as OrbitDB from "orbit-db";

require("dotenv").config();

const data = {};

const setupOrbit = async () => {
  const ipfs = await IPFS.create({
    repo: "./orbitdb/examples/ipfs",
    start: true,
  });
  const orbitdb = await OrbitDB.createInstance(ipfs, {
    directory: "./orbitdb/examples/keyvalue",
  });

  // Create / Open a database
  const notes = await orbitdb.kvstore("jotter-notes-service", {
    overwrite: true,
  });

  return await { nameService, userData };
};

app.use(cors());
app.use(express.json());

let client;
async function connectToDb() {
  client = setupOrbit();
}
connectToDb();

app.get("/cids/:owner", (req, response) => {
  let res = data[req.params.owner];
  if (!res) {
    res = [];
  } else {
    res = res.map((r) => ({
      cid: r,
    }));
  }
  response.json(res);
});

app.post("/send/:owner/:cid", (req, response) => {
  const { owner, cid } = req.params;
  const ownerData = data[owner];
  let arr;
  if (!ownerData) arr = [];
  else arr = ownerData;
  arr.push(cid);
  data[owner] = arr;
  response.send("success");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
