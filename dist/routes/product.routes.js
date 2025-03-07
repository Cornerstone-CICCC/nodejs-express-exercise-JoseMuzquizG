"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [];
// Get products
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
// Add products
productRouter.post("/", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// Get single product
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find(product => product.id === id);
    if (!foundProduct) {
        res.status(404).send("Not found");
        return;
    }
    res.status(200).json(foundProduct);
});
// Update product
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundProduct = products.findIndex(product => product.id === id);
    if (foundProduct === -1) {
        res.status(404).send("Not found");
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, products[foundProduct]), { productName: (_a = req.body.productName) !== null && _a !== void 0 ? _a : products[foundProduct].productName, productDescription: (_b = req.body.productDescription) !== null && _b !== void 0 ? _b : products[foundProduct].productDescription, productPrice: (_c = req.body.productPrice) !== null && _c !== void 0 ? _c : products[foundProduct].productPrice });
    products[foundProduct] = updatedProduct;
    res.status(200).json(updatedProduct);
});
// Delete product
productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundProduct = products.findIndex(product => product.id = id);
    if (foundProduct === -1) {
        res.status(404).send("No product found");
        return;
    }
    products.splice(foundProduct, 1);
    res.status(200).send("Product deleted");
});
exports.default = productRouter;
