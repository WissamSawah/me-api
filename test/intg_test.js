process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("../db/database.js");
const { exec } = require('child_process');

chai.should();

chai.use(chaiHttp);

describe('Testing auth and report functions', () => {
    before(() => {
        return new Promise((resolve) => {
            db.run("DELETE FROM users", (err) => {
                if (err) {
                    console.error("Could not empty test DB table users", err.message);
                }
                db.run("DELETE FROM reports", (err) => {
                    if (err) {
                        console.error("Could not empty test DB table reports", err.message);
                    }
                    exec(
                        'cat db/test.sql | sqlite3 db/test.sqlite',
                        (error, stdout, stderr) => {
                            if (error) {
                                console.error(error.message);
                                return;
                            }

                            if (stderr) {
                                console.error(stderr);
                                return;
                            }

                            resolve();
                        });
                });
            });
        });
    });

    describe('GET /', () => {
        it('should get homepage', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.body.data[0].msg.length.should.be.above(200);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('should get 401 since we do not provide password', (done) => {
            let user = {
                name: "test",
                email: "test@testsson.com",
                // password: "test",
            };

            chai.request(server)
                .post("/auth/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    done();
                });
        });

        it('should get 401 since we do not provide email', (done) => {
            let user = {
                name: "teston",
                // email: "test@testsson.com",
                password: "test",
            };

            chai.request(server)
                .post("/auth/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    done();
                });
        });

        it('should get 201 HAPPY PATH', (done) => {
            let user = {
                name: "teston",
                email: "test@testsson.com",
                password: "test",
            };

            chai.request(server)
                .post("/auth/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User have successfully registered.");
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should get 401 since we do not provide password', (done) => {
            let user = {
                email: "test@testsson.com",
                // password: "test",
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    done();
                });
        });

        it('should get 401 since we do not provide email', (done) => {
            let user = {
                // email: "test@testsson.com",
                password: "test",
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    done();
                });
        });

        it('should get 401 as user not found', (done) => {
            let user = {
                email: "fel@testsson.com",
                password: "fel",
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    done();
                });
        });

        it('should get 401 incorrect password', (done) => {
            let user = {
                email: "test@testsson.com",
                password: "fel",
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    done();
                });
        });

        it('should get 200 HAPPY PATH', (done) => {
            let user = {
                email: "test@testsson.com",
                password: "test",
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("type");
                    res.body.data.type.should.equal("success");
                    done();
                });
        });
    });



    describe('GET/POST /reports', () => {
        it('should get 404 page not', (done) => {
            chai.request(server)
                .get("/week/2")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    done();
                });
        });

        it('should get all weeknumbers', (done) => {
            chai.request(server)
                .get("/reports/get-weeknumbers")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data[0].week.should.equal(1);
                    done();
                });
        });

        it('should get a valid week', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data[0].title.should.equal("title test");
                    res.body.data[0].week.should.equal(1);
                    res.body.data[0].description.should.equal("test");
                    done();
                });
        });
    });
});
