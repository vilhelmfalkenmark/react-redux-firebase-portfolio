const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();
const fs = require("fs");

app.use(express.static(path.resolve(__dirname, '../frontend/build'))); // <-- Tydligen ska index, root, whatever ligga överst.

app.get('*', (req, res) => {
 res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});


app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
