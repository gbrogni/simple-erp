import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CloseButton, Content, Overlay } from './styles';
import { ProductsContext } from '../../contexts/ProductsContext';
import { useContextSelector } from 'use-context-selector'

const newProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  productCategory: z.string(),
  price: z.number(),
  promotionalPrice: z.number()
});

type NewProductFormInputs = z.infer<typeof newProductFormSchema>;

const categoryOptions = [
  { value: 'Smartphones', label: 'Smartphones' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Appliances', label: 'Appliances' },
  { value: 'Refrigerators', label: 'Refrigerators' },
];

export function NewProductModal() {
  const createProduct = useContextSelector(
    ProductsContext,
    (context) => {
      return context.createProduct
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewProductFormInputs>({
    resolver: zodResolver(newProductFormSchema),
  })

  async function handleCreateNewProduct(data: NewProductFormInputs) {
    const { name, description, color, productCategory, price, promotionalPrice } = data;

    await createProduct({
      name,
      description,
      color,
      productCategory,
      price,
      promotionalPrice
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Novo produto</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewProduct)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('name')}
          />
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="text"
            placeholder="Cor"
            required
            {...register('color')}
          />
          <select
            required
            {...register('productCategory')}
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="number"
            placeholder="Preço promocional"
            required
            {...register('promotionalPrice', { valueAsNumber: true })}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}