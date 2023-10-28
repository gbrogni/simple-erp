import { IGetCategoryByIdUseCase } from '@/domain/use-cases/factories/Categories/IGetCategoryById';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function GetCategoryById(request: FastifyRequest, reply: FastifyReply) {

    const getCategoryByIdParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = getCategoryByIdParamsSchema.parse(request.params);

    const getProductByIdUseCase = IGetCategoryByIdUseCase();

    const category = await getProductByIdUseCase.execute({id});

    return reply.status(200).send(category);

}
