require("dotenv").config();
const app = require("./src/app");
const db = require("./src/db");

const PORT = process.env.PORT || 5000;

db.connect(err => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Listening for requests on port ${PORT}`));
});
