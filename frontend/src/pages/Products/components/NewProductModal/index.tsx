import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useContextSelector } from 'use-context-selector';
import { ProductsContext } from '../../../../contexts/ProductsContext';
import { api } from '../../../../lib/axios';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Category } from '../../../../interfaces/Category';
import { CloseButton, Content, Overlay } from './styles';

const newProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  productCategory: z.string(),
  price: z.number(),
});

type NewProductFormInputs = z.infer<typeof newProductFormSchema>;

export function NewProductModal() {
  const createProduct = useContextSelector(ProductsContext, (context) => context.createProduct);
  const fetchProducts = useContextSelector(ProductsContext, (context) => context.fetchProducts);

  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);

  function validatePrice(value: string) {
    const regex = /^\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?$/;
    return regex.test(value) || 'Invalid price format';
  }

  useEffect(() => {
    async function fetchCategoryOptions() {
      try {
        const response = await api.get('/categories');
        const options = response.data.categories.categories.map((category: Category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.error('Error', error);
      }
    }

    fetchCategoryOptions();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewProductFormInputs>({
    resolver: zodResolver(newProductFormSchema),
  });

  async function handleCreateNewProduct(data: NewProductFormInputs) {
    const { name, description, color, productCategory, price } = data;

    await createProduct({
      name,
      description,
      color,
      productCategory,
      price,
    });

    await fetchProducts();

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New product</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewProduct)}>
          <input
            type="text"
            placeholder="Name"
            required
            {...register('name')}
          />
          <input
            type="text"
            placeholder="Description"
            required
            {...register('description')}
          />
          <input
            type="text"
            placeholder="Color"
            required
            {...register('color')}
          />
          <select required {...register('productCategory')}>
            <option value="" disabled>
              Select a category
            </option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}