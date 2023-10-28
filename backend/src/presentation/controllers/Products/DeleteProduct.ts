import { IDeleteProductUseCase } from '@/domain/use-cases/factories/Products/IDeleteProductUseCase';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function DeleteProduct(request: FastifyRequest, reply: FastifyReply) {

    const deleteProductBodySchema = z.object({
        id : z.string()
    });

    const { id } = deleteProductBodySchema.parse(request.body);

    const deleteProductUseCase = IDeleteProductUseCase();

    await deleteProductUseCase.execute({ id });

    return reply.status(201).send();

}