import { IProductUseCase } from '@/application/use-cases/IProductUseCase';
import Product from '@/domain/models/Product';
import { FastifyReply, FastifyRequest } from 'fastify';
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
    });

    public async createProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { name, description, color, productCategory, price } = this.createProductBodySchema.parse(request.body);
            await this.productUseCase.CreateProduct({ name, description, color, productCategory, price });
            return reply.status(201).send();
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }

    public async getProducts(request: FastifyRequest, reply: FastifyReply): Promise<Product[]> {
        try {
            const products = await this.productUseCase.GetProducts();
            return reply.status(200).send(products);
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }

    public async getProductById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<Product> {
        try {
            const productId = request.params.id;
            const product = await this.productUseCase.GetProductById(productId);
            return reply.status(200).send(product);
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }

    public async deleteProduct(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
        try {
            const productId = request.params.id;
            await this.productUseCase.DeleteProduct(productId);
            return reply.status(204).send();
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }

    public async updateProduct(request: FastifyRequest<{ Params: { id: string }, body: Product }>, reply: FastifyReply): Promise<void> {
        try {
            const productId = request.params.id;
            const product = request.body as Product;
            await this.productUseCase.UpdateProduct(productId, product);
            return reply.status(204).send();
        } catch (error: any) {
            return reply.status(400).send({ message: error.message });
        }
    }

}
