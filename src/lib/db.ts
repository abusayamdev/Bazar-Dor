import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

declare global {
  var mongoClient: MongoClient | undefined;
}

export function getMongoClient() {
  if (!mongoUri) return null;

  if (!global.mongoClient) {
    global.mongoClient = new MongoClient(mongoUri);
  }

  return global.mongoClient;
}
