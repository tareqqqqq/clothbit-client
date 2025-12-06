import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";


const AddProductForm = () => {
    const {user}=useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [previewImages, setPreviewImages] = useState([]);

  // Image Preview
  const handleImagePreview = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      toast.loading("Uploading images...");

      //  Multiple Image Upload to imgBB
      const imageFiles = Array.from(data.images);
      const uploadPromises = imageFiles.map((img) => imageUpload(img));
      const imageUrls = await Promise.all(uploadPromises);

      // Final Product Object
      const productData = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        quantity: Number(data.quantity),
        moq: Number(data.moq),
        images: imageUrls, 
        video: data.video || "",
        payment: data.payment,
        showOnHome: data.showOnHome || false,
        createdAt: new Date(),
        manager:{
            image:user?.photoURL || '',
            name:user?.displayName || '',
            email:user?.email || ''
        }
      };


const {result}=await axios.post(`${import.meta.env.VITE_API_URL}/products`,productData)
console.log(result);
    //    Save to Database
    //   await axios.post("http://localhost:5000/products", productData);

      toast.dismiss();
      toast.success(" Product Added Successfully!");
      reset();
      setPreviewImages([]);
    } catch (error) {
      toast.dismiss();
      toast.error(" Product upload failed!");
      console.error(error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster />

      <div className="card bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-center mb-6">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/*  PRODUCT NAME */}
            <div>
              <label className="block text-lg font-bold mb-1">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="input input-bordered w-full"
                {...register("title", { required: "Product name is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/*  DESCRIPTION */}
            <div>
              <label className="block text-lg font-bold mb-1">
                Product Description
              </label>
              <textarea
                placeholder="Write product details"
                className="textarea textarea-bordered w-full min-h-[120px]"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-lg font-bold mb-1">Category</label>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Accessories</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/*  PRICE + QUANTITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-lg font-bold mb-1">Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="input input-bordered w-full"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-bold mb-1">
                  Available Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  className="input input-bordered w-full"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            {/*  MOQ */}
            <div>
              <label className="block text-lg font-bold mb-1">
                Minimum Order Quantity (MOQ)
              </label>
              <input
                type="number"
                placeholder="Enter MOQ"
                className="input input-bordered w-full"
                {...register("moq", { required: "MOQ is required" })}
              />
              {errors.moq && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.moq.message}
                </p>
              )}
            </div>

            {/*  IMAGE UPLOAD */}
            <div>
              <label className="block text-lg font-bold mb-2">
                Upload Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("images", {
                  required: "Images are required",
                  onChange: handleImagePreview,
                })}
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.images.message}
                </p>
              )}

              {/*  IMAGE PREVIEW */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {previewImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="w-full h-28 object-cover rounded-xl border"
                    alt="preview"
                  />
                ))}
              </div>
            </div>

            {/*  DEMO VIDEO */}
            <div>
              <label className="block text-lg font-bold mb-1">
                Demo Video Link (Optional)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                className="input input-bordered w-full"
                {...register("video")}
              />
            </div>

            {/*  PAYMENT */}
            <div>
              <label className="block text-lg font-bold mb-1">
                Payment Option
              </label>
              <select
                className="select select-bordered w-full"
                {...register("payment", {
                  required: "Payment option is required",
                })}
              >
                <option value="">Select Payment</option>
                <option>Cash on Delivery</option>
                <option>PayFast</option>
              </select>
              {errors.payment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.payment.message}
                </p>
              )}
            </div>

            {/*  SHOW ON HOME */}
            <div className="flex items-center gap-4 mt-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                {...register("showOnHome")}
              />
              <span className="text-lg font-bold">
                Show on Home Page
              </span>
            </div>

            {/*  SUBMIT BUTTON */}
            <button className="btn btn-primary w-full text-lg mt-6">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
