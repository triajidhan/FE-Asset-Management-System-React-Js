import { lazy } from "react"
import { WithLoading } from "../../components/WithLoading"

const CheckOutListLazy = lazy(() => import('./CheckOutList'))
const CheckOutDetailLazy = lazy(() => import('./CheckOutDetail'))
const CheckOutInsertlazy = lazy(() => import('./CheckOutInsert'))

const CheckOutListWithLoading = WithLoading(CheckOutListLazy)
const CheckOutDetailWithLoading = WithLoading(CheckOutDetailLazy)
const CheckOutInsertWithLoading = WithLoading(CheckOutInsertlazy)

const CheckOutRouting = [
    {
        path: '',
        element: <CheckOutListWithLoading />
    },
    {
        path: 'details/:id',
        element: <CheckOutDetailWithLoading />
    },
    {
        path: 'new',
        element: <CheckOutInsertWithLoading />
    }
]

export default CheckOutRouting