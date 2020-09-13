const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const index = require('./routes/index');
const hello = require('./routes/hello');
const reportsGet = require('./routes/reports');
const addReports = require('./routes/addreports');

const auths = require('./routes/auths');

const app = express();
const port = 1337;

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});


app.use('/', index);
app.use('/hello', hello);
app.use('/reports/', reportsGet);
app.use('/reports/add-reports', addReports);

app.use('/auth', auths);

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    err.message = "Not found page";

    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.listen(port, () => console.log(`Example API listening on port ${port}!`));
