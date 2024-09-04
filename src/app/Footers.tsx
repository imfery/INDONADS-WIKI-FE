import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footers: React.FC = () => {
    return (
        <div className='bg-violet-950'>
            <div className='max-w-2xl mx-auto text-white py-10'>
                <div className='text-center'>
                    <h3 className='text-3xl mb-3'>MonadPedia</h3>
                    <p className='line-clamp-3 mx-12'>
                        Your go-to resource for all things related to
                        MonadPedia..
                    </p>
                    <div className='flex justify-center my-10'>
                        <div className='flex items-center border w-auto rounded-lg px-4 py-2 mx-2'>
                            <Link href='https://x.com/monadpedia'>
                                <Image
                                    src='https://static.vecteezy.com/system/resources/previews/042/148/611/non_2x/new-twitter-x-logo-twitter-icon-x-social-media-icon-free-png.png'
                                    alt='X'
                                    width={28}
                                    height={28}
                                    className='w-7 md:w-8'
                                />
                            </Link>
                            <div className='text-left ml-3'>
                                <p className='text-xs text-gray-200'>
                                    Follow us
                                </p>
                                <p className='text-sm md:text-base'>in X.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400'>
                    <p className='order-2 md:order-1 mt-8 md:mt-0'>
                        &copy; MonadPedia 2024.
                    </p>
                    <div className='order-1 md:order-2'>
                        <span className='px-2'>About us</span>
                        <span className='px-2 border-l'>Contact us</span>
                        <span className='px-2 border-l'>Privacy Policy</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footers;
