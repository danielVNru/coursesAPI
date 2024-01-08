
import Router from 'express'
import { User } from '../Controllers/UserController'
import { body } from 'express-validator'
import { inputValidationMiddleware } from '../Middlewares/InputValidationMiddleware'
import { tokenAuthorizeCheck } from '../Middlewares/tokenAuthorizeCheck'

export const userRouter = Router()

userRouter.use(Router.json())

const user = new User()

const loginValidation = body('login').isLength({min: 3}).withMessage('Поле логин должно быть длиннее 3х символов!')
const passwordValidation = body('password').isLength({min: 5}).withMessage('Поле пароль должно быть длиннее 5 символов!')
const nameValidation = body('name').isLength({min: 1}).withMessage('Поле имя обязательное!')

userRouter.post('/reg', 
loginValidation,
passwordValidation,
nameValidation,
inputValidationMiddleware,
user.create)

userRouter.post('/authorize', 
loginValidation,
passwordValidation,
inputValidationMiddleware,
user.authorize)

userRouter.get('/user', 
tokenAuthorizeCheck,
user.info
)

