import { useCallback, useEffect, useState } from 'react'

const getMatches = () => {
    return typeof window === 'undefined' ? false : window.matchMedia('(max-width: 991px)').matches;
}

export const useResponsive = (styles) => {
    const [isMobile, setIsMobile] = useState(getMatches());
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [headerState, setHeaderState] = useState(false);

    const handleHeaderState = (headerState) => {
        setHeaderState(headerState);
    }

    const getSiteHeader = useCallback(() => {
        if (headerState) return headerState;
    }, [headerState]);

    const hideMobileMenu = useCallback(
        () => {
                getSiteHeader()?.classList.add(styles.hideMobileMenu);
                document.querySelector(`.${styles.menuToggle}`).classList.remove(styles.open);
        },
        [styles, getSiteHeader]
    );

    const handleMainMenuClick = (e) => {
        if (isMobile && (e.target.tagName.toLowerCase() === 'a' || e.target.className.includes('menu-item-text'))) {
            hideMobileMenu();
            setIsMobileMenuVisible(false);
        }
    }

    const handleMenuToggleIconClick = () => {
        const headerContainsHideMobileMenu = getSiteHeader()?.classList.contains(styles.hideMobileMenu);
        setIsMobileMenuVisible(headerContainsHideMobileMenu);
        getSiteHeader()?.classList.toggle(styles.hideMobileMenu);
        document.querySelector(`.${styles.menuToggle}`).classList.toggle(styles.open);
    };

    useEffect(() => {
        const handleResize = () => {
            const isCurrentMobile = getMatches();
            setIsMobile(isCurrentMobile)
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobileMenuVisible, hideMobileMenu]);

    return {
        handleHeaderState,
        handleMainMenuClick,
        handleMenuToggleIconClick,
    }
}
