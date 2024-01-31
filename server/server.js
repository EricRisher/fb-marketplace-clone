const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { User } = require("./models");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: "your_secret_key",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

const port = process.env.PORT || 8000;

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  app.post("/sign-up", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      req.session.user_id = user.id;
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: "No user with that email!" });
      }

      const validPassword = await user.checkPassword(password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.email = user.email;
        req.session.loggedIn = true;
        res.json({ user: user, message: "You are now logged in!" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });

  app.get("/api/user", (req, res) => {
    if (!req.session.user_id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    User.findById(req.session.user_id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: "Server error" });
      });
  });

  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Server error" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
      console.log(`Use GraphQL at http://localhost:${port}/graphql`);
    });
  });
};

startApolloServer();