import { HeaderContainer, HeaderContent, NewProductButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import { NewProductModal } from "../NewProductModal";

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <h1>ERP System</h1>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewProductButton>Nova transação</NewProductButton>
                    </Dialog.Trigger>

                    <NewProductModal />
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    );
}