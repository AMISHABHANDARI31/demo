const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env");
  }

  if (process.env.MONGO_URI.startsWith("mongodb+srv://")) {
    const dnsServers = process.env.DNS_SERVERS
      ? process.env.DNS_SERVERS.split(",").map((server) => server.trim())
      : ["8.8.8.8", "1.1.1.1"];

    dns.setServers(dnsServers);
  }

  const connection = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};

module.exports = connectDB;
