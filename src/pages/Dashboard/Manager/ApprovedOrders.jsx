import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import TrackingModal from './TrackingModal'

const ApprovedOrders = () => {
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['approvedOrders'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/approved`
      )
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='container mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Approved Orders</h2>

      <table className='min-w-full border'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Approved Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.email}</td>
              <td>{order.product?.title}</td>
              <td>{order.quantity}</td>
              <td>{new Date(order.approvedAt).toLocaleDateString()}</td>
              <td>
                <TrackingModal order={order} refetch={refetch} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ApprovedOrders
