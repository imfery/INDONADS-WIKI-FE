import { FC, useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { LightbulbIcon, MoonStarsIcon } from '@/components/icons/DarkModeIcons';

const ToggleDarkMode: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode === 'enabled') {
                setIsDarkMode(true);
                document.body.classList.add('dark');
            } else {
                setIsDarkMode(false);
                document.body.classList.remove('dark');
            }
        }
    }, []);

    const toggleMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    return (
        <div className='flex items-center space-x-2'>
            {isDarkMode ? <MoonStarsIcon /> : <LightbulbIcon />}
            <Switch checked={isDarkMode} onCheckedChange={toggleMode} />
        </div>
    );
};

export default ToggleDarkMode;
