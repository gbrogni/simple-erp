import { IUpdateProductUseCase } from '@/domain/use-cases/factories/Products/IUpdateProductUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function UpdateProduct(request: FastifyRequest, reply: FastifyReply) {

    const updateProductBodySchema = z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        color: z.string(),
        productCategory: z.object({
            id: z.string(),
            name: z.string(),
            discount: z.number(),
        }),
        price: z.number(),
        promotionalPrice: z.number(),
    });

    const { id, name, description, color, productCategory, price, promotionalPrice } = updateProductBodySchema.parse(request.body);

    const updateProductUseCase = IUpdateProductUseCase();

    await updateProductUseCase.execute({ id, name, description, color, productCategory, price, promotionalPrice });

    return reply.status(201).send();
}
