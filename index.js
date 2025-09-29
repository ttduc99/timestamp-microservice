// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
// var listener = app.listen(process.env.PORT || 3000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

// Middleware cho JSON response
app.use(express.json());

// API /api/:date?
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    // Không có parameter → lấy thời gian hiện tại
    date = new Date();
  } else {
    // Nếu là số (timestamp)
    if (/^\d+$/.test(dateString)) {
      date = new Date(Number(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Kiểm tra date hợp lệ
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
