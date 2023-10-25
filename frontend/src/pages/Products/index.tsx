import { Header } from "../../components/Header";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContextSelector } from 'use-context-selector'
import { SearchForm } from "./components/SearchForm";
import { ProductsContainer, ProductsTable } from "./styles";

export function Products() {
  const products = useContextSelector(ProductsContext, (context) => {
    console.log(context.products)
    return context.products
  });

  return (
    <div>
      <Header />
      <ProductsContainer>
        <SearchForm />
        <ProductsTable>
          <tbody>
            {products && products.map((product) => {
              return (
                <tr key={product.id}>
                  <td width="50%">{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.color}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.price}</td>
                  <td>{product.promotionalPrice}</td>
                </tr>
              )
            })}
          </tbody>
        </ProductsTable>
      </ProductsContainer>
    </div>
  )
}