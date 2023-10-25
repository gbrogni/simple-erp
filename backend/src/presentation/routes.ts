import { FastifyInstance } from "fastify"
import { ProductController } from "./controllers/ProductController"

export async function productsRoutes(app: FastifyInstance) {

    const productController = new ProductController()
  
    app.get('/products/create', productController.createProduct.bind(productController))
  
  }
  