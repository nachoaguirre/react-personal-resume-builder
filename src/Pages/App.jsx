import { useEffect } from 'react';
import { Outlet, useLoaderData, useMatches } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header/Header';
import '../styles/globals.module.scss';
import styles from '../styles/main.module.scss';

export const App = () => {
    const theme = {
        primaryColor: styles.primaryColor,
        sectionBackgroundColor: styles.sectionBackgroundColor,
        bodyLight10: styles.bodyLight10,
        bodyDark10: styles.bodyDark10,
        bodyDark50: styles.bodyDark50,
        bodyDark90: styles.bodyDark90,
        alertModalTextColor: styles.alertModalTextColor,
        alertModalBackgroundColor: styles.alertModalBackgroundColor,
    }

    const { i18n } = useTranslation();

    const { configHeader } = useLoaderData();

    const matches = useMatches();
    let sectionId = matches.find((match) => Boolean(match.handle?.sectionId))?.handle.sectionId;

    useEffect(() => {
        let siteTitle = sectionId !== 'home' ? i18n.t(`${sectionId}.title`, { defaultValue: '' }) : `${configHeader.name} | ${configHeader.role}`;

        if (sectionId && siteTitle !== `${sectionId}.title`) {
            siteTitle = `${siteTitle.replace(/<\/?[^>]+(>|$)/g, "")} | ${configHeader.name}`;
        }

        document.title = siteTitle;

        let link = document.querySelector("link[rel='canonical']");
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', location.protocol + '//' + location.host + location.pathname);

        const sectionContainer = document.querySelector(`.section-holder`);
        if (sectionContainer) {
            sectionContainer.scrollTop = 0;
        }
    }, [sectionId, configHeader, i18n]);

    return (
        <>
        <ThemeProvider theme={theme}>
            <div className={styles.page}>
                <div className={styles.pageContent}>

                    <Header
                        configsHeader={{
                            sectionsConfig: configHeader.sections,
                            headerConfig: configHeader.header,
                            configName: configHeader.name,
                            configRole: configHeader.role,
                        }}
                    />

                    <div className={`${styles.contentArea} col-12 col-lg-8`}>
                        <section className={`${styles.section} section-holder pt-5 pe-5 pe-lg-4 pb-4 ps-5`} data-id={ sectionId }>
                            <Outlet />
                        </section>
                    </div>
                </div>
            </div>
        </ThemeProvider>
        </>
    )
}
