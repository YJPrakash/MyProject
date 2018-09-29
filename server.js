var express = require('express');
// var exec = require('exec');
// var path = require("path");
// const execFile = require('child_process').execFile;

var app = express();

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});

app.use(express.static(__dirname + "/"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/");
});

// var mPath = path.join(appRoot, '/cgi-bin' + req.params[0]);
// console.log(mPath);
// execFileSync(mPath);

//auth required or redirect
// app.use('/account', function (req, res, next) {
//     console.log(req.baseUrl + req.path); // => /account

//     if (!req.session.user) {
//         res.redirect('/login?ref=' + encodeURIComponent(req.baseUrl + req.path)); // => /login?ref=%2Faccount
//     } else {
//         next();
//     }
// });

// app.get('/cgi-bin/*.cgi', function (req, res) {
//     // res.sendFile(__dirname + "/");
//     // console.log(req.originalUrl);
//     exec("/usr/lib" + req.originalUrl,
//         function (stderr, stdout, errorCode) {
//             // You get here when the executable completes
//             if (stderr) {
//                 console.log(stderr);
//                 // console.log(errorCode);
//                 throw stderr;
//             }
//             // console.log(stdout);
//             res.send(stdout);
//         });

//     // const child = execFile("/usr/lib" + req.originalUrl, [parameters], (error, stdout, stderr) => {
//     //     // You get here when the executable completes
//     //     if (error) {
//     //         console.log(error);
//     //         throw error;
//     //     }
//     //     console.log(stdout);
//     //     res.send(stdout);
//     // });

// });

// app.get('/es6', function (req, res) {
//     res.sendFile(__dirname + "/DATA/ES6.txt");
// });