import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useContextSelector } from 'use-context-selector';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { CategoriesContext } from '../../../../contexts/CategoriesContext';
import { CloseButton, Content, Overlay } from './styles';

const newCategoryFormSchema = z.object({
  name: z.string(),
  discount: z.number(),
});

type NewCategoryFormInputs = z.infer<typeof newCategoryFormSchema>;

export function NewCategoryModal() {
  const createCategory = useContextSelector(CategoriesContext, (context) => context.createCategory);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewCategoryFormInputs>({
    resolver: zodResolver(newCategoryFormSchema),
  });

  async function handleCreateNewCategory(data: NewCategoryFormInputs) {
    const { name, discount } = data;

    await createCategory({
      name,
      discount,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New category</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewCategory)}>
          <input type="text" placeholder="Name" required {...register('name')} />
          <input
            type="text"
            placeholder="Discount"
            required
            inputMode="decimal"
            {...register('discount', { valueAsNumber: true })}
          />

          <button type="submit" disabled={isSubmitting}>
            Add
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}