'use client';
import React, { createContext, ReactNode, useContext } from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

interface ToastContextProps {
    success: (message: string | React.ReactNode, duration?: number) => void;
    error: (message: string | React.ReactNode, duration?: number) => void;
    info: (message: string | React.ReactNode, duration?: number) => void;
    warning: (message: string | React.ReactNode, duration?: number) => void;
    custom: (
        jsx: (id: number | string) => React.ReactElement,
        duration?: number
    ) => void;
    dismiss: (id?: number | string) => void;
    loading: (message: string | React.ReactNode, duration?: number) => void;
    promise: <T>(
        promise: Promise<T>,
        data: { loading: string; success: string; error: string },
        duration?: number
    ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
    defaultDuration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    defaultDuration = 5000,
}) => {
    const success = (message: string | React.ReactNode, duration?: number) =>
        sonnerToast.success(message, { duration: duration ?? defaultDuration });
    const error = (message: string | React.ReactNode, duration?: number) =>
        sonnerToast.error(message, { duration: duration ?? defaultDuration });
    const info = (message: string | React.ReactNode, duration?: number) =>
        sonnerToast.info(message, { duration: duration ?? defaultDuration });
    const warning = (message: string | React.ReactNode, duration?: number) =>
        sonnerToast.warning(message, { duration: duration ?? defaultDuration });
    const custom = (
        jsx: (id: number | string) => React.ReactElement,
        duration?: number
    ) => sonnerToast.custom(jsx, { duration: duration ?? defaultDuration });
    const dismiss = (id?: number | string) => sonnerToast.dismiss(id);
    const loading = (message: string | React.ReactNode, duration?: number) =>
        sonnerToast.loading(message, { duration: duration ?? defaultDuration });
    const promise = <T,>(
        promise: Promise<T>,
        data: { loading: string; success: string; error: string },
        duration?: number
    ) =>
        sonnerToast.promise(promise, {
            ...data,
            duration: duration ?? defaultDuration,
        });

    return (
        <ToastContext.Provider
            value={{
                success,
                error,
                info,
                warning,
                custom,
                dismiss,
                loading,
                promise,
            }}
        >
            {children}
            <Toaster position='top-right' />{' '}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
