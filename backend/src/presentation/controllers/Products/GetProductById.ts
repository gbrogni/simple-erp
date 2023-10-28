import { IGetProductByIdUseCase } from '@/domain/use-cases/factories/Products/IGetProductByIdUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function GetProductById(request: FastifyRequest, reply: FastifyReply) {

    const getProductByIdParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = getProductByIdParamsSchema.parse(request.params);

    const getProductByIdUseCase = IGetProductByIdUseCase();

    const product = await getProductByIdUseCase.execute({id});

    return reply.status(200).send(product);

}
