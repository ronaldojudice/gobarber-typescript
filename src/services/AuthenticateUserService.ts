import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';



interface Request{
  email:string;
  password:string;
}
interface Response{
 user: User;
 token:string;
}

class AuthenticateUserService {

  public async execute({email,password}:Request): Promise<Response>{

    const usersRepository = getRepository(User);


    const user = await usersRepository.findOne({where:{email}});
    if(!user){
      throw new Error('The combination between email/password does not match.');
    }
    const passwordMached = await compare(password,user.password);

    if(!passwordMached){
      throw new Error('The combination between email/password does not match.');
    }

    const token = sign({}, authConfig.jwt.expiresIn,{
      subject:user.id,
      expiresIn: authConfig.jwt.expiresIn
    });


    return{
      user,
      token,
    }
  }
}
export default AuthenticateUserService;
