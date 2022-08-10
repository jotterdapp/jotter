const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { Client } = require("pg");
import * as IPFS from "ipfs";
import * as OrbitDB from "orbit-db";

require("dotenv").config();

const data = {};

// Setup Orbit DB
const setupOrbit = async () => {
  console.log("NOTION TIME");
  const ipfs = await IPFS.create({
    repo: "./orbitdb/examples/ipfs",
    start: true,
  });
  const orbitdb = await OrbitDB.createInstance(ipfs, {
    directory: "./orbitdb/examples/kv",
  });

  // Create / Open a database
  const notes = await orbitdb.kvstore("jotter-notes-service", {
    overwrite: true,
  });

  return await { nameService, userData };
};

// Use CORS for security
app.use(cors());

// Accept and parse JSON
app.use(express.json());

let client;

async function connectToDb() {
  client = setupOrbit();
}

connectToDb();

// Endpoint to get the CID's for an Owner
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

// Endpoint to save a CID under a owner
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

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
