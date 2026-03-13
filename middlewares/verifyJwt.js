import jwt from 'jsonwebtoken'
import 'dotenv/config'

/** 
 * Middlewares de autorizacao dinamico
 * @param verifyToken Verificação do token JWT
*/

const verifyToken = (req,res,next) =>{

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            error: "Token não enviado"
        });
    }

    try {
        const token = authHeader.replace("Bearer ","")
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log("Acesso negado!");
         return res.status(401).json({
            error: "Acesso negado!"
        });
    }

}
export default verifyToken