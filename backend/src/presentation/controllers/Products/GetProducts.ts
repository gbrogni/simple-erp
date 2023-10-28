import { IGetProductsUseCase } from '@/domain/use-cases/factories/Products/IGetProductsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function GetProducts(request: FastifyRequest, reply: FastifyReply) {

    const getProductsUseCase = IGetProductsUseCase();

    const products = await getProductsUseCase.execute();

    return reply.status(200).send(products);
}