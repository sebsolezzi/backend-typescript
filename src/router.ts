import { Router } from "express"
import { body, param } from 'express-validator'
import { CreateProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/* 
    ? Podemos usar express validator antes de llamar a la funcion que guarda el producto
    ?en ves de check se usa body de express-validator
*/

router.get('/', getProducts)
router.get('/:id', param('id')
    .isInt().withMessage("Id no valido"),
    handleInputErrors,
    getProductById)

router.post('/',
    body('name')
        .notEmpty().withMessage("El nombre del producto es obligatorio"),
    body('price')
        .isNumeric().withMessage("El precio del producto debe ser un numero")
        .notEmpty().withMessage("EL precio del producto es obligatorio")
        .custom((value) => value > 0).withMessage("El precio del producto no puede ser menor a cero"),
    handleInputErrors,
    CreateProduct)

router.put('/:id',
    param('id')
        .isInt().withMessage("Id no valido"),
    body('name')
        .notEmpty().withMessage("El nombre del producto es obligatorio"),
    body('price')
        .isNumeric().withMessage("El precio del producto debe ser un numero")
        .notEmpty().withMessage("EL precio del producto es obligatorio")
        .custom((value) => value > 0).withMessage("El precio del producto no puede ser menor a cero"),
    body('availability').isBoolean().withMessage("El campor availability es obligatorio")
    , handleInputErrors,
    updateProduct)


router.patch('/:id',
    param('id')
        .isInt().withMessage("Id no valido"),
    handleInputErrors,
    updateAvailability)


router.delete('/:id', param('id')
    .isInt().withMessage("Id no valido"),
    handleInputErrors,
    deleteProduct)


export default router
