let express = require("express");
let app = express();

app.use(express.json())

let temperature;
let humidity;

app.post("/api/record", function (req, res) { //record with post
    temperature = req.body.temperature;
    humidity = req.body.humidity;
    res.json({
        success: true
    })
});

app.get("/api/data", function (req, res) { //Get last recorded data by open http://{yourip}:8000/api/data
    res.json({
        success: true,
        data: {
            temperature: temperature,
            humidity: humidity
        }
    })
})

app.listen(8000, () => {
  console.log("server is listening 8000");
});
