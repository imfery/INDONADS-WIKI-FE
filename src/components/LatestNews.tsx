import React from 'react';
import { LatestNews } from '@/types';
import Image from 'next/image';

interface LatestNewsListProps {
    news: LatestNews[];
    title: string;
}

const EventsList: React.FC<LatestNewsListProps> = ({ news = [], title }) => (
    
)