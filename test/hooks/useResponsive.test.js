import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive } from '../../src/hooks/useResponsive';

const styles = {
    hideMobileMenu: 'hide-mobile-menu',
    menuToggle: 'menu-toggle',
    open: 'open',
};

describe('useResponsive tests', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: query === "(max-width: 991px)",
                addListener: vi.fn(),
                removeListener: vi.fn(),
            })),
        });

        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
    });

    it('should handle header state correctly', () => {
        const { result } = renderHook(() => useResponsive(styles))

        const header = document.createElement('header');

        act(() => {
          result.current.handleHeaderState(header);
        })

        expect(result.current.handleHeaderState).toBeTruthy()
    });

    it('should toggle mobile menu visibility with current closed menu on handleMenuToggleIconClick', async () => {
        window.matchMedia.mockImplementation(() => ({
          matches: true
        }));

        document.body.innerHTML = `
          <div class="${styles.menuToggle}"></div>
          <header class="${styles.hideMobileMenu}"></header>
        `;

        const header = document.querySelector('header');
        const menuToggle = document.querySelector(`.${styles.menuToggle}`);

        const { result } = renderHook(() => useResponsive(styles));

        act(() => {
            result.current.handleHeaderState(header);
        });

        act(() => {
            result.current.handleMenuToggleIconClick();
        });

        expect(menuToggle.classList.contains(styles.open)).toBeTruthy();
        expect(header.classList.contains(styles.hideMobileMenu)).toBeFalsy();
    });

    it('should toggle mobile menu visibility with current open menu on handleMenuToggleIconClick', async () => {
        window.matchMedia.mockImplementation(() => ({
          matches: true
        }));

        document.body.innerHTML = `
          <div class="${styles.menuToggle} ${styles.open}"></div>
          <header class=""></header>
        `;

        const header = document.querySelector('header');
        const menuToggle = document.querySelector(`.${styles.menuToggle}`);

        const { result } = renderHook(() => useResponsive(styles));

        act(() => {
            result.current.handleHeaderState(header);
        });

        act(() => {
            result.current.handleMenuToggleIconClick();
        });

        expect(menuToggle.classList.contains(styles.open)).toBeFalsy();
        expect(header.classList.contains(styles.hideMobileMenu)).toBeTruthy();
    });

    it('should hide mobile menu on main menu item click', async () => {
        window.matchMedia.mockImplementation(query => ({
            matches: query === "(max-width: 991px)"
        }));

        document.body.innerHTML = `
            <div class="${styles.menuToggle}"></div>
            <header class="${styles.hideMobileMenu}"></header>
        `;

        const menuToggle = document.querySelector(`.${styles.menuToggle}`);
        const header = document.querySelector('header');
        const menuItem = document.createElement('a');
        menuItem.className = 'menu-item';
        menuItem.textContent = 'Menu Item';
        document.body.appendChild(menuItem);

        const { result } = renderHook(() => useResponsive(styles));

        act(() => {
            result.current.handleHeaderState(header);
        });

        menuItem.addEventListener('click', result.current.handleMainMenuClick);

        act(() => {
            result.current.handleMenuToggleIconClick();
        });

        expect(header.classList.contains(styles.hideMobileMenu)).toBeFalsy();
        expect(menuToggle.classList.contains(styles.open)).toBeTruthy();

        act(() => {
            menuItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(header.classList.contains(styles.hideMobileMenu)).toBeTruthy();
        expect(menuToggle.classList.contains(styles.open)).toBeFalsy();
    });
 })
