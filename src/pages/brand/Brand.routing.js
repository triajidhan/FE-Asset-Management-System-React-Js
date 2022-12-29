import { lazy } from "react";
import { WithLoading } from "../../components/WithLoading";

const BrandListLazy = lazy(() => import('./BrandList'))
const BrandInsertLazy = lazy(() => import('./BrandInsert'))
const BrandUpdateLazy = lazy(() => import('./BrandUpdate'))

const BrandListWithLoading = WithLoading(BrandListLazy)
const BrandInsertWithLoading = WithLoading(BrandInsertLazy)
const BrandUpdateWithLoading = WithLoading(BrandUpdateLazy)

const BrandRouting = [
    {
        path: '',
        element: <BrandListWithLoading />

    },
    {
        path: 'new',
        element: <BrandInsertWithLoading />
    },
    {
        path: 'edit/:id',
        element: <BrandUpdateWithLoading />
    }
]

export default BrandRouting