import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/env';
import { ProductController } from '@/presentation/controllers/ProductController';
import { ProductUseCase } from '@/domain/use-cases/ProductUseCase';
import PostgresConnection from './infra/db/PostgresConnection';
import { ProductRepository } from './infra/repositories/ProductRepository';
import { createProductRoutes } from './presentation/routes';

export const app = fastify();

const db = new PostgresConnection();
const productRepository = new ProductRepository(db);
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

app.register(createProductRoutes(app, productController))

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } 

    return reply.status(500).send({ message: 'Internal server error.' });
});
