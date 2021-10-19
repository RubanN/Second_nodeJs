const express = require('express');
var fs = require('fs');
const app = express();
var PORT = 3000;

app.use(express.urlencoded());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

app.post("/addUser", (req, res) => {
    var username = req.body.username
    var dob = req.body.dob;
    var profession = req.body.profession
    var obj = {};
    var key = req.body.userid;
    var newUser = {
        "name": username,
        "dob": dob,
        "profession": profession,
    }
    obj[key] = newUser;
    console.log(newUser);
    fs.readFile("users.json", "utf8", (err, data) => {
        data = JSON.parse(data)
        data[key] = obj[key];
        console.log(data);
        var updateuser = JSON.stringify(data)
        fs.writeFile("users.json", updateuser, (err, data) => {
            {
                res.end(JSON.stringify(data));
            }
        });
    });
});
app.post("/particularUser", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        var users = JSON.parse(data); // object convert into string
        var user = users[req.body.userId]
        console.log(user);
        res.end(JSON.stringify(user))//  string convert into object
    })
})
app.post("/deleteUser", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        data = JSON.parse(data); // object convert into string
        delete data[req.body.UserId]
        var updateuser = JSON.stringify(data);
        fs.writeFile("users.json", updateuser, function (err) {
            res.end(JSON.stringify(data))// string convert into object
        })
    })
})