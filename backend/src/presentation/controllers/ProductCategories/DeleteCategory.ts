import { IDeleteCategoryUseCase } from '@/domain/use-cases/factories/Categories/IDeleteCategoryUseCase';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function DeleteCategory(request: FastifyRequest, reply: FastifyReply) {

    const deleteCategoryBodySchema = z.object({
        id: z.string()
    });

    const { id } = deleteCategoryBodySchema.parse(request.params);

    const deleteCategoryUseCase = IDeleteCategoryUseCase();

    await deleteCategoryUseCase.execute({ id });

    return reply.status(201).send();

}