import { createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import DashboardAdmin from "./pages/DashboardAdmin"
import DashboardSuperAdmin from "./pages/DashboardSuperAdmin"
import UserRouting from "./pages/user/User.routing"
import AssetRouting from "./pages/asset/Asset.routing"
import BrandRouting from "./pages/brand/Brand.routing"
import CompanyRouting from "./pages/company/Company.routing"
import EmployeeRouting from "./pages/employee/Employee.routing"
import StoreRouting from "./pages/store/Store.routing"
import CheckOutRouting from "./pages/checkout/CheckOut.routing"
import CheckInRouting from "./pages/checkin/CheckIn.routing"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <h1>404 - Not Found</h1>,
    },
    {
        path: 'dashboard',
        children: [
            {
                path: 'super-admin',
                element: <DashboardSuperAdmin />
            },
            {
                path: 'non-admin',
                element: <DashboardAdmin />
            }
        ]
    },
    {
        path: 'users',
        children: UserRouting
    },
    {
        path: 'assets',
        children: AssetRouting
    },
    {
        path: 'brands',
        children: BrandRouting
    },
    {
        path: 'companies',
        children: CompanyRouting
    },
    {
        path: 'employees',
        children: EmployeeRouting
    },
    {
        path: 'stores',
        children: StoreRouting
    },
    {
        path: 'checkouts',
        children: CheckOutRouting
    },
    {
        path: 'checkins',
        children: CheckInRouting
    }
])