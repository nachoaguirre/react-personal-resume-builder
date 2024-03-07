import { useLoaderData } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useTranslation, Trans } from 'react-i18next';
import { PageTitle } from '../../components/PageTitle';
import { PageSubtitle } from '../../components/PageSubtitle';
import { WhatIDo } from "../../components/WhatIDo";
import { TestimonialsWidget } from "../../components/TestimonialsWidget";
import { BioWidget } from "../../components/BioWidget";
import styles from './About.module.scss';

export const About = () => {
    const { configPersonalInfo, configAbout } = useLoaderData();

    const { i18n } = useTranslation();

    const components = {
        bio: (
            <BioWidget
                key="bio"
                displayTitle={configAbout.components.bio.displayTitle}
                pageSubtitle={<PageSubtitle title={<Trans i18nKey="about.bio_title">Bio</Trans>} />}
                styles={{
                    personalInfo: styles.personalInfo,
                    personalInfoItem: styles.personalInfoItem,
                    personalInfoTitle: styles.personalInfoTitle,
                    personalInfoValue: styles.personalInfoValue,
                }}
                configPersonalInfo={configPersonalInfo}
                configAboutPersonalInfo={configAbout.personalInfo}
                displayPersonalInfo={configAbout.displayPersonalInfo}
                bioTexts={i18n.t('about.bio', { returnObjects: true })}
                Trans={Trans}
            />
        ),

        whatIDo: (
            <WhatIDo
                key="whatIDo"
                displayTitle={configAbout.components.whatIDo.displayTitle}
                pageSubtitle={<PageSubtitle title={<Trans i18nKey="about.what_i_do.title">What <span>I Do</span></Trans>} />}
                styles={styles}
                Icon={Icon}
                blocks={i18n.t('about.what_i_do.blocks', { returnObjects: true })}
            />
        ),

        testimonials: (
            <TestimonialsWidget
                key="testimonials"
                displayTitle={configAbout.components.testimonials.displayTitle}
                pageSubtitle={<PageSubtitle title={i18n.t('about.testimonials.title')} />}
                blocks={i18n.t('about.testimonials.blocks', { returnObjects: true })}
                icons={{
                    "quote-right": <Icon icon="fa6-solid:quote-right" />,
                    "angle-left": <Icon icon="fa6-solid:angle-left" />,
                    "angle-right": <Icon icon="fa6-solid:angle-right" />
                }}
                styles={{
                    testimonial: styles.testimonial,
                    text: styles.text,
                    authorInfo: styles.authorInfo,
                    author: styles.author,
                    role: styles.role,
                    icon: styles.icon,
                    testimonialControls: styles.testimonialControls,
                    btnPrev: styles.btnPrev,
                    btnNext: styles.btnNext,
                    splideTrackOverflow: styles.splideTrackOverflow,
                }}
            />
        ),
    };

    const orderedComponents = configAbout.order
        .filter(name => components[name] && configAbout.components[name]['display'])
        .map(name => { return <div key={name} className="row">{components[name]}</div> });

    const remainingComponents = Object.keys(components)
        .filter(name => !configAbout.order.includes(name) && configAbout.components[name]['display'])
        .map(name => { return <div key={name} className="row">{components[name]}</div> });

    let allComponents = orderedComponents.concat(remainingComponents);

    allComponents = allComponents.map((component, index) =>
        index === 0 ? component : (
            <div key={component.key} className="row pt-5">
                {component.props.children}
            </div>
        )
    );

    return (
        <>
            <PageTitle title={<Trans i18nKey="about.title">About <span>Me</span></Trans>} />

            <div className="section-content">
                { allComponents }
            </div>
        </>
    )
}
