import { ProductController } from "./controllers/ProductController"

export async function createProductRoutes(app: any, controller: ProductController) {

    app.post('/products', controller.createProduct);
    app.get('/products', controller.getProducts);
    app.get('/products/:id', controller.getProductById);
    app.delete('/products/:id', controller.deleteProduct);
    app.put('/products/:id', controller.updateProduct);

    return app;

}
