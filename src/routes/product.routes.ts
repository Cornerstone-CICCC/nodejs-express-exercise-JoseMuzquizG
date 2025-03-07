import { Router, Request, Response, response } from "express";
import { Product } from "../types/product";
import { v4 as uuidv4 } from 'uuid'

const productRouter = Router()

const products: Product[] = []

// Get products
productRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json(products)
})

// Add products
productRouter.post("/", (req: Request, res: Response) => {
    const newProduct: Product = {
        id: uuidv4(),
        productName: req.body.productName,   
        productDescription: req.body.productDescription,   
        productPrice: req.body.productPrice   
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

// Get single product
productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundProduct = products.find(product => product.id === id)
    if (!foundProduct) {
        res.status(404).send("Not found")
        return
    }
    res.status(200).json(foundProduct)
})

// Update product
productRouter.put("/:id", (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundProduct = products.findIndex(product => product.id === id)
    if (foundProduct === -1) {
        res.status(404).send("Not found")
        return
    }
    const updatedProduct: Product = {
        ...products[foundProduct],
        productName: req.body.productName ?? products[foundProduct].productName,   
        productDescription: req.body.productDescription ?? products[foundProduct].productDescription,   
        productPrice: req.body.productPrice ?? products[foundProduct].productPrice
    }
    products[foundProduct] = updatedProduct
    res.status(200).json(updatedProduct)
})

// Delete product
productRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundProduct = products.findIndex(product => product.id = id)
    if (foundProduct === -1) {
        res.status(404).send("No product found")
        return
    }
    products.splice(foundProduct, 1)
    res.status(200).send("Product deleted")
})

export default productRouter