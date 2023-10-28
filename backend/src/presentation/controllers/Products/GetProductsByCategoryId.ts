import { IGetProductsByCategoryIdUseCase } from '@/domain/use-cases/factories/Products/IGetProductsByCategoryId';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function GetProductsByCategoryId(request: FastifyRequest, reply: FastifyReply) {

    const getProductsByCategoryIdParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = getProductsByCategoryIdParamsSchema.parse(request.params);

    const getProductsByCategoryIdUseCase = IGetProductsByCategoryIdUseCase();

    const product = await getProductsByCategoryIdUseCase.execute({id});

    return reply.status(200).send(product);

}
