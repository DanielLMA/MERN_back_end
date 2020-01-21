const express = require("express");
const app = express()

const PORT = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

app.get('/', (req, res) => res.send("API Running"));

module.exports = app