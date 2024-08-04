import { Request, Response } from 'express'
import Product from '../models/Product.model'



export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["price", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.status(200).json({ data: products })
    } catch (error) {
        console.log(error)
    }
}
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
        res.status(200).json({ data: product })

    } catch (error) {

    }
}


export const CreateProduct = async (req: Request, res: Response) => {

    //validando que esten completos los campos
    //? si lo queres verificar aqui debes usar check con await y run al final
    /* await check('name').notEmpty().withMessage("El nombre del producto es obligatorio")
        .run(req)
    await check('price').isNumeric().withMessage("El precio del producto debe ser un numero")
        .notEmpty().withMessage("EL precio del producto es obligatorio")
        .custom((value) => value > 0).withMessage("El precio del producto no puede ser menor a cero")
        .run(req) */
    /* let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } */

    //? con el metodo create lo podemos hacer en una sola linea
    /* const product = new Product(req.body)
    const savedProduct = await product.save() */
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ "data": product })
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    //actualizar producto
    await product.update(req.body)
    await product.save()
    res.status(200).json({ data: product })
}
export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    //actualizar producto
    /* con el signp ! le va a poner el booleano contratio de true a false
    o de false a true */
    product.availability = !product.dataValues.availability
    await product.save()
    res.status(200).json({ data: product })
}
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    //borrando el producto
    await product.destroy()
    res.status(200).json({ data: 'Producto eliminado' })
}


