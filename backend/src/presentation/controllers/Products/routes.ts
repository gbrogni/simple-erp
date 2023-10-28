import { FastifyInstance } from 'fastify';
import { CreateProduct } from './CreateProduct';
import { GetProducts } from './GetProducts';
import { GetProductById } from './GetProductById';
import { GetProductsByCategoryId } from './GetProductsByCategoryId';
import { UpdateProduct } from './UpdateProduct';
import { DeleteProduct } from './DeleteProduct';


export async function ProductRoutes(app: FastifyInstance) {

    app.post('/products', CreateProduct);
    app.get('/products', GetProducts);
    app.get('/products/:id', GetProductById);
    app.get('/products/category/:id', GetProductsByCategoryId);
    app.put('/products/:id', UpdateProduct);
    app.delete('/products/:id', DeleteProduct);

}