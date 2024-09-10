'use client';

import * as React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ToastProvider } from '@/providers/ToastProvider';

export default function AboutPage() {
    return (
        <ToastProvider>
            <main>
                <Header />
                <section className='bg-white mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                About Monadpedia
                            </h1>
                        </div>

                        <div className='relative mb-8'>
                            <Image
                                src='/images/og.jpg'
                                alt='Monadpedia'
                                width={800}
                                height={480}
                                className='rounded-lg'
                            />
                        </div>

                        <div className='text-lg text-gray-700 mb-8'>
                            <p className='mb-4'>
                                <strong>Monadpedia</strong> is a community-owned
                                project from <strong>Indonads</strong>. It is a
                                collaborative platform aimed at expanding
                                knowledge, fostering innovation, and providing a
                                centralized hub for everything related to the{' '}
                                <strong>Monad blockchain</strong>.
                            </p>
                            <p className='mb-4'>
                                Monad is a cutting-edge blockchain designed to
                                prioritize scalability, speed, and security. It
                                aims to empower decentralized applications
                                (dApps) and provide a sustainable infrastructure
                                for the growing blockchain ecosystem.
                            </p>
                            <p className='mb-4'>
                                At Monadpedia, we believe in{' '}
                                <strong>growing the pie</strong>—working
                                together to increase the value and benefits for
                                everyone involved. We are continuously evolving
                                and improving, and we are{' '}
                                <strong>
                                    open to feedback and directive suggestions
                                </strong>{' '}
                                from the community.
                            </p>
                        </div>

                        {/* Accordion Section */}
                        <Accordion type='single' collapsible className='w-full'>
                            <AccordionItem value='item-1'>
                                <AccordionTrigger>
                                    What is Monadpedia?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Monadpedia is a decentralized,
                                    community-driven platform that provides
                                    information and resources about Monad
                                    blockchain.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value='item-2'>
                                <AccordionTrigger>
                                    What is the Monad blockchain?
                                </AccordionTrigger>
                                <AccordionContent>
                                    The Monad blockchain is a new scalable
                                    blockchain technology designed to support
                                    decentralized applications with high
                                    throughput, low latency, and security.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value='item-3'>
                                <AccordionTrigger>
                                    How can I contribute to Monadpedia?
                                </AccordionTrigger>
                                <AccordionContent>
                                    You can contribute by providing feedback,
                                    suggesting improvements, or sharing new
                                    ideas on the Monadpedia platform. We are
                                    open to all forms of collaboration!
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <p className='mb-4 mt-10'>
                            <strong>Note:</strong> Monadpedia is still in active
                            development. So please expect flaws & defects as
                            incremental changes and updates regarding features
                            and interfaces will keep rolling out.
                        </p>
                        <p className='mb-4 mt-10'>
                            We are here for the community, gmonad {'<3'}.
                        </p>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
