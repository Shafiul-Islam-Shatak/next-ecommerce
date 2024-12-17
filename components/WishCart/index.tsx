import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { TiArrowForward } from "react-icons/ti";
import { CiTrash } from "react-icons/ci";
import Link from 'next/link';


const WishPage = () => {
    const wishList = useSelector((state: RootState) => state.wishList.wishItems);

    console.log(wishList)

    return (
        <div className='max-w-[1420px] mx-auto'>
            {
                wishList.length > 0 ?
                    <div>
                        {
                            wishList.map((product: any, idx: number) => (
                                <div key={idx} className='flex items-center justify-between mt-5 bg-gray-50 py-5 px-10 rounded-xl hover:bg-blue-100'>
                                    {/* image */}
                                    <div className='flex items-center space-x-10 '>
                                        <Image
                                            src={product.thumb}
                                            width={80}
                                            height={80}
                                            alt={product.name}
                                            className='rounded-xl'
                                        />

                                        {/* products name and price */}
                                        <div>
                                            <h1 className='text-black font-semibold'>{product.name}</h1>
                                            <h1>Price : {product.price}</h1>
                                        </div>
                                    </div>

                                    {/* buttons */}
                                    <div className='flex flex-col space-y-2 text-black'>
                                        <Link href={`/product/${product.id}`}>
                                            <button className='bg-orange-100 p-3 rounded-md hover:bg-orange-300 flex items-center justify-center gap-1'>
                                                <h1>View</h1>
                                                <TiArrowForward />
                                            </button>
                                        </Link>
                                        <button className='bg-orange-100 p-3 rounded-md hover:bg-orange-300 flex items-center justify-center gap-1'>
                                            <h1>Remove</h1>
                                            <CiTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div> : 'Nothing'
            }
        </div>
    );
};

export default WishPage;
