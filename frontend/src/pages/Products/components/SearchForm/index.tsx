import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector';
import { ProductsContext } from "../../../../contexts/ProductsContext";
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { memo } from 'react';

const searchFormSchema = z.object({
  query: z.string(),
})
type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchProducts = useContextSelector(
    ProductsContext,
    (context) => {
      return context.fetchProducts
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })
  async function handleSearchProducts(data: SearchFormInputs) {
    await fetchProducts(data.query)
  }
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchProducts)}>
      <input
        type="text"
        placeholder="Busque por produtos"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)