import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAnimations } from "../../hooks/useAnimations";
import styles from './Home.module.scss';
import { TextRotator } from "../../components/TextRotator";

export const Home = () => {
    const { i18n } = useTranslation();

    const { name, configHome } = useLoaderData();

    const { createCirclesStyle } = useAnimations();

    const animatedBackgroundRef = useRef(null);

    useEffect(() => {
        createCirclesStyle(animatedBackgroundRef.current, configHome.animatedBackgroundItems);
    });

    return (
        <>
            {
                (() => {
                    if(configHome.displayAnimatedBackground && configHome.animatedBackgroundItems > 0) {
                        return <ul className={styles.circles} ref={animatedBackgroundRef}></ul>;
                    }
                })()
            }

            <div className={`section-content ${styles.vcentered}`}>
                <div className={`row ${styles.row}`}>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className={styles.titleBlock}>
                            <h2>{ name }</h2>

                            <TextRotator
                                animationClass={styles.textRotatorAnimation}
                                words={i18n.t('home.rotate_phrases', { lng: i18n.language, returnObjects: true })}
                                parentClass={styles.textRotator}
                            />

                            {
                                configHome.displayDownloadCVButton && (() => {
                                    return (
                                        <>
                                            <br />
                                            <a
                                                href={i18n.t('header.cv_link')}
                                                className={`btn btn-primary mt-5 ${configHome.displayDownloadCVButtonOnlyOnMobile ? 'd-inline-block d-lg-none' : 'd-inline-block'}`}
                                                download
                                            >
                                                {i18n.t('header.download_cv')}
                                            </a>
                                        </>
                                    )
                                })()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
