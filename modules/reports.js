const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const reports = {
    addReport: function(res, body) {
        const week = body.week;
        const title = body.title;
        const description = body.description;
        db.get("SELECT * FROM reports WHERE week=?",
        week,
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports/add-reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            if (rows !== undefined) {
                return res.status(418).json({
                    errors: {
                        status: 418,
                        source: "/reports/add-reports",
                        title: "Duplicate",
                        detail: "Duplicate week."
                    }
                });
            } else {
                db.run("INSERT INTO reports (week, title, description) VALUES (?, ?, ?)",
                    week,
                    title,
                    description, (err) => {
                        if (err) {
                            return res.status(500).json({
                                errors: {
                                    status: 500,
                                    source: "/reports",
                                    title: "Database error",
                                    detail: err.message
                                }
                            });
                        }

                        return res.status(201).json({
                            data: {
                                message: "Report successfully added."
                            }
                        });
                    });
                }
            })
        },

    getWeeklyReport: function(res, week) {
        sql = "SELECT * FROM reports WHERE week=" + week.toString();
        var reportdata = [];

        console.log("check");

        db.each(sql, function (err, row) {
            // console.log(row);
            reportdata.push({week: row.week, title: row.title, description: row.description});
        }, function() {
            console.log(reportdata);
            return res.json({data: reportdata});
        })
    },

    getWeeknumbers: function(res) {
        sql = "SELECT DISTINCT week FROM reports ORDER BY week ASC";
        var reportdata = [];

        db.each(sql, function (err, row) {
            // console.log(row);
            reportdata.push({week: row.week});
        }, function() {
            console.log(reportdata);
            return res.json({data: reportdata});
        })
    },

    updateReport: function(res, body) {
        console.log("body: ");
        console.log(body);
        const week = body.week;
        const title = body.title;
        const description = body.description;
        db.run("UPDATE reports SET title=?, description=? WHERE week=?",
            title,
            description,
            week, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/reports",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.json({
                    data: {
                        message: "Report successfully updated."
                    }
                });
            });
        },
};
module.exports = reports;
