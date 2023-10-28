import { IUpdateCategoryUseCase } from '@/domain/use-cases/factories/Categories/IUpdateCategoryUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function UpdateCategory(request: FastifyRequest, reply: FastifyReply) {

    const updateCategoryBodySchema = z.object({
        id: z.string(),
        name: z.string(),
        discount: z.number(),
    });

    const { id, name, discount } = updateCategoryBodySchema.parse(request.body);

    const updateCategoryUseCase = IUpdateCategoryUseCase();

    await updateCategoryUseCase.execute({ id, name, discount });

    return reply.status(201).send()
    
}
