import { lazy } from "react";
import { WithLoading } from "../../components/WithLoading";

const CompanyListLazy = lazy(() => import('./CompanyList'))
const CompanyInsertLazy = lazy(() => import('./CompanyInsert'))
const CompanyUpdateLazy = lazy(() => import('./CompanyUpdate'))

const CompanyListWithLoading = WithLoading(CompanyListLazy)
const CompanyInsertWithLoading = WithLoading(CompanyInsertLazy)
const CompanyUpdateWithLoading = WithLoading(CompanyUpdateLazy)

const CompanyRouting = [
    {
        path: '',
        element: <CompanyListWithLoading />
    },
    {
        path: 'new',
        element: <CompanyInsertWithLoading />
    },
    {
        path: 'edit/:id',
        element: <CompanyUpdateWithLoading />
    }
]

export default CompanyRouting