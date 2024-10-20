const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./config/db.config");

const app = express();

app.use(cors());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "Razil-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);


const db = require("./models/index.model");


db.mongoose
  .connect(`mongodb+srv://saharanit16:%24%23%40!@cluster0.uqcine6.mongodb.net/MyfirstDatabase`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.json({ message: "hey:)" });
});
require("./routes/auth.routes")(app);
require("./routes/product.routes")(app);
require("./routes/cart.routes")(app);
require("./routes/shipping.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});