import { ICreateProductUseCase } from '@/domain/use-cases/factories/Products/ICreateProductUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function CreateProduct(request: FastifyRequest, reply: FastifyReply) {

    const createProductBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        color: z.string(),
        productCategory: z.object({
            id: z.string(),
            name: z.string(),
            discount: z.number(),
        }),
        price: z.number(),
    });

    const { name, description, color, productCategory, price } = createProductBodySchema.parse(request.body);

    const createProductUseCase = ICreateProductUseCase();

    await createProductUseCase.execute({ name, description, color, productCategory, price });

    return reply.status(201).send()
}