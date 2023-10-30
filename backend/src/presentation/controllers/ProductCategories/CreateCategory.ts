import { ICreateCategoryUseCase } from '@/domain/use-cases/factories/Categories/ICreateCategoryUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function CreateCategory(request: FastifyRequest, reply: FastifyReply) {

    const createCategoryBodySchema = z.object({
        name: z.string(),
        discount: z.number(),
    });

    const { name, discount } = createCategoryBodySchema.parse(request.body);

    console.log(name, discount)
    const createCategoryUseCase = ICreateCategoryUseCase();

    await createCategoryUseCase.execute({ name, discount });

    return reply.status(201).send()
}