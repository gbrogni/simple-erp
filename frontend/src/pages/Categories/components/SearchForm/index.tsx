import { useContextSelector } from 'use-context-selector';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { NewCategoryModal } from '../NewCategoryModal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { SearchFormContainer } from './styles';
import { CategoriesContext } from '../../../../contexts/CategoriesContext';

const searchFormSchema = z.object({
  query: z.string(),
});
type SearchFormInputs = z.infer<typeof searchFormSchema>;

type SearchFormProps = {
  onSearch: (query: string) => void;
};

function SearchFormComponent( { onSearch }: SearchFormProps ) {
  const fetchCategories = useContextSelector(CategoriesContext, (context) => context.fetchCategories);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchCategories(data: SearchFormInputs) {
    await fetchCategories();
    onSearch(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchCategories)}>
      <input type="text" placeholder="Search for categories" {...register('query')} />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
      </button>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button">
            <Plus size={20} />
          </button>
        </Dialog.Trigger>
        <NewCategoryModal />
      </Dialog.Root>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
