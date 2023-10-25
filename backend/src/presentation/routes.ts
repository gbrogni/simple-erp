import { ProductController } from "./controllers/ProductController"

export async function createProductRoutes(app: any, controller: ProductController) {

    app.post('/products', controller.createProduct);
    app.get('/products', controller.getProducts);

    return app;

}
