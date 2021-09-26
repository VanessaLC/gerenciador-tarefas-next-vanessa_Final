import type {NextApiRequest, NextApiResponse} from 'next';
import {Login} from '../../types/Login';
import {DefaultResponseMsg} from '../../types/DefaultResponseMsg';


export default function handler (req : NextApiRequest, res : NextApiResponse) {


    try {

        if(req.method !== 'POST'){
            res.status(400).json({ error: 'Metodo solicitado nao existe '});
            return;
        }
       
        if(req.body){
            const body = req.body as Login;
            if(body.login && body.password){
                return res.status(200).json({msg : 'Login efetuado com sucesso'});
    
            }
        }
        
    
        res.status(400).json({ error: 'Usuário ou senha invalidos'});

    } catch (e) {
        console.log('Ocorreu erro ao autenticar usuario ', e);
        res.status(500).json({error: 'Ocorreu erro ao notificar o usuario, tente novamente'});
    }
}