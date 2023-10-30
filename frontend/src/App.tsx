import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { ProductsProvider } from './contexts/ProductsContext';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom'
import { CategoriesProvider } from './contexts/CategoriesContext';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <ProductsProvider>
          <CategoriesProvider>
            <Router />
          </CategoriesProvider>
        </ProductsProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
