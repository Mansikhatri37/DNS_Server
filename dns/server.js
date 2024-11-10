const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const DNSRecord = require("./models/DNSRecord"); // Import your DNSRecord model

const dbURI = "mongodb://localhost:27017/dnsRecords"; // Change this if using a cloud version

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
const PORT = 3000; // You can choose any available port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to get all DNS records
app.get("/api/records", async (req, res) => {
  try {
    const records = await DNSRecord.find(); // Fetch records from MongoDB
    res.json(records);
  } catch (err) {
    console.error("Error fetching DNS records:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to add a new DNS record
app.post("/api/records", async (req, res) => {
  const { name, type, data } = req.body;

  // Simple validation
  if (!name || !type || !data) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRecord = new DNSRecord({
    name,
    type,
    data,
  });

  try {
    await newRecord.save(); // Save the new record to MongoDB
    res.status(201).json(newRecord);
  } catch (err) {
    console.error("Error adding DNS record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
