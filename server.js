const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const Knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile= require('./Controllers/profile');
const image = require('./Controllers/image');


  const db= Knex({
  client: 'pg',
  connection: {
     host : '127.0.0.1',
    user : 'vimal',
    password : '',
    database : 'smart-brain'
  }
});

 

const app = express();
 app.use(bodyParser.json());
 app.use(cors());



app.get('/', (req, res)=>
  {res.send('it is working!');
})

app.post('/signin', (req, res)=>{signin.handleSignin(req, res ,db, bcrypt)})
 
app.post('/register', (req,res)=>{ register.handleRegister(req, res , db, bcrypt)})



app.get ('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})


app.put('/image', (req,res)=>{image.handleImage(req, res, db)})

app.post('/imageUrl', (req,res)=>{image.handleApiCall(req, res)})
	

app.listen(3000, ()=>{
	console.log(`app is running on port 3000`);
});
