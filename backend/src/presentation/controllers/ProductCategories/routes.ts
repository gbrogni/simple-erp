import { FastifyInstance } from 'fastify';
import { GetCategories } from './GetCategories';
import { GetCategoryById } from './GetCategoryById';
import { UpdateCategory } from './UpdateCategory';
import { DeleteCategory } from './DeleteCategory';
import { CreateCategory } from './CreateCategory';

export async function ProductsCategoryRoutes(app: FastifyInstance) {

    app.get('/categories', GetCategories);
    app.get('/categories/:id', GetCategoryById);
    app.post('/categories', CreateCategory)
    app.put('/categories/:id', UpdateCategory);
    app.delete('/categories/:id', DeleteCategory);

}