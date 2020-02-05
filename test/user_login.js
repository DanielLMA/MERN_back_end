const chai = require("chai");
// chai.use(require('chai-json-schema'));
// const assert = require("chai").assert;
const jwt = require("jsonwebtoken");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const { UserModel } = require ("../database/models/User")
chai.use(chaiHttp);

 // createUser Test: Successful User Creation test. - SUCCESS
 it("should create a user if email is & required properties provided", function(done) {
  const user = new UserModel({
    email: "userWithUniqueEmail@email.com",
    password: "JohnDoe12345"
  });
  chai
    .request(app)
    .post("/auth/register")
    .send(user)
    .end(function(err, res) {
      if (err) {
        done(err);
      } else {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(err).to.be.null;
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("password");
        done(err);
      }
    });
});