import { lazy } from "react";
import { WithLoading } from "../../components/WithLoading";

const UserListLazy = lazy(() => import('./UserList'))
const UserInsertLazy = lazy(() => import('./UserInsert'))
const UserUpdateLazy = lazy(() => import('./UserUpdate'))

const UserListWithLoading = WithLoading(UserListLazy)
const UserInsertWithLoading = WithLoading(UserInsertLazy)
const UserUpdateWithLoading = WithLoading(UserUpdateLazy)

const UserRouting = [
    {
        path: '',
        element: <UserListWithLoading />
    },
    {
        path: 'new',
        element: <UserInsertWithLoading />
    },
    {
        path: 'edit/:id',
        element: <UserUpdateWithLoading />
    }
]

export default UserRouting