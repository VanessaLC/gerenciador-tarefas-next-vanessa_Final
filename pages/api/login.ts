import type {NextApiRequest, NextApiResponse} from 'next';
import {Login} from '../../types/Login';
import {DefaultResponseMsg} from '../../types/DefaultResponseMsg';
import { UserModel } from '../../models/UserModel';
import connectDB from '../../middlewares/connectDB';
import md5 from 'md5';
import {User} from '../../types/User';
import jwt from 'jsonwebtoken';
import { LoginResponse } from '../../types/LoginResponse';


const handler = async (req : NextApiRequest, res: NextApiResponse<DefaultResponseMsg | LoginResponse>) =>  {


    try {

        if(req.method !== 'POST'){
            res.status(400).json({ error: 'Metodo solicitado nao existe '});
            return;
        }
       
        const {MY_SECRET_KEY} = process.env;
        if(!MY_SECRET_KEY){
            res.status(500).json({ error: 'ENV my secret key nao encontrada '});
            return;
        }

        if(req.body){
            const auth = req.body as Login;
            if(auth.login && auth.password){
                
                const usersFound = await UserModel.find({email : auth.login, password : auth.password});
                if(usersFound && usersFound.length > 0 ) {

                    const user = usersFound[0];

                    const token = jwt.sign({_id : user._id}, MY_SECRET_KEY);
                    res.status(200).json({token , name: user.name, email: user.email});
                    return;
                }
                
    
            }
        }
        
    
        res.status(400).json({ error: 'Usuário ou senha invalidos'});

    } catch (e) {
        console.log('Ocorreu erro ao autenticar usuario ', e);
        res.status(500).json({error: 'Ocorreu erro ao notificar o usuario, tente novamente'});
    }
}

export default connectDB(handler)