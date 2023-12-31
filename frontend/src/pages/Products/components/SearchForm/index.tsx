import { SearchFormContainer } from './styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { ProductsContext } from '../../../../contexts/ProductsContext';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { NewProductModal } from '../NewProductModal';

const searchFormSchema = z.object({
  query: z.string(),
});
type SearchFormInputs = z.infer<typeof searchFormSchema>;

type SearchFormProps = {
  onSearch: (query: string) => void;
};

function SearchFormComponent({ onSearch }: SearchFormProps) {
  const fetchProducts = useContextSelector(
    ProductsContext,
    (context) => context.fetchProducts
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchProducts(data: SearchFormInputs) {
    await fetchProducts();
    onSearch(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchProducts)}>
      <input
        type="text"
        placeholder="Search for products"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
      </button>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button">
            <Plus size={20} />
          </button>
        </Dialog.Trigger>
        <NewProductModal />
      </Dialog.Root>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
