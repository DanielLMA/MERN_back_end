const express = require("express");
const app = express()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Listening to requests on http://localhost:${PORT}`);
  });

app.get('/', (req, res) => res.send("API Running"));

module.exports = app 