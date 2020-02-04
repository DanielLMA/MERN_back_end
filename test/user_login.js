
const chai = require('chai');
const expect = chai.expect
const app = require("../server");
const chaiHttp = require("chai-http");


chai.use(chaiHttp);

it("should signup a user",
    async () => {
      const response = await chai.request(app)
        .post("http://localhost3000/register")
        .send({
          email: 'login@user.com',
          password: 'password',
        });
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('email');
      expect(response.body.data).to.have.property('password');
    }
  );