import { IProductUseCase } from '@/application/use-cases/IProductUseCase';
import { randomUUID } from 'crypto';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export class ProductController {
    private productUseCase: IProductUseCase;

    constructor(productUseCase: IProductUseCase) {
        this.productUseCase = productUseCase;
    }

    private createProductBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        color: z.string(),
        productCategory: z.string(),
        price: z.number(),
        promotionalPrice: z.number(),
    });

    public async createProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { name, description, color, productCategory, price, promotionalPrice } = this.createProductBodySchema.parse(request.body);
            const id = randomUUID();
            await this.productUseCase.CreateProduct({ id, name, description, color, productCategory, price, promotionalPrice });
            return reply.status(201).send();
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }

    public async getProducts(request: any, reply: FastifyReply): Promise<void> {
        try {
            const products = await this.productUseCase.GetProducts();
            return reply.status(200).send(products);
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }
}
