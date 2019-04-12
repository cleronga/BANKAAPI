import users from '../model/user.model';
//import bcrypt from ('bcrypt');

class usercontroller {
  static getUser(req, res) {
    return res.json({
      status:200,
      data:users
    });
  }

  static createUser(req, res) { 
    if (!req.body.email) {
        return res.status(400).send({
          status: 400,
          message: 'Email is required',
        });
      } if (!req.body.firstName) {
        return res.status(400).send({
          status: 400,
          message: 'First Name is required',
        });
      } if (!req.body.lastName) {
        return res.status(400).send({
          status: 400,
          message: 'Last Name is required',
        });
      } if (!req.body.password || req.body.password.length < 7) {
        return res.status(400).send({
          status: 400,
          message: 'password  is required and shul be a minimum of 8charachers',
        });
      } if (!req.body.type) {
        return res.status(400).send({
          status: 400,
          message: 'client type  is required',
        });
      }  
    const { email,firstname,lastname,password, type } = req.body;
   
    const newUser = {
      id: Date.now(),
      email,
      firstname,
      lastname,
      password,
      type,
      isAdmin:false
    };
    users.push(newUser);
    return res.status(201).json({
      status:201,
      data:newUser
    });
  }
  static getOneUser(req, res) {
    const { id } = req.params;
    const user = users.find(user => user.id == id);
    if (user) {
      return res.status(200).json({
        status:200,
        data: user
      });
    } else {
      res.status(400).json({
          status:400,
        error: "Account not found"
      });
    }
  }
  static deleteUser(req, res) {
    const user = users.find(a => a.id === parseInt(req.params.id));
    if (!user) {
      res.status(404).send({
        status: 404,
        error: 'user not found',
      });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).send({
      status: 200,
      message: 'user successfully deleted',
    });
    }
  
}

export default usercontroller;