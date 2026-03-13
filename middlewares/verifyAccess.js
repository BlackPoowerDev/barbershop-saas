import jwt from 'jsonwebtoken'
import 'dotenv/config'


/** 
 * Middlewares de autorizacao dinamico
 * @param {array} rolesPermitidos lista de cargos que podem acessar a rota
*/

const authorize = (rolesPermitidos = []) =>{

    return (req, res, next) =>{
        const authHeaders = req.headers.authorization

        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(401).json({
                status: 401,
                error: 'Token não fornecido ou formato inválido'
            })
        }

        const token = authHeaders.split(' ')[1]

        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET)
            
            if(rolesPermitidos.includes('*') || rolesPermitidos.includes(decode.tipo)){
                req.status = true
                req.user = decode
                return next()
            }

            return res.status(403).json({ mensagem: 'Acesso negado' });
        }catch(error){
            console.log(error);
            return res.status(401).json({
                status: 401,
                error: 'Acesso negado.'
            })
        }
    }
}

export default authorize