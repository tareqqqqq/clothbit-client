import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import toast from 'react-hot-toast'

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const [role] = useRole()
  const navigate = useNavigate()
  const { id } = useParams()

  // Load product details
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const {
    images = [],
    title,
    description,
    category,
    quantity,
    minQuantity,
    price,
    paymentOption,
    demoVideo,
    managerName
  } = product || {}

  // Only buyers can order
  const showOrderButton = user && role === 'buyer'

  const handleOrderClick = () => {
    if (!user) {
      return toast.error("Please login to order!")
    }
    if (role !== "buyer") {
      return toast.error("Only buyers can order!")
    }
    setIsOpen(true)
  }

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row gap-12">

        {/* Left Section: Images + Video */}
        <div className="flex flex-col gap-4 flex-1">

          {/* Main Image Full Width */}
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full h-[420px] rounded-xl"
              src={images[0]}
              alt="Product"
            />
          </div>

          {/* Extra Images */}
          {images?.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {images.slice(1).map((img, i) => (
                <img
                  key={i}
                  className="h-28 w-full object-cover rounded-lg"
                  src={img}
                  alt="sub"
                />
              ))}
            </div>
          )}

          {/* Demo Video */}
          {demoVideo && (
            <video
              controls
              className="rounded-xl w-full mt-4"
              src={demoVideo}
            ></video>
          )}
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <Heading title={title} subtitle={`Category: ${category}`} />

          <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>

          <hr className="my-6" />

          <p className="font-semibold text-gray-700">
            Seller: {managerName}
          </p>

          <p className="text-gray-500 mt-2">
            Available Quantity: {quantity}
          </p>

          <p className="text-gray-500">
            Minimum Order: {minQuantity}
          </p>

          <p className="text-gray-500 capitalize">
            Payment Mode: {paymentOption === 'cod' ? 'Cash On Delivery' : 'Pay First'}
          </p>

          <hr className="my-6" />

          <div className="flex justify-between items-center">
            <p className="font-bold text-3xl text-gray-700">
              Price: ${price}
            </p>

            {/* Only BUYER can see this button */}
            {showOrderButton && (
              <Button
                onClick={handleOrderClick}
                label={paymentOption === "cod" ? "Order Now (COD)" : "Book & Pay"}
              />
            )}

            {/* Guest → show login button */}
            {!user && (
              <Button
                onClick={() => navigate("/login")}
                label="Login to Order"
              />
            )}
          </div>

          {/* Modal */}
          <PurchaseModal
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            product={product}
          />
        </div>

      </div>
    </Container>
  )
}

export default ProductDetails
