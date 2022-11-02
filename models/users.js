const mongoose = require('mongoose');
const crypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const modeldb = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  em:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate(val){
      if(!validator.isEmail(val)){
        throw new Error('Invalid Email !!!!!');
      }
    }
  },
  pass:{
    type:String,
    required:true,
    trim:true,
    minLength:7,
    validate(val){
      if(val.toLowerCase().includes('password')){
        throw new Error('Password cannot be taken take another !!!');
      }
    }

  },
  avt:{
    type:String
  }
},{
  timestamps: true
});

modeldb.virtual('ttask', {
  ref: 'profiles',
  localField: '_id',
  foreignField: 'owner'
});

modeldb.statics.logindet = async function(em,pass) {
    const users =await games.findOne({em:em});

    if(!users){
      throw  'Invalid credientials....';
    }

    const userpass = await crypt.compare(pass,users.pass); 
    if(!userpass){
      throw  'Invalid credientials....  #%';
    }

    return users;
};

modeldb.pre('save',async function(next){
  const user = this;
  if(user.isModified('pass')){
    user.pass = await crypt.hash(user.pass,8);
  }

  next();
});

const games = mongoose.model("userinfos", modeldb);
module.exports = games;