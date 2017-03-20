const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

// SÄTT GRUNDMAPP
let rootFolder;
if(PORT === process.env.PORT) {
 rootFolder = './frontend/build';
} else  {
 rootFolder = './frontend/public';
}

// Projekt
// app.use(express.static(path.resolve(__dirname, '../projekt/ballbuster/*')));
// app.get('/projekt/ballbuster', function (req, res) {
//  res.sendFile(path.resolve(__dirname, '../projekt/ballbuster', 'index.html'));
// });
// app.use(express.static(path.resolve(__dirname, '../projekt/ballbuster/css')));
// app.use(express.static('js/'));

/////////////// ENDAST FÖR PRODUKTION ///////////////
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('*', function (req, res) {
 res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});


app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
