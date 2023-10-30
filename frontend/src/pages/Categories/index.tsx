import { useContextSelector } from "use-context-selector";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { SearchForm } from "./components/SearchForm";
import { CategoriesContainer, CategoriesTable } from "./styles";
import { Trash } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import { useState } from "react";

export function Categories() {
    const categories = useContextSelector(CategoriesContext, (context) => {
        console.log(context.categories)
        return context.categories;
    });

    const { deleteCategory } = useContextSelector(CategoriesContext, (context) => context);

    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDeleteClick = (categoryId: string) => {
        setDeleteCategoryId(categoryId);
        setDeleteConfirmationVisible(true);
    };

    const confirmDelete = () => {
        if (deleteCategoryId) {
            deleteCategory(deleteCategoryId);
        }
        setDeleteConfirmationVisible(false);
        setDeleteCategoryId('');
    };

    return (
        <CategoriesContainer>
            <SearchForm onSearch={setSearchQuery} />
            <CategoriesTable>
                <thead>
                    <tr>
                        <th><Trash size={20} /></th>
                        <th>Name</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories
                            .filter((category) =>
                                searchQuery === '' || category.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((category) => {
                                return (
                                    <tr key={category.id}>
                                        <td>
                                            <Dialog.Root>
                                                <Dialog.Trigger asChild>
                                                    <Trash size={20} onClick={() => handleDeleteClick(category.id)} />
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
                                        <td>{category.name}</td>
                                        <td>{category.discount}</td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </CategoriesTable>
        </CategoriesContainer>
    );
}