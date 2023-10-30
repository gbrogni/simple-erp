import { HeaderContainer } from "./styles";
import { DotsNine, Storefront } from 'phosphor-react';
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
    const location = useLocation();

    return (
        <HeaderContainer>
            <h1>{location.pathname === '/categories' ? 'Categories' : 'Products'}</h1>
            <nav>
                <NavLink to='/' title="Products">
                    <Storefront size={24} />
                </NavLink>
                <NavLink to='/categories' title="Categories">
                    <DotsNine size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    );
}