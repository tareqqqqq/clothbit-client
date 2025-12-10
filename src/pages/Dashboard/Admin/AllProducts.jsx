import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AllProductDataRow from '../../../components/Dashboard/TableRows/AllProductDataRow';

const AllProducts = () => {
     const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const result = await axios(`${import.meta.env.VITE_API_URL}/products`)
          return result.data
        },
      })
    
      if (isLoading) return <LoadingSpinner />
    return (
       
            <>
                  <div className='container mx-auto px-4 sm:px-8'>
                    <div className='py-8'>
                      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                          <table className='min-w-full leading-normal'>
                            <thead>
                              <tr>
                                <th
                                  scope='col'
                                  className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                  Email
                                </th>
                                <th
                                  scope='col'
                                  className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                  Role
                                </th>
                                <th
                                  scope='col'
                                  className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                  Status
                                </th>
            
                                <th
                                  scope='col'
                                  className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>

                                {products.map(product => (
                                      <AllProductDataRow key={product._id} product={product} />
                                    ))}
                              {/* <UserDataRow /> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
       
    );
};

export default AllProducts;