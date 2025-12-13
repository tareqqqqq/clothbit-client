import axios from 'axios'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'


const PendingOrders = () => {
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/pending`
      )
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const handleApprove = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/orders/approve/${id}`
    )
    Swal.fire('Approved!', 'Order approved successfully', 'success')
    refetch()
  }

  const handleReject = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/orders/reject/${id}`
    )
    Swal.fire('Rejected!', 'Order rejected', 'info')
    refetch()
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Pending Orders</h2>

      <table className='min-w-full border'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Date</th>
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
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className='space-x-2'>
                <button
                  onClick={() => handleApprove(order._id)}
                  className='btn btn-success btn-sm'
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(order._id)}
                  className='btn btn-error btn-sm'
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PendingOrders
