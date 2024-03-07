import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';

vi.mock('i18next', async (importOriginal) => {
    const i18next = await importOriginal();

    return {
        ...i18next,
        changeLanguage: vi.fn((lng, callback) => {
            i18next.language = lng;
            callback && callback();
        }),
        t: vi.fn((key) => key),
        language: 'en',
    };
});

import { I18nextProvider } from 'react-i18next';
import i18n from '../../../src/helpers/_i18n.js';

import { BrowserRouter } from 'react-router-dom'
import { Header } from '../../../src/components/Header/Header.jsx';

const configsHeader = {
    sectionsConfig: [
        { title: 'Home', display: true, icon: 'fa6-solid:house'},
        { title: 'About', display: true, icon: 'fa6-solid:user'},
        { title: 'Resume', display: true, icon: 'fa6-solid:graduation-cap'},
        { title: 'Contact', display: true, icon: 'fa6-solid:envelope'}
    ],
    headerConfig: {
        displayPhoto: true,
        photoPath: 'img/header_photo.jpg',
        displayName: true,
        displayRole: true,
        displaySocialIcons: true,
        displayDownloadCVButton: true,
        displayChangeLanguageButton: true,
        socialIcons: [
            { icon: 'fa6-brands:linkedin-in', url: 'https://www.linkedin.com/in/[your-username]/', title: 'LinkedIn'},
            { icon: 'fa6-brands:github', url: 'https://github.com/[your-username]/', title: 'GitHub'},
            { icon: 'fa6-brands:stack-overflow', url: 'https://stackoverflow.com/users/[your-username]', title: 'Stack Overflow'},
            { icon: 'fa6-brands:codepen', url: 'https://codepen.io/[your-username]', title: 'CodePen' },
        ]
    },
    configName: 'John Doe',
    configRole: 'Role Name',
};

const getHeaderWrapped = (config) => {
    return (
        <I18nextProvider i18n={i18n}>
            <Header configsHeader={config} />
        </I18nextProvider>
    );
}

describe('Header component tests', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: query === "(max-width: 991px)",
                addListener: vi.fn(),
                removeListener: vi.fn(),
            })),
        });

        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'section-holder';
        document.body.appendChild(sectionContainer);

        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        vi.restoreAllMocks();
        vi.resetAllMocks();
    });

    it('should render without crashing', () => {
        render(getHeaderWrapped(configsHeader), { wrapper: BrowserRouter });
    });

    it('should render owners name', () => {
        render(getHeaderWrapped(configsHeader), { wrapper: BrowserRouter });
        expect(screen.getByText(configsHeader.configName)).toBeInTheDocument();
    });

    it('should render owners role', () => {
        render(getHeaderWrapped(configsHeader), { wrapper: BrowserRouter });
        expect(screen.getByText(configsHeader.configRole)).toBeInTheDocument();
    });

    it('should not display photo if config is disabled', () => {
        const currentConfig = {
            ...configsHeader,
            headerConfig: {
                ...configsHeader.headerConfig,
                displayPhoto: false
            }
        };

        render(getHeaderWrapped(currentConfig), { wrapper: BrowserRouter });

        expect(screen.queryByAltText(currentConfig.configName)).toBeNull();
    });

    it('should handle image onError correctly', () => {
        const currentConfig = {
            ...configsHeader,
            headerConfig: {
                ...configsHeader.headerConfig,
                photoPath: 'invalid-path'
            }
        };

        render(getHeaderWrapped(currentConfig), { wrapper: BrowserRouter });

        const img = screen.queryByAltText(currentConfig.configName);
        fireEvent.error(img)

        expect(img.src).toBe('https://i.pravatar.cc/180')
    })

    it('should not display div headerTitles if displayName and displayRole configs are disabled', () => {
        const currentConfig = {
            ...configsHeader,
            headerConfig: {
                ...configsHeader.headerConfig,
                displayName: false,
                displayRole: false
            }
        };

        const { container } = render(getHeaderWrapped(currentConfig), { wrapper: BrowserRouter });

        expect(container.querySelector('.headerTitles')).toBeNull();
    });

    it('should not display social links if config is disabled', () => {
        const currentConfig = {
            ...configsHeader,
            headerConfig: {
                ...configsHeader.headerConfig,
                displaySocialIcons: false
            }
        };

        const { container } = render(getHeaderWrapped(currentConfig), { wrapper: BrowserRouter });

        expect(container.querySelector('.socialLinks')).toBeNull();
    });

    it('should handle change language button click correctly', async () => {
        render(getHeaderWrapped(configsHeader), { wrapper: BrowserRouter });
        const button = screen.getByText('header.change_language');

        expect(i18n.language).toBe('en');

        await act(async () => {
            fireEvent.click(button);
        });

        expect(i18n.language).toBe('es');

        await act(async () => {
            fireEvent.click(button);
        });

        expect(i18n.language).toBe('en');

        expect(document.querySelector('.section-holder').scrollTop).toBe(0);
    })

    it('should use i18n.language when defined when changing language', async () => {
        render(getHeaderWrapped(configsHeader), { wrapper: BrowserRouter });
        const button = screen.getByText('header.change_language');

        i18n.language = 'en';

        expect(i18n.language).toBe('en');

        await act(async () => {
            fireEvent.click(button);
        });

        expect(i18n.language).toBe('es');
    })

    it('should use localstorage when i18n.language is undefined when changing language', async () => {
        i18n.language = undefined;

        vi.mock('window.localStorage', () => ({
            getItem: vi.fn((key) => {
                if (key === 'i18nextLng') return 'es';
                return null;
            }),
            setItem: vi.fn(),
        }));

        render(getHeaderWrapped(configsHeader), { wrapper: BrowserRouter });

        const button = screen.getByText('header.change_language');

        await act(async () => {
            fireEvent.click(button);
        });

        expect(i18n.language).toBe('en');
    })
})
