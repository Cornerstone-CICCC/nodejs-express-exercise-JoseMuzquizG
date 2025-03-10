"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Allow JSON requests to add products
//Route
app.use("/products", product_routes_1.default);
//Fallback
app.use((req, res, next) => {
    res.status(404).send("Cannot find what you are looking for :(");
});
// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server is running");
});
