import { ProductsContext } from "../../contexts/ProductsContext";
import { useContextSelector } from 'use-context-selector';
import { SearchForm } from "./components/SearchForm";
import { ProductsContainer, ProductsTable, RightAlignedColumn } from "./styles";
import { Trash } from "phosphor-react";
import { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import { formatToCurrency } from "../../utils/formatToCurrency";

export function Products() {
  const products = useContextSelector(ProductsContext, (context) => context.products);
  const { deleteProduct } = useContextSelector(ProductsContext, (context) => context);

  const [deleteProductId, setDeleteProductId] = useState('');
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
    }
    setDeleteConfirmationVisible(false);
    setDeleteProductId('');
  };

  return (
    <ProductsContainer>
      <SearchForm onSearch={setSearchQuery} />
      <ProductsTable>
        <thead>
          <tr>
            <th><Trash size={20} /></th>
            <th>Name</th>
            <th>Description</th>
            <th>Color</th>
            <th>Category</th>
            <th>Price</th>
            <th>Promotional Price</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products
              .filter((product) =>
                searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <Trash size={20} onClick={() => handleDeleteClick(product.id)} />
                        </Dialog.Trigger>
                        {isDeleteConfirmationVisible && (
                          <DeleteConfirmationModal
                            isOpen={isDeleteConfirmationVisible}
                            onClose={() => setDeleteConfirmationVisible(false)}
                            onConfirmDelete={confirmDelete}
                          />
                        )}
                      </Dialog.Root>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.color}</td>
                    <td>{product.productCategory && product.productCategory.name}</td>
                    <RightAlignedColumn>{formatToCurrency(product.price)}</RightAlignedColumn>
                    <RightAlignedColumn>{formatToCurrency(product.promotionalPrice)}</RightAlignedColumn>
                  </tr>
                )
              })}
        </tbody>
      </ProductsTable>
    </ProductsContainer>
  );
}