import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';
import i18n from '../../src/helpers/_i18n.js';

import { BrowserRouter } from 'react-router-dom'
import { BioWidget } from '../../src/components/BioWidget.jsx';
import { PageSubtitle } from '../../src/components/PageSubtitle.jsx';

// eslint-disable-next-line no-unused-vars
const TransMock = ({ i18nKey, children }) => children;

const props = {
    displayTitle: true,
    pageSubtitle: (
        <PageSubtitle
            title={<TransMock i18nKey="about.what_i_do.title">What I Do</TransMock>}
        />
    ),
    styles: {
        personalInfo: 'personalInfo',
        personalInfoItem: 'personalInfoItem',
        personalInfoTitle: 'personalInfoTitle',
        personalInfoValue: 'personalInfoValue',
    },
    configPersonalInfo: {
        birthDay: '01/01/2000',
        location: 'Location',
        email: 'email@domain.com',
        phone: '123456789'
    },
    configAboutPersonalInfo: {
        age: { display: true },
        location: { display: true },
        email: { display: true },
        phone: { display: true }
    },
    displayPersonalInfo: true,
    bioTexts: ['Bio text 1', 'Bio text 2'],
    Trans: TransMock
};

const getComponentWrapped = (config) => {
    return (
        <I18nextProvider i18n={i18n}>
            <BioWidget {...config} />
        </I18nextProvider>
    );
}

describe('BioWidget component tests', () => {
    it('should render without crashing', () => {
        render(getComponentWrapped(props), { wrapper: BrowserRouter });
        //screen.debug();
    });

    it('should not render title when displayTitle config.about.components.bio.displayTitle is false', () => {
        const currentProps = {
            ...props,
            displayTitle: false
        };

        render(getComponentWrapped(currentProps), { wrapper: BrowserRouter });
        expect(screen.queryByText('What I Do')).toBeNull();
    });

    it('should not add col-sm-7 to bioTexts wrapper when displayPersonalInfo is false', () => {
        const currentProps = {
            ...props,
            displayPersonalInfo: false
        };

        const { container } = render(getComponentWrapped(currentProps), { wrapper: BrowserRouter });

        const biotextsWrapper = container.querySelector('.biotexts-wrapper');

        expect(biotextsWrapper.className.trim()).toBe('biotexts-wrapper col-12');
        expect(biotextsWrapper.className).not.toContain('col-sm-7');
    });

    it('should not render PersonalinfoWidget when displayPersonalInfo is false', () => {
        const currentProps = {
            ...props,
            displayPersonalInfo: false
        };

        const { container } = render(getComponentWrapped(currentProps), { wrapper: BrowserRouter });

        const personalInfoWidgetWrapper = container.querySelector('.personal-info-widget-wrapper');
        expect(personalInfoWidgetWrapper).toBeNull();
    });
})
