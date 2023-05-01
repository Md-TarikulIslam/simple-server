const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Simple Node Server Is Running");
});

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "nayon", email: "nayon@gmail.com" },
  { id: 2, name: "tarikul", email: "tarikul@gmail.com" },
  { id: 3, name: "islam", email: "islam@gmail.com" },
];



const uri = "mongodb+srv://tarikul:4KR1oeYdI61XEPEy@cluster0.iolwevh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter((usr) =>
      usr.name.toLowerCase().indexOf(search)
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  console.log("POST API called");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Simple node server is running on port ${port}`);
});


/**
 * user:tarikul
 * password: 4KR1oeYdI61XEPEy
 */
