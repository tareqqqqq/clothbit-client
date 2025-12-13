import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'

import { createBrowserRouter } from 'react-router'
import ProductDetails from '../pages/productDetails/ProductDetails'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import AllProducts from '../pages/Dashboard/Admin/AllProducts'
import AllOrders from '../pages/Dashboard/Admin/AllOrders'
import AddProduct from '../pages/Dashboard/Manager/AddProduct'
import ManageProducts from '../pages/Dashboard/Manager/ManageProducts'
import PendingOrders from '../pages/Dashboard/Manager/PendingOrders'
import ApprovedOrders from '../pages/Dashboard/Manager/ApprovedOrders'
import TrackOrders from '../pages/Dashboard/Buyer/TrackOrders'
import MyOrders from '../pages/Dashboard/Buyer/MyOrders'
import ManageOrders from '../pages/Dashboard/Manager/ManageOrders'
import UpdateProductForm from '../components/Form/UpdateProductForm'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess/>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-products',
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-orders',
        element: (
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-products',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'update-product/:id',
        element: (
          <PrivateRoute>
            <UpdateProductForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <PrivateRoute>
            <ManageProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'pending-orders',
        element: (
          <PrivateRoute>
            <PendingOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'approved-orders',
        element: (
          <PrivateRoute>
            <ApprovedOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'tracking-orders',
        element: (
          <PrivateRoute>
            <TrackOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
