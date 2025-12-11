import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const PurchaseModal = ({ isOpen, closeModal, product }) => {
  const { user } = useAuth();

  const {
    _id,
    title,
    price,
    quantity,
    moq,       // Minimum order quantity
    payment,   // PayFast / Cash on Delivery
    manager,
  } = product || {};

  const { register, handleSubmit, watch, reset } = useForm();
  const orderQty = watch("orderQuantity");
  const totalPrice = orderQty ? orderQty * price : price;

  const onSubmit = async (data) => {
    // Validation
    if (data.orderQuantity > quantity) {
      return toast.error("❌ Order quantity cannot exceed available quantity!");
    }
    if (data.orderQuantity < moq) {
      return toast.error(`❌ Minimum quantity is ${moq}`);
    }

    const orderData = {
      productId: _id,
      title,
      price,
      quantity: data.orderQuantity,
      totalPrice,
      buyerEmail: user?.email,
      buyerName: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      address: data.address,
      notes: data.notes,
      paymentMethod: payment,  // comes from DB
      status: payment === "PayFast" ? "pending" : "cod-pending",
      manager,
    };

    try {
      // Online PayFast (Stripe)
      if (payment === "PayFast") {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
          orderData
        );
        window.location.href = res.data.url;
        return;
      }

      // Cash on Delivery
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData);
      toast.success("Order placed successfully!");
      reset();
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <DialogPanel className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <DialogTitle className="text-xl font-semibold text-center mb-4">
          Place Your Order
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              value={user?.email}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Product Name */}
          <div>
            <label>Product Name</label>
            <input
              value={title}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Price */}
          <div>
            <label>Price</label>
            <input
              value={`$${price}`}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* First Name */}
          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="w-full border p-2 rounded"
          />

          {/* Last Name */}
          <input
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="w-full border p-2 rounded"
          />

          {/* Quantity */}
          <div>
            <label>
              Order Quantity (Min: {moq}, Max: {quantity})
            </label>
            <input
              {...register("orderQuantity", { required: true })}
              type="number"
              min={moq}
              max={quantity}
              placeholder="Order Quantity"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Total Price */}
          <div>
            <label>Total Price</label>
            <input
              value={`$${totalPrice}`}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Phone */}
          <input
            {...register("phone", { required: true })}
            placeholder="Contact Number"
            className="w-full border p-2 rounded"
          />

          {/* Address */}
          <textarea
            {...register("address", { required: true })}
            placeholder="Delivery Address"
            className="w-full border p-2 rounded h-20"
          ></textarea>

          {/* Notes */}
          <textarea
            {...register("notes")}
            placeholder="Additional Notes"
            className="w-full border p-2 rounded h-16"
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md mt-3"
          >
            {payment === "PayFast" ? "Proceed to Payment" : "Place Order (COD)"}
          </button>
        </form>

        <button
          onClick={closeModal}
          className="w-full mt-3 bg-red-500 text-white py-2 rounded-md"
        >
          Cancel
        </button>
      </DialogPanel>
    </Dialog>
  );
};

export default PurchaseModal;
