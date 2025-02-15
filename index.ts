import express from "express";
import db from "./utils/db";
import bodyParser from "body-parser";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Hello!" });
});

app.get("/posts", async (req, res) => {
  const posts = await db.post.findMany();
  res.json({ status: "ok", data: posts });
});

app.get("/users", async (req, res) => {
  const users = await db.user.findMany();
  res.json({ status: "ok", data: users });
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await db.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ status: "ok", data: user });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await db.user.delete({
    where: {
      id: id,
    },
  });
  res.json({ status: "ok", data: user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
