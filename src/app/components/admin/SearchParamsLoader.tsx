'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Fragment } from 'react';

export default function SearchParamsLoader({
    onLoad,
}: {
    onLoad: (params: URLSearchParams | null) => void;
}) {
    const params = useSearchParams();
    useEffect(() => {
        onLoad(params);
    }, [params, onLoad]);

    return <Fragment />;
}
