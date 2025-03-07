import express, { NextFunction, Request, Response } from 'express'
import productRouter from './routes/product.routes'

const app = express()

// Middleware
app.use(express.json()) // Allow JSON requests to add products

//Route
app.use("/products", productRouter)

//Fallback
app.use((req, res, next) => {
    res.status(404).send("Cannot find what you are looking for :(")
})

// Start server
const PORT = 3000
app.listen(PORT, () => {
    console.log("server is running")
})