'use client';
import React from 'react';

import SearchAndCreate from '@/app/components/admin/events/SearchAndCreate';
import AdminLayout from '@/app/layouts/AdminLayouts';

const NewsDashboardList: React.FC = () => {
    // const [newsData, setNewsData] = useState<AllNewsData | null>(null);
    // const [currentPage, setCurrentPage] = useState(1);
    // const resultsPerPage = 10;
    // const { success, error } = useToast();

    // const loadNews = async () => {
    //   try {
    //     const data = await fetchAllNews({
    //       sortField: 'updatedAt',
    //       sortBy: 'desc',
    //       limit: resultsPerPage,
    //       page: currentPage,
    //     });
    //     setNewsData(data); // Set the correct type
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       console.error('Error fetching news:', error.message);
    //     } else {
    //       console.error('Unexpected error:', error);
    //     }
    //   }
    // };

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
        // Implement search logic here
    };

    const handleCreate = () => {
        // Implement create news logic here
    };

    // useEffect(() => {
    //   loadNews();
    // }, [currentPage]);

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            News
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Manage the list of news articles shown to the user
                            here.
                        </p>
                        <SearchAndCreate
                            onSearch={handleSearch}
                            onCreate={handleCreate}
                            createLabel='Create News'
                            placeholder='Search for news'
                            href='/admin/news/create'
                        />
                        {/* Additional components and logic would go here */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewsDashboardList;
