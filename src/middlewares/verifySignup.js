import Role from '../models/Role'
import User from '../models/User'

export const checkDuplicateUsernameOrEmail = async (req,res,next) => {
    
    const user = await User.findOne({username:req.body.username})
    if (user) return res.status(401).json({message:'The user already exists'})

    const email = await User.findOne({email:req.body.email})
    if (email) return res.status(401).json({message:'The email already exists'})

    next();
}

export const checkRoleExisted = async(req, res, next) =>{
    //roles recibidos
    const receivedRoles = req.body.roles
    
    // busca los roles en BD
    const roles = await Role.find() //{},{_id:0,name:1});
    //extrae el nombre en un nuevo arreglo
    const rolesName = roles.map(function(role){
        return role.name
    })
    
    if (!roles) {
        return res.status(404).json({message:'no Roles finded'}) 
    }else {
        for (let i = 0; i < receivedRoles.length; i++) {
            //valida si los roles recibidos se encuentran en los roles de la BD
            if (!rolesName.includes(receivedRoles[i])) {
                return res.status(404).json({message:'Role '+receivedRoles[i]+' does not exist'})
            }
            
        }
    }

    next()
}