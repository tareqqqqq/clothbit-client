import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'

const UpdateProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {user}=useAuth()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  // 🔹 1. Load product data
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`
      )
      return res.data
    },
    onSuccess: (data) => {
      // 🔥 THIS LINE IS THE KEY
      reset({
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        moq: data.moq,
        payment: data.payment,
        showOnHome: data.showOnHome,
      })
    },
  })

  if (isLoading) return <LoadingSpinner />

  // 🔹 2. Submit Updated Data
  const onSubmit = async (data) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/product/${id}`,
      {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        moq: Number(data.moq),
      }
    )

    Swal.fire('Updated!', 'Product updated successfully', 'success')
    navigate('/dashboard/manage-products')
  }
  console.log(product)

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-3xl font-bold text-center mb-6'>
        Update Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

        {/* Product Name */}
        <input
          {...register('title')}
          className='input input-bordered w-full'
          placeholder='name'
        />

        {/* Description */}
        <textarea
          {...register('description')}
          className='textarea textarea-bordered w-full'
        />

        {/* Category */}
        <select {...register('category')} className='select select-bordered w-full'>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Jacket</option>
          <option>Accessories</option>
        </select>

        {/* Price */}
        <input
          type='number'
          {...register('price')}
          className='input input-bordered w-full'
        />

        {/* Quantity */}
        <input
          type='number'
          {...register('quantity')}
          className='input input-bordered w-full'
        />

        {/* MOQ */}
        <input
          type='number'
          {...register('moq')}
          className='input input-bordered w-full'
        />

        {/* Payment */}
        <select {...register('payment')} className='select select-bordered w-full'>
          <option>Cash on Delivery</option>
          <option>PayFast</option>
        </select>

        {/* Submit */}
        <button className='btn btn-primary w-full'>
          Update Product
        </button>
      </form>
    </div>
  )
}

export default UpdateProductForm
