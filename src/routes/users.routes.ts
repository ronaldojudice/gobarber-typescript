import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
import UploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(UploadConfig);


usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);

});

usersRouter.patch('/avatar', ensureAuthenticated,
 upload.single('avatar'),
 async(request, response)=>{

    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id:request.user.id,
      avatarFilename:request.file.filename,
    });
    return response.json(user);
});

export default usersRouter;
