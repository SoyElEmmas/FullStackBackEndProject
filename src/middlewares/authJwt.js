import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    console.log(token);

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, config.JWT_SECRET);
    //se extrae el id y se guarda en el request
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "no user found" });
    next();
  } catch (error) {
    console.error(error); 
    return res.status(401).json({message:'unauthorized'})
  }
};

export const isAdmin = async (req,res,next) =>{
    //busca el usuario con el id que ya se puso en el request
    const user = await User.findById(req.userId)

    //busca los roles del usuario
    const roles = await Role.find({_id: {$in: user.roles}})

    //recorre los roles del usuario en busca del role requerido
    for(let i = 0; roles.length; i++){
        if(roles[i].name === "admin"){
            //si encuentra el rol, continua
            next();
            return;
        }
        //si no encuentra el rol, no continua
        return res.status(403).json({message:"Require Admin Role"})
    }
}

export const isModerator = async (req,res,next) =>{
    //busca el usuario con el id que ya se puso en el request
    const user = await User.findById(req.userId)

    //busca los roles del usuario
    const roles = await Role.find({_id: {$in: user.roles}})

    //recorre los roles del usuario en busca del role requerido
    for(let i = 0; roles.length; i++){
        if(roles[i].name === "moderator"){
            //si encuentra el rol, continua
            next();
            return;
        }
        //si no encuentra el rol, no continua
        return res.status(403).json({message:"Requiere Moderator Role"})
    }
 
}