const { MongoClient } = require("mongodb");
let client = global.__mvMongoClient;
let db = global.__mvMongoDb;
async function getCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");
  const dbName = process.env.MONGODB_DB || "lifestyle";
  const collectionName = process.env.MONGODB_COLLECTION || "daily_records";
  if (!client) {
    client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 10000 });
    await client.connect();
    global.__mvMongoClient = client;
  }
  if (!db) { db = client.db(dbName); global.__mvMongoDb = db; }
  return db.collection(collectionName);
}
module.exports = { getCollection };
