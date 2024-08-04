import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req:Request, res:Response, next:NextFunction) =>{
    let errors = validationResult(req)

    //? Si no pasa las verificaciones regresamos mensaje de error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}