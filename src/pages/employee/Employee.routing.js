import { lazy, Suspense } from "react";
import { WithLoading } from "../../components/WithLoading";

const EmployeeListLazy = lazy(() => import('./EmployeeList'))
const EmployeeInsertLazy = lazy(() => import('./EmployeeInsert'))
const EmployeeUpdateLazy = lazy(() => import('./EmployeeUpdate'))

const EmployeeListWithLoading = WithLoading(EmployeeListLazy)
const EmployeeInsertWithLoading = WithLoading(EmployeeInsertLazy)
const EmployeeUpdateWithLoading = WithLoading(EmployeeUpdateLazy)

const EmployeeRouting = [
    {
        path: '',
        element: <EmployeeListWithLoading />
    },
    {
        path: 'new',
        element: <EmployeeInsertWithLoading />
    },
    {
        path: 'edit/:id',
        element: <EmployeeUpdateWithLoading />
    }
]

export default EmployeeRouting