import { lazy, Suspense } from "react";

const StoreListLazy = lazy(() => import('./StoreList'))
const StoreInsertLazy = lazy(() => import('./StoreInsert'))
const StoreUpdateLazy = lazy(() => import('./StoreUpdate'))

const StoreRouting = [
    {
        path: '',
        element:
            <Suspense fallback={<h1>Loading..</h1>}>
                <StoreListLazy />
            </Suspense>
    },
    {
        path: 'new',
        element:
            <Suspense fallback={<h1>Loading..</h1>}>
                <StoreInsertLazy />
            </Suspense>
    },
    {
        path: 'edit/:id',
        element:
            <Suspense fallback={<h1>Loading..</h1>}>
                <StoreUpdateLazy />
            </Suspense>
    }
]

export default StoreRouting