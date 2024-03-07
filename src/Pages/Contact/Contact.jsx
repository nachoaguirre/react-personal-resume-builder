import { useTranslation, Trans } from 'react-i18next';
import { useLoaderData } from "react-router-dom";
import { Icon } from '@iconify/react';
import { PageTitle } from '../../components/PageTitle';
import { PageSubtitle } from '../../components/PageSubtitle';
import { ContactForm } from '../../components/ContactForm';
import { ContactPersonalInfo } from '../../components/ContactPersonalInfo';
import { useEmailJs } from '../../hooks/useEmailJs';
import styles from './Contact.module.scss';

export const Contact = () => {
    const { i18n } = useTranslation();

    const { configContact, configPersonalInfo } = useLoaderData();

    const { hasEmailJsCredentials } = useEmailJs();

    const shouldDisplayContactForm = (configContact.displayContactForm === true && hasEmailJsCredentials() === true);

    return (
        <>
            <PageTitle title={i18n.t('contact.title')} />

            <div className="section-content">
                <div className="row">

                    <div className={ shouldDisplayContactForm ? 'col-12 col-md-4' : 'col-12'}>
                        <ContactPersonalInfo
                            blocks={Object.entries(configContact.personalInfo)}
                            styles={{
                                contactPersonalInfo: styles.contactPersonalInfo,
                            }}
                            configPersonalInfo={configPersonalInfo}
                            Trans={Trans}
                            Icon={Icon}
                            i18n={i18n}
                        />
                    </div>

                    {
                        shouldDisplayContactForm &&
                            <div className="col-12 col-md-8">
                                <PageSubtitle title={<Trans i18nKey="contact.form.title"></Trans>} />
                                <ContactForm
                                    useRecaptcha={ configContact.useRecaptcha }
                                    configAlert={{
                                        alertModalTextColor: styles.alertModalTextColor,
                                        alertModalBackgroundColor: styles.alertModalBackgroundColor,
                                        alertModalLoaderClass: styles.popupLoader,
                                        alertModalTimerProgressBarClass: styles.popupTimerProgressBar,
                                    }}
                                    styles={{
                                        controls: styles.controls,
                                        leftColumn: styles.leftColumn,
                                        formGroup: styles.formGroup,
                                        formControl: styles.formControl,
                                        formControlBorder: styles.formControlBorder,
                                        rightColumn: styles.rightColumn,
                                        textarea: styles.textarea,
                                        sendForm: styles.sendForm,
                                        disabled: styles.disabled,
                                        formGroupFocus: styles.formGroupFocus,
                                        error: styles.error,
                                        recaptcha: styles.recaptcha,
                                    }}
                                    alerts={{
                                        sending: {
                                            title: i18n.t('contact.alert.sending.title'),
                                            text: i18n.t('contact.alert.sending.text'),
                                        },
                                        success: {
                                            title: i18n.t('contact.alert.success.title'),
                                            text: i18n.t('contact.alert.success.text'),
                                        },
                                        error: {
                                            title: i18n.t('contact.alert.error.title'),
                                            text: i18n.t('contact.alert.error.text'),
                                        },
                                    }}
                                    formLabels={{
                                        name: i18n.t('contact.form.label.name'),
                                        email: i18n.t('contact.form.label.email'),
                                        subject: i18n.t('contact.form.label.subject'),
                                        message: i18n.t('contact.form.label.message'),
                                        send: i18n.t('contact.form.label.send'),
                                    }}
                                    invalidEmailMessage={i18n.t('contact.form.invalid_email')}
                                />
                            </div>
                    }

                </div>

            </div>
        </>
    )
}