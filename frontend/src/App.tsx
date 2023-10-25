import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Products } from './pages/Products';
import { ProductsProvider } from './contexts/ProductsContext';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </ThemeProvider>
  )
}
