const express = require("express");
const app = express();
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

app.get("/users", (req, res) => {
  res.send(users);
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
