import { MongoClient } from "mongodb";

// Raw MongoDB client used exclusively by the NextAuth MongoDBAdapter.
// For application queries, use lib/mongoose.js (so we can use Mongoose models).

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise = null;

if (!uri) {
  console.warn(
    "[hackiee] MONGODB_URI missing — NextAuth adapter will be disabled until it is set."
  );
} else if (process.env.NODE_ENV === "development") {
  // In dev, cache the connection on the global object to survive HMR.
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
