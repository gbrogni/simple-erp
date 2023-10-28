import { IGetCategoriesUseCase } from '@/domain/use-cases/factories/Categories/IGetCategoriesUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function GetCategories(request: FastifyRequest, reply: FastifyReply) {

    const getCategoriesUseCase = IGetCategoriesUseCase();

    const categories = await getCategoriesUseCase.execute();

    return reply.status(200).send({ categories });
}