'use client';

import * as React from 'react';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ToastProvider } from '@/providers/ToastProvider';
import { Separator } from '@/components/ui/separator';

export default function SpacesPage() {
    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-white'>
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                Indonads' Twitter Spaces Catalog (Updated
                                Regularly)
                            </h1>
                        </div>

                        <Accordion type='multiple'>
                            {/* INDONADS AMA Section */}
                            <AccordionItem value='indonads-ama'>
                                <AccordionTrigger className='dark:text-gray-300'>
                                    INDONADS AMA
                                </AccordionTrigger>
                                <AccordionContent className='dark:text-gray-300'>
                                    <ul>
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1748323108975743401?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Segalanya Tentang Monad
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1750773847304053033?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad & Narasi Parallel EVM
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1753381020718760260?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad di Tengah Narasi Modular
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1763118793671553083?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad di ETH Denver
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1765648750217986333?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Airdrop Wormhole & Ekosistem
                                                Monad
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1770768673772335549?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Devnet & Kultur Komunitas Monad
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1780933235587129658?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad: Kau yang Kuasai Bumi Kah?
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1785995256510709836?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad & Komunitas Regionalnya
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/republikrupiah/status/1788550940423082362?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Alpha Monad Menuju Q3 2024
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1796089185008328780?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Update Seputar Monad & Indonads
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1801229754357731572?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad Meetup & Ecosystem
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1803770083224772907?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Banyak Jalan Menuju Monad
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1806303705584771075?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad & Spektrum Blockchain
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1808485228736131466?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Indonads 1st Anniversary
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1811376420331114590?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Ask Indonads Anything
                                            </a>
                                        </li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            {/* INDOPODS Section */}
                            <AccordionItem value='indopods'>
                                <AccordionTrigger className='dark:text-gray-300'>
                                    INDOPODS
                                </AccordionTrigger>
                                <AccordionContent className='dark:text-gray-300'>
                                    <ul>
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1795454066924855798?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Women in Indonads
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1800525948414271923?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Community Lead by a Woman
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1803062871892308227?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Annyeong!
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1805600901702533501?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Monad SG & MY
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1808137778133454908?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                Women in Web3
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/indonads_/status/1810674090845647271?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                The Rise of Moblin
                                            </a>
                                        </li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            {/* INDONADS & FRENS Section */}
                            <AccordionItem value='indonads-frens'>
                                <AccordionTrigger className='dark:text-gray-300'>
                                    INDONADS & FRENS
                                </AccordionTrigger>
                                <AccordionContent className='dark:text-gray-300'>
                                    <ul>
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/ikuzodao/status/1768232805300056267?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                ft. Ikuzo DAO
                                            </a>
                                        </li>
                                        <Separator className='my-2 dark:border-gray-600' />
                                        <li className='py-2'>
                                            <a
                                                href='https://x.com/stresscapitals/status/1775736367563350312?s=46&t=RElNKQgCEl-H3JnaVv9pyg'
                                                className='text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300'
                                            >
                                                ft. Stress Capital
                                            </a>
                                        </li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
