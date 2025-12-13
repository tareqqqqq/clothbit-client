import axios from 'axios'

import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import ProductDataRow from '../../../components/Dashboard/TableRows/ProductDataRow'

const ManageProducts = () => {

    const {user}=useAuth()
    const [search, setSearch] = useState("");
    const { data: products = [], isLoading,refetch } = useQuery({
        queryKey: ['products',user?.email],
        queryFn: async () => {
          const result = await axios(`${import.meta.env.VITE_API_URL}/my-product/${user?.email}`)
          return result.data
        },
      })
      console.log(products);
    
      if (isLoading) return <LoadingSpinner />
        const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );
  //     const handleDelete = async (id) => {
  //   const confirm = window.confirm("Are you sure you want to delete this product?");
  //   if (!confirm) return;

  //   await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
  //   refetch();
  // };
    return (
         <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          {/* 🔍 Search Input */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Manage Products
        </h2>

        <input
          type="text"
          placeholder="Search by name or category"
          className="border px-3 py-2 rounded-md w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <ProductDataRow key={product._id} refetch={refetch} product={product} />
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default ManageProducts;