import {tabela_barbeiros} from '../config/tables.js'
import db from '../models/database.js'

import {v6 as uuidv6 } from 'uuid';
import { eq } from 'drizzle-orm';
import path from "path"
const __dirname = path.resolve();

export async function createBarbers(dados){

    const upload = await uploadImage(path.join(__dirname, dados.foto_logo))

    return await db.insert(tabela_barbeiros).values({
        id_barbearia: uuidv6(),
        nome_barbearia: dados.nome_barbearia,
        foto_logo: upload,
        endereco: dados.endereco,
        telefone: dados.telefone,
        descricao: dados.descricao,
        avaliacao_media: 0,
        data_cadastro: new Date(),
    })
}
export async function getBarber(id){
    return await db.select().from(tabela_barbeiros).where(eq(tabela_barbeiros.id_barbearia, id))
}
export async function getBarbers(){
    return await db.select().from(tabela_barbeiros)
}
export async function deleteBarbers(id){
    return await db.delete(tabela_barbeiros).where(eq(tabela_barbeiros.id_barbearia, id));
}
export async function updateBarbers(id,dados){
    return await db.update(tabela_barbeiros).set(dados).where(eq(tabela_barbeiros.id_barbearia, id))
}


