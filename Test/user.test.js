const chai = require('chai');
//import chaiHttp from 'chai-http';
const server =require( '../server');

describe('user', ()=>{
it('should sign up /users POST',()=>{
  chai.request(server)
  .post("/api/v1/auth/signup")
  .send({
    email:'mnre@gmail.com',
    firstName:'kamana',
    lastName:'claude',
    type:'client',
    isAdmin:false
  })
  .end((err, res) => {
    expect(res.body.status).to.equal(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
    expect(res.body).to.be.an('object');
  });
  
});
it('should log in /users GET');
it('should get one account /users:id GET');
it('should Admin delete account users/:id DELETE');
});