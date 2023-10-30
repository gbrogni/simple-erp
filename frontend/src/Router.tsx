import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Categories } from "./pages/Categories";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                <Route path="/" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
            </Route>
        </Routes>
    )
}