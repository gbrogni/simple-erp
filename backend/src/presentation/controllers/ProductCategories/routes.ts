import { FastifyInstance } from 'fastify';
import { GetCategories } from './GetCategories';
import { GetCategoryById } from './GetCategoryById';
import { UpdateCategory } from './UpdateCategory';
import { DeleteCategory } from './DeleteCategory';

export async function ProductsCategoryRoutes(app: FastifyInstance) {

    app.get('/categories', GetCategories);
    app.get('/categories/:id', GetCategoryById);
    app.put('/categories/:id', UpdateCategory);
    app.delete('/categories/:id', DeleteCategory);

}