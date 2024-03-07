import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import { MainMenu } from "./MainMenu";
import { SocialLinks } from "./SocialLinks";
import { useResponsive } from '../../hooks/useResponsive';
import styles from '../../styles/Header.module.scss';

export const Header = (props) => {
    const { configsHeader } = props;
    const { sectionsConfig, headerConfig, configName, configRole } = configsHeader;

    const headerRef = useRef(null);

    const { i18n } = useTranslation();

    const { handleHeaderState, handleMainMenuClick, handleMenuToggleIconClick } = useResponsive(styles);

    const imageOnError = (event) => {
        event.currentTarget.src = 'https://i.pravatar.cc/180';
    };

    const switchLang = () => {
        const currentLanguageCode = i18n.language || window.localStorage.getItem('i18nextLng') || '';
        const switchNewLang = currentLanguageCode === 'en' ? 'es' : 'en';

        i18n.changeLanguage(switchNewLang);

        const sectionContainer = document.querySelector(`.section-holder`);
        sectionContainer.scrollTop = 0;
    }

    useEffect(() => {
        handleHeaderState(headerRef.current);
    });

    return (
        <>
            <header
                className={`${styles.header} ${styles.hideMobileMenu} d-lg-block col-lg-4`}
                ref={headerRef}
            >
                { headerConfig.displayPhoto &&
                    <div className={styles.headerPhoto}>
                        <img src={headerConfig.photoPath} alt={configName} onError={imageOnError} />
                    </div>
                }

                {
                    headerConfig.displayName || headerConfig.displayRole ? (
                        <div className={styles.headerTitles}>
                            { headerConfig.displayName && <h2>{ configName }</h2> }
                            { headerConfig.displayRole && <h4>{ configRole }</h4> }
                        </div>
                    ) : null
                }

                <MainMenu
                    sectionsConfig={sectionsConfig}
                    handleMainMenuClick={handleMainMenuClick}
                    styles={styles}
                />

                {
                    headerConfig.displaySocialIcons &&
                        <SocialLinks
                            socialIcons={headerConfig.socialIcons}
                            styles={styles}
                        />
                }

                <div className={styles.headerButtons}>
                    {
                        headerConfig.displayDownloadCVButton &&
                            <a href={i18n.t('header.cv_link')} className={`btn btn-primary ${styles.btnPrimary}`} download>
                                {i18n.t('header.download_cv')}
                            </a>
                    }
                    {
                        headerConfig.displayChangeLanguageButton &&
                            <a className={`btn btn-primary ${styles.btnPrimary} ${styles.btnSm}`} onClick={switchLang}>
                                {i18n.t('header.change_language')}
                            </a>
                    }
                </div>
            </header>

            <div
                className={`${styles.menuToggle} d-block d-lg-none`}
                onClick={handleMenuToggleIconClick}
            >
                <span></span><span></span><span></span>
            </div>
        </>

    )
};

Header.propTypes = {
    configsHeader: PropTypes.object.isRequired,
};