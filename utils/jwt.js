import jwt from 'jsonwebtoken'
import 'dotenv/config'


const jwtUsers = (data) =>{
    return jwt.sign(
        {  
            id: data.id_cliente, 
            tipo: data.tipo, 
            foto_perfil: data.foto_perfil
        },
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
}


export default jwtUsers