const chai = require("chai");
// chai.use(require('chai-json-schema'));
// const assert = require("chai").assert;
const jwt = require("jsonwebtoken");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const { UserModel } = require ("../database/models/User")
chai.use(chaiHttp);

var mongoose = require('mongoose');

 // createUser Test: Successful User Creation test. - SUCCESS
//  it("should create a user if email is & required properties provided", function(done) {


//   const user = new UserModel({
//     email: "userWithUniqueEmail@email.com",
//     password: "JohnDoe12345",
//     _id: "fake_id"
//   });

//   chai

//     .request(app)
//     .post("/auth/register")
//     .send(user)
//     .end(function(err, res) {
//       if (err) {
//         done(err);
//       } else {
//         expect(res).to.have.status(500);
//         expect(res.body).to.be.a("object");
//         expect(err).to.be.null;
//         expect(res.body).to.have.property("email");
//         expect(res.body).to.have.property("password");
//         expect(res.body).to.have.property("_id");
//         // expect(res.body).to.have.property();
//         done(err);
//       }
//     });
// });
//  })

describe('User', function() {

  before(function(done) {
      db = mongoose.connect('mongodb://localhost/raw_barbershop');
          done();
  });

  after(function(done) {
      mongoose.connection.close();
      done();
  });

  beforeEach(function(done) {
      const user = new UserModel({
          username: '12345',
          password: 'testy'
      });

      user.save(function(error) {
          if (error) console.log('error' + error.message);
          else console.log('no error');
          done();
      });
  });

  it('find a user by username', function(done) {
    const user = new UserModel({
      username: '12345',
      password: 'testy'
  });
      user = UserModel.findOne({ username: '12345' }, function(err, account) {
          expect(user.username).to.exist;
          // expect(user.username).to.eql('12345');
          console.log("   username: ", user);
          done();
      });
  });

  afterEach(function(done) {
      UserModel.deleteOne({}, function() {
          done();
      });
   });

});


// describe('Users', () => {
//   describe('/users', () => {
//       it('it should GET all the users', (done) => {
//           chai.request(app)
//               .get('/users')
//               .end((err, res) => {
//                   expect(res).to.have.status(200);
//                   expect(res.body).to.be.a('object');
//                   done();
//                });
//       });
//   });
// });