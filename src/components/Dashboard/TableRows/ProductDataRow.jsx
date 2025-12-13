


import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
const ProductDataRow = ({product,refetch}) => {
  const navigate = useNavigate()
    console.log(product);
      const {_id,  title, category, price, quantity} = product || {}
    // const imageArray=images[0]
      // let [isOpen, setIsOpen] = useState(false)
      // const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    
      // function openModal() {
      //   setIsOpen(true)
      // }
      // function closeModal() {
      //   setIsOpen(false)
      // }
      // 🔥 DELETE HANDLER
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This product will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/${_id}`
      )

      Swal.fire('Deleted!', 'Product has been deleted.', 'success')
      refetch()
    }
  }

  // 🔥 UPDATE HANDLER
  const handleUpdate = () => {
    navigate(`/dashboard/update-product/${_id}`)
  }
    return (
        <tr>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                  <div className='shrink-0'>
                    <div className='block relative'>
                      {/* <img
                        alt='profile'
                        src={imageArray}
                        className='mx-auto object-cover rounded h-10 w-15 '
                      /> */}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 '>{title}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 '>{category}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 '>${price}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 '>{quantity}</p>
              </td>
        
              {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                  onClick={openModal}
                  className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                  <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                  ></span>
                  <span className='relative'>Delete</span>
                </span>
                <DeleteModal isOpen={isOpen} closeModal={closeModal} />
              </td> */}
              
              
{/* Delete */}
      <td className='px-5 py-5 border-b bg-white'>
        <button
          onClick={handleDelete}
          className='px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200'
        >
          Delete
        </button>
      </td>

      {/* Update */}
      <td className='px-5 py-5 border-b bg-white'>
        <button
          onClick={handleUpdate}
          className='px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200'
        >
          Update
        </button>
      </td>
    
              {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                  onClick={() => setIsEditModalOpen(true)}
                  className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                  <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                  ></span>
                  <span className='relative'>Update</span>
                </span>
                <UpdatePlantModal
                  isOpen={isEditModalOpen}
                  setIsEditModalOpen={setIsEditModalOpen}
                />
              </td> */}
            </tr>
          )
};

export default ProductDataRow;