import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const TrackingModal = ({ order, refetch }) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('Cutting Completed')

  const handleAddTracking = async () => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/orders/tracking/${order._id}`,
      {
        status,
        location: 'Factory',
        note: 'Progress updated',
      }
    )

    Swal.fire('Updated!', 'Tracking added', 'success')
    setOpen(false)
    refetch()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='btn btn-primary btn-sm'
      >
        Add Tracking
      </button>

      {open && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
          <div className='bg-white p-5 rounded'>
            <select
              className='select select-bordered w-full mb-3'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Cutting Completed</option>
              <option>Sewing Started</option>
              <option>Finishing</option>
              <option>QC Checked</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
            </select>

            <button
              onClick={handleAddTracking}
              className='btn btn-success w-full'
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TrackingModal
