import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
const payload = {
  id: 1,
  firstName: 'joseph',
  lastName: 'joe',
  email: 'joe@gmail.com',
};

const token = jwt.sign(payload, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' });

before('User signup', (done) => {
  const user = {
    firstName: 'joseph',
    lastName: 'joe',
    email: 'joe1@gmail.com',
    password: '123456',
  };
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(user)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(201);
      done();
    });
});
// Test get for welcome
describe('Get all the accounts', () => {
  it('Get all the accounts', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
      });
  });
});

// Test Get all the accounts
describe('Get all the accounts', () => {
  it('Get all the accounts', () => {
    chai.request(app)
      .get('/api/v1/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      });
  });
});

// Test for creating account
describe('Create account', () => {
  it('Account type should be saving or current', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .send({
        type: 'ok',
        status: 'activate',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
  });

  it('Account status should be dormant or activate', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .send({
        type: 'current',
        status: 'ok',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
  });

  it('Create account', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.message).to.be.a('string');
      });
  });

  it('Create account without entering status', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
      });
  });

  it('Invalid Token', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', 'safsdafs')
      .send({
        type: 'current',
        status: 'activate',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(401);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('Unauthorized', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send({
        type: 'current',
        status: 'activate',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(401);
        expect(res.body.error).to.be.a('string');
      });
  });
});

// Test for updating account
describe('Update account', () => {
  it('Acount not found', () => {
    chai.request(app)
      .patch('/api/v1/accounts/1')
      .set('Authorization', token)
      .send({
        status: 'activate',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
  });

  it('Account Status should be activate or dormant', () => {
    chai.request(app)
      .get('/api/v1/accounts/')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .patch(`/api/v1/accounts/${res.body.data[0].accountNumber}`)
          .set('Authorization', token)
          .send({
            status: 'ok',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.be.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status');
          });
      });
  });

  it('Updated sucessfully', () => {
    chai.request(app)
      .get('/api/v1/accounts/')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .patch(`/api/v1/accounts/${res.body.data[0].accountNumber}`)
          .set('Authorization', token)
          .send({
            status: 'dormant',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.be.equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('status');
          });
      });
  });
});
// Test for delete account
describe('Delete Account', () => {
  it('Account not found', () => {
    chai.request(app)
      .delete('/api/v1/accounts/12')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
  });

  it('Account deleted', () => {
    chai.request(app)
      .get('/api/v1/accounts/')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .delete(`/api/v1/accounts/${res.body.data[0].accountNumber}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.be.equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('status');
          });
      });
  });
});
