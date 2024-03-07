import { useTranslation, Trans } from 'react-i18next';
import { PageTitle } from '../../components/PageTitle';
import { PageSubtitle } from '../../components/PageSubtitle';
import { SkillsWidget } from '../../components/SkillsWidget';
import { CertificatesWidget } from '../../components/CertificatesWidget';
import { TimelineWidget } from '../../components/TimelineWidget';
import styles from './Resume.module.scss';

export const Resume = () => {
    const { i18n } = useTranslation();

    return (
        <>
            <PageTitle title={i18n.t('resume.title')} />

            <div className="section-content">

                <div className="row">
                    <div className="col-12 col-sm-7 col-md-8">
                        <TimelineWidget
                            pageSubtitle={<PageSubtitle title={i18n.t('resume.experience.title')} />}
                            styles={{
                                timeline: styles.timeline,
                                timelineItem: styles.timelineItem,
                                leftPart: styles.leftPart,
                                itemPeriod: styles.itemPeriod,
                                itemCompany: styles.itemCompany,
                                divider: styles.divider,
                                rightPart: styles.rightPart,
                                itemTitle: styles.itemTitle
                            }}
                            blocks={i18n.t("resume.experience.blocks", { returnObjects: true })}
                            type="experience"
                        />

                        <TimelineWidget
                            pageSubtitle={<PageSubtitle title={i18n.t("resume.education.title")} customClass='pt-5' />}
                            styles={{
                                timeline: styles.timeline,
                                timelineItem: styles.timelineItem,
                                leftPart: styles.leftPart,
                                itemPeriod: styles.itemPeriod,
                                itemCompany: styles.itemCompany,
                                divider: styles.divider,
                                rightPart: styles.rightPart,
                                itemTitle: styles.itemTitle
                            }}
                            blocks={i18n.t("resume.education.blocks", { returnObjects: true })}
                            type="education"
                        />
                    </div>

                    <div className="col-12 col-sm-5 col-md-4 pt-5 pt-sm-0">
                        <SkillsWidget
                            pageSubtitle={<PageSubtitle title={<Trans i18nKey="resume.hard_skills.title"></Trans>} />}
                            styles={{
                                widgetWrap: styles.skillsInfo,
                                itemDescription: styles.skillValue,
                                itemWrap: styles.skill,
                            }}
                            blocks={i18n.t("resume.hard_skills.blocks", { returnObjects: true })}
                            displayDescription={true}
                        />

                        <SkillsWidget
                            pageSubtitle={<PageSubtitle title={<Trans i18nKey="resume.soft_skills.title"></Trans>} customClass='pt-2' />}
                            styles={{
                                widgetWrap: styles.skillsInfo,
                                itemWrap: styles.skill,
                            }}
                            blocks={i18n.t("resume.soft_skills.blocks", { returnObjects: true })}
                            displayDescription={false}
                        />

                        <SkillsWidget
                            pageSubtitle={<PageSubtitle title={i18n.t("resume.strengths.title")} customClass='pt-2' />}
                            styles={{
                                widgetWrap: styles.skillsInfo,
                                itemWrap: styles.strength,
                            }}
                            blocks={i18n.t("resume.strengths.blocks", { returnObjects: true })}
                            displayDescription={false}
                        />
                    </div>

                </div>

                <div className="row pt-5">
                    <CertificatesWidget
                        pageSubtitle={<PageSubtitle title={i18n.t("resume.certificates.title")} />}
                        styles={{
                            certificateItem: styles.certificateItem,
                            certiLogo: styles.certiLogo,
                            certiContent: styles.certiContent,
                            certiTitle: styles.certiTitle,
                            certiDate: styles.certiDate,
                            certiCompany: styles.certiCompany
                        }}
                        blocks={i18n.t("resume.certificates.blocks", { returnObjects: true })}
                    />
                </div>

            </div>
        </>
    )
}
