const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const productsCollection = client
      .db("Products")
      .collection("product_details");

    app.get("/products", async (req, res) => {
      const quary = {};
      const cursor = productsCollection.find(quary);
      const product = await cursor.toArray();
      res.send(product);
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
