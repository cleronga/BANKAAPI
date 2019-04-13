import users from '../model/user.model';
import jwt from 'jsonwebtoken';
import login from '../model/login';
//import bcrypt from 'bcrypt';

//const saltRounds = 10;
//var salt = bcrypt.genSaltSync(saltRounds);


class usercontroller {
  static getUser(req, res) {
    return res.json
    ({
      status:200,
      data:users
    });
  }
  static getLog(req, res) {
    return res.json
    ({
      status:200,
      data:login
    });
  }


  static createUser(req, res) { 
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
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
    const { email,firstName,lastName,password, type } = req.body;
    //const token = jwt.sign(generate, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' });
    //var np = bcrypt.hashSync(password.req.body, salt);
    if(!user){
        const log1=[
            {
                
                email:req.body.email,
                fn:req.body.firstName,
                ln:req.body.lastName,
                type:req.body.type,
                isAdmin:req.body.isAdmin
            }
        ];
        
    jwt.sign({log1}, 'pr', { expiresIn: '1h' },(err, token) => {
        if(err) { console.log(err) }  
   const tk=token.split(',')

    const newUser = {
      id: Date.now(),
      tk,
      email,
      firstName,
      lastName,
      password,
      type,
      isAdmin:false
    };
    
    users.push(newUser);
    return res.status(201).json({
      status:201,
      data:newUser
    });
});
  }else{
      res.status(401).send({
          status:400,
          error:"User arleady has account"
      })
  }
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
    static updateUser(req, res) {
        const { id } = req.params;
        const user = users.find(updateuser => updateuser.id == id);
        if (user) {
          (user.password = req.body.password);
          return res.status(200).json({
            status: 200,
            data: user
          });
        } else {
          res.status(400).json({
            status:400,
            error: "Password not updated"
          });
        }
      }
      
  static login(req,res){      
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    const signi = login.find(u => u.email === req.body.email);
    if(user){
        if(!signi){
        const logi={
            user:user.tk,
            id: user.id,
            email:user.email,
            fn:user.firstname,
            ln:user.lastname,
            type:user.type,
            isAdmin:user.isAdmin
        }
        login.push(logi);
        res.status(200).send({
        status:200,
        data:user         
            
        }) 
    }else{
           res.status(401).send({
            status:401,
            error:"already sig in"
           })
        }

       
    }else{
        res.status(401).send({
            status:401,
            error:"Invalid email or Password"
        })
    }

  }
  static signout(req, res) {
    const logi = login.find(a => a.id === parseInt(req.params.id));
    if (!logi) {
      res.status(404).send({
        
      });
    }
    const index = login.indexOf(logi);
    login.splice(index, 1);
    res.status(200).send({
      status: 200,
      message: `successfully log it out`,
    });
    }
}

export default usercontroller;