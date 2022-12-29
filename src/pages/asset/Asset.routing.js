import { lazy } from "react"
import { WithLoading } from "../../components/WithLoading"

const AssetListLazy = lazy(() => import('./AssetList'))
const AssetInsertLazy = lazy(() => import('./AssetInsert'))
const AssetUpdateLazy = lazy(() => import('./AssetUpdate'))

const AssetListWithLoading = WithLoading(AssetListLazy)
const AssetInsertWithLoading = WithLoading(AssetInsertLazy)
const AssetUpdateWithLoading = WithLoading(AssetUpdateLazy)

const AssetRouting = [
    {
        path: '',
        element: <AssetListWithLoading />
    },
    {
        path: 'new',
        element: <AssetInsertWithLoading />
    },
    {
        path: 'edit/:id',
        element: <AssetUpdateWithLoading />
    }
]

export default AssetRouting