import User from "../models/User";
import Role from '../models/Role'
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
//import config from '../config'
const JWT_SECRET = process.env.JWT_SECRET

export const signUp = async (req, res) => {
  const { username, email, password,roles } = req.body;

  //valida si existe el usuario
  const userFound = await User.findOne({ email: email });

  //si existe, ya no continua
  if (userFound) return res.status(404).json({ message: "usuario ya existe!" });

  //encripta el pass
  const encryptedPass = await User.encryptPassword(password);

  //crea un nuevo usuario
  const newUser = new User({
    username: username,
    email: email,
    password: encryptedPass, //User.encryptPassword(password)
  })

  if (roles) {
    //si existen roles en la petición, los busco en la BD
    const foundRoles = await Role.find({name: {$in:roles}})
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({name:'user'})
    newUser.roles = [role._id]
  }

  //guarda el nuevo usuario
  const userSaved = await newUser.save();
  
  //genera un token
  const token = jwt.sign({id:userSaved._id}, JWT_SECRET, {
    expiresIn: 1200, // 20 mins
  });

  //responde con el usuario y el token
  res.status(200).json({
    token: token,
  });
};

export const signIn = async (req, res) => {

  const { email, password} = req.body;

  //valida si existe el usuario
  const userFound = await User.findOne({ email: email }).populate("roles");

  //si no existe, ya no continua
  if (!userFound) return res.status(400).json({ message: "usuario no existe!" });

  const matchPassword = await User.comparePassword(password,userFound.password)

  if (!matchPassword) return res.status(401).json({token:null,message:'invalid password'})

  //console.log(`userFound: ${userFound}`);

  //genera un token
  const token = jwt.sign({id:userFound._id}, JWT_SECRET, {
    expiresIn: 1200, // 20 mins
  });

  res.json({"token":token, user:userFound});
};
