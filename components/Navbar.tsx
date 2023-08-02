import { useState, useEffect } from 'react';

const TOP_OFFSET = 1; // 66;

export default function Navbar () {
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setShowBackground(window.scrollY >= TOP_OFFSET);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <nav>
            Navbar
            {showBackground ? ' Background' : ' No Background'}
        </nav>
    );
}

