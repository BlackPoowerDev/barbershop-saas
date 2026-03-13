import {createBarbers,getBarbers,deleteBarbers,getBarber,updateBarbers} from '../controllers/barbers.js'
import authorize from '../middlewares/verifyAccess.js'

import express from 'express'
const routerBarbers = express.Router()

routerBarbers.get('/',  authorize(['barbeiros']),async (req, res) => {

    try {

        const barbers = await getBarbers()
        console.log(barbers);

        return res.status(200).json({
            barbers
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: "Erro ao buscar barbeiros"
        })

    }

})

routerBarbers.get('/:id', authorize(['barbeiros']), async (req, res) => {
    const id = req.params.id
    try {

        const barber = await getBarber(id)
        console.log(barber);

        return res.status(200).json({
            barber
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: "Erro ao buscar barbeiros"
        })

    }

})

routerBarbers.post('/create', authorize(['barbeiros']), async (req, res ) =>{
    try {
        await createBarbers(req.body)
        console.log('Barbeiro cadastrado com sucesso');
        return res.status(200).json(
            {
                status: "Barbeiro cadastrado com sucesso"
            }
        );
    } catch (error) {
        console.error(error)

        if (error.cause?.detail.includes("Chave (telefone)")) {
            return res.status(400).json({
                error: "Telefone já cadastrado"
            })
        }

        if (error.cause?.detail.includes("Chave (email)=")) {
            return res.status(400).json({
                error: "Email já cadastrado"
            })
        }

        return res.status(500).json({
            error: "Erro interno no servidor"
        })
    }
})

routerBarbers.delete('/:id', authorize(['barbeiros']), async (req, res ) =>{
    const id = req.params.id
    
    try {

       await deleteBarbers(id)
       console.log('Usuario deletado com sucesso');
       

        return res.status(200).json({
            status: 'Usuario deletado com sucesso'
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: "Erro ao deletar usuario"
        })

    }

})
    
routerBarbers.patch('/:id', authorize(['barbeiros']), async (req, res ) =>{
    const id = req.params.id
    
    try {

       await updateBarbers(id, req.body)
       console.log('Usuario editado com sucesso');

        return res.status(200).json({
            status: 'Usuario editado com sucesso'
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: "Erro ao editar usuario"
        })

    }

})

export default routerBarbers