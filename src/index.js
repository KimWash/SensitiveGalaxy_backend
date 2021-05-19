let express = require("express");
let app = express();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "sensor.csv",
  header: [
    { id: "time", title: "Time" },
    { id: "temperature", title: "Temperature" },
    { id: "humidity", title: "Humidity" },
    { id: "light", title: "Light" },
  ],
});

app.use(express.json());

let temperature;
let humidity;
let light;
let time;
let i = 0;
let data_to_record = [];

app.post("/api/record", function (req, res) {
  //record with post
  temperature = req.body.temperature;
  humidity = req.body.humidity;
  light = req.body.light;
  time = req.body.time;

  if (i < 20) {
    data_to_record.push({
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      light: req.body.light,
      time: req.body.time,
    });
    i++;
    res.json({
      success: true,
    });
  } else if (i == 20) {
    csvWriter.writeRecords(data_to_record).then((result) => {
      if (result != null && result != undefined) {
        i = 0;
        res.json({
          success: true,
        });
      }
    });
  }
});

app.get("/api/data", function (req, res) {
  //Get last recorded data by open http://{yourip}:8000/api/data
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.json({
    success: true,
    data: {
      temperature: temperature,
      humidity: humidity,
      light: light,
      lastUpdated: time,
    },
  });
});

app.listen(8000, () => {
  console.log("server is listening 8000");
});
