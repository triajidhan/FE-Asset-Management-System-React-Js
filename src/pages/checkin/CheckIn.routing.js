import { lazy } from "react";
import { WithLoading } from "../../components/WithLoading";

const CheckInListLazy = lazy(() => import('./CheckInList'))
const CheckInDetailLazy = lazy(() => import('./CheckInDetail'))
const CheckInInsertLazy = lazy(() => import('./CheckInInsert'))
const CheckInDetailInsertLazy = lazy(() => import('./CheckInDetailInsert'))

const CheckInListWithLoading = WithLoading(CheckInListLazy)
const CheckInDetailWithLoading = WithLoading(CheckInDetailLazy)
const CheckInInsertWithLoading = WithLoading(CheckInInsertLazy)
const CheckInDetailInsertWithLoading = WithLoading(CheckInDetailInsertLazy)

const CheckInRouting = [
    {
        path: '',
        element: <CheckInListWithLoading />
    },
    {
        path: 'details/:id',
        element: <CheckInDetailWithLoading />
    },
    {
        path: 'new',
        element: <CheckInInsertWithLoading />
    },
    {
        path: 'new/details',
        element: <CheckInDetailInsertWithLoading />
    }
]

export default CheckInRouting