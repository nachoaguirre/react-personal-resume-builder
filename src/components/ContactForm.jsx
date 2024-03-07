import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Recaptcha } from './Recaptcha';
import { useEmailJs } from '../hooks/useEmailJs';
import { useAlert } from '../hooks/useAlert';
import { useContactForm } from '../hooks/useContactForm';

export const ContactForm = (props) => {
    const { useRecaptcha, configAlert, styles, alerts, formLabels, invalidEmailMessage } = props;

    const form = useRef();
    const recaptchaRef = useRef();

    const { resetForm, handleFormInputsListeners, handleEmailChange, checkRecaptchaConfig } = useContactForm({
        styles: {
            formControl: styles.formControl,
            formGroupFocus: styles.formGroupFocus,
            formControlBorder: styles.formControlBorder,
            formControlBorderError: styles.error,
            formSubmitBtn: styles.sendForm,
        },
        invalidEmailMessage,
    });

    const { displaySuccessAlert, displaySendingAlert, displayErrorAlert } = useAlert(configAlert);

    const { submitToEmailJs } = useEmailJs();

    // const canUseRecaptcha = checkRecaptchaConfig(useRecaptcha);
    const canUseRecaptcha = useRecaptcha ? checkRecaptchaConfig() : false;

    useEffect(() => {
        handleFormInputsListeners(form);
    }, [handleFormInputsListeners]);

    const sendForm = (e) => {
        e.preventDefault();

        displaySendingAlert({
            title: alerts.sending.title,
            html: alerts.sending.text,
        });

        submitToEmailJs(form.current)
        .then(() => {
            displaySuccessAlert({
                title: alerts.success.title,
                html: alerts.success.text,
            });

            resetForm(form);
        }, (error) => {
            displayErrorAlert({
                title: alerts.error.title,
                html: alerts.error.text,
                error: error.text,
                closeFunction: resetForm(form)
            });
        });

        if (canUseRecaptcha) {
            window.grecaptcha.reset();
        }
    }

    return (
        <form id="contact_form" ref={form} onSubmit={sendForm}>
            <div className={styles.controls}>
                <div className="row">
                    <div className="col-12 col-sm-6">

                        <div className={styles.formGroup}>
                            <input id="form_name" type="text" name="name" className={styles.formControl} placeholder="" required="required" />
                            <label>{formLabels.name}</label>
                            <div className={styles.formControlBorder}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <input id="form_email" type="email" name="email" className={styles.formControl} placeholder="" required="required" onChange={ handleEmailChange } />
                            <label>{formLabels.email}</label>
                            <div className={styles.formControlBorder}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <input id="form_subject" type="text" name="subject" autoComplete="off" className={styles.formControl} placeholder="" required="required" />
                            <label>{formLabels.subject}</label>
                            <div className={styles.formControlBorder}></div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
                        <div className={styles.formGroup}>
                            <textarea id="form_message" name="message" className={`${styles.formControl} ${styles.textarea}`} placeholder="" rows="7" required="required"></textarea>
                            <label>{formLabels.message}</label>
                            <div className={styles.formControlBorder}></div>
                        </div>
                    </div>
                </div>

                {
                    canUseRecaptcha && (
                        <Recaptcha
                            recaptchaRef={recaptchaRef}
                            className={styles.recaptcha}
                        />
                    )
                }

                <input
                    type="submit"
                    className={styles.sendForm}
                    value={formLabels.send}
                />
            </div>
        </form>
    )
}

ContactForm.propTypes = {
    useRecaptcha: PropTypes.bool.isRequired,
    configAlert: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    alerts: PropTypes.object.isRequired,
    formLabels: PropTypes.object.isRequired,
    invalidEmailMessage: PropTypes.string.isRequired,
}
