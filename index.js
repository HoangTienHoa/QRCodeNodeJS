const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qrCode = require("qrcode");
// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});
app.post("/scan", (req, res) => {
    const data = req.body.url;

    // If the input is null return "Empty Data" error
    if (data.length === 0) res.send("Empty Data!");

    // Print the QR code to terminal
    qrCode.toString(data,{type:'terminal'},
        function (err, qrText) {
            if(err) return console.log("error occurred")
            // Printing the generated code
            console.log(qrText);
        })
    // Converting the data into base64
        qrCode.toDataURL(data, (err, qrCode) => {
            if (err) res.send("Error occured");
            console.log(qrCode);
            // Let us return the QR code image as our response and set it to be the source used in the webpage
            res.render("scan", { qrCode});
        });
});
// Setting up the port for listening requests
const port = 3000;
app.listen(port, () => console.log("Server at 3000"));