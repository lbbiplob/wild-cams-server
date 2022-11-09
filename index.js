const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const collection = client.db("test").collection("devices");

//  fbZbvsHTLa6INW9W
//  productDB

const uri =
  "mongodb+srv://productDB:fbZbvsHTLa6INW9W@cluster0.b0rbg8o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    const photographyCollection = client
      .db("wildlifeDB")
      .collection("category");
    const reviewsCollection = client.db("wildlifeDB").collection("reviews");

    app.get("/category", async (req, res) => {
      const quary = {};
      const cursor = photographyCollection.find(quary);
      const product = await cursor.toArray();
      res.send(product);
    });
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const cursor = photographyCollection.findOne(quary);
      const product = await cursor;
      res.send(product);
    });
    app.get("/sortcategory", async (req, res) => {
      const quary = {};
      const cursor = photographyCollection.find(quary);
      const product = await cursor.limit(3).toArray();
      res.send(product);
    });

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });
  } finally {
  }
};
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello every one");
});

app.listen(port, () => {
  console.log(`running server ${port}`);
});
