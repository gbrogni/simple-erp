import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/env';
import { ProductController } from '@/presentation/controllers/ProductController';
import { IProductUseCase } from '@/application/use-cases/IProductUseCase';
import { ProductUseCase } from '@/domain/use-cases/ProductUseCase';

export const app = fastify();

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});
