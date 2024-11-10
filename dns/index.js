const express = require("express");
const mongoose = require("mongoose");
const dnsPacket = require("dns-packet");
const dgram = require("node:dgram");

const DNSRecord = require("./models/DNSRecord"); // Import your DNSRecord model

const server = dgram.createSocket("udp4");

// MongoDB connection setup (assuming you've already set it up)

server.on("message", async (msg, rinfo) => {
  const incomingReq = dnsPacket.decode(msg);

  try {
    // Fetch the DNS record from the database
    const ipFromDb = await DNSRecord.findOne({
      name: incomingReq.questions[0].name,
    });

    if (ipFromDb) {
      const ans = dnsPacket.encode({
        id: incomingReq.id,
        type: "response",
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answers: [
          {
            type: ipFromDb.type,
            name: incomingReq.questions[0].name,
            data: ipFromDb.data,
            class: "IN",
          },
        ],
      });

      console.log({
        questions: incomingReq.questions,
        rinfo,
      });

      // Send response back to the client
      server.send(ans, rinfo.port, rinfo.address);
    }
  } catch (error) {
    console.error("Error fetching DNS record:", error);
  }
});

// Start the DNS server
server.bind(53, () => console.log("DNS server is running on port 53"));
