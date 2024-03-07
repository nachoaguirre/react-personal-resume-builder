export const useContactForm = (props) => {
    const { styles, invalidEmailMessage } = props;

    const resetForm = (form) => {
        form.current.reset();
        removeAllFormGroupsFocus(form);
        if(window.grecaptcha) {
            window.grecaptcha.reset();
        }
    }

    const removeAllFormGroupsFocus = (form) => {
        const formControls = form.current.querySelectorAll(`.${styles.formControl}`);
        if (!formControls) return;
        formControls.forEach((formControl) => {
            formControl.parentNode.classList.remove(styles.formGroupFocus);
        });
    }

    const handleFormInputsListeners = (form) => {
        const formControls = form.current.querySelectorAll(`.${styles.formControl}`);

        formControls.forEach((formControl) => {
            formControl.value = '';

            formControl.addEventListener('focusin', function() {
                this.parentNode.classList.add(styles.formGroupFocus);
            });

            formControl.addEventListener('focusout', function() {
                if (this.value.length === 0) {
                    this.parentNode.classList.remove(styles.formGroupFocus);
                    this.parentNode.classList.remove(styles.formControlBorderError);

                    if(this.type === 'email') {
                        const label = this.parentNode.querySelector('label');
                        if (!label.hasAttribute('data-original-text')) {
                            label.setAttribute('data-original-text', label.innerText);
                        }
                        const labelOriginalText = label.getAttribute('data-original-text');
                        label.innerText = labelOriginalText;
                    }
                }
            });
        });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (e) => {
        const parentNode = e.target.parentNode;
        const formControlBorder = parentNode.querySelector(`.${styles.formControlBorder}`);
        const formElement = e.target.form;
        const sendBtn = formElement.querySelector(`.${styles.formSubmitBtn}`);
        const label = parentNode.querySelector('label');

        if (!label.hasAttribute('data-original-text')) {
            label.setAttribute('data-original-text', label.innerText);
        }

        const labelOriginalText = label.getAttribute('data-original-text');

        if (!isValidEmail(e.target.value)) {
            parentNode.classList.add(styles.formControlBorderError);
            formControlBorder.classList.add(styles.formControlBorderError);

            if (!label.innerText.includes(` (${invalidEmailMessage})`)) {
                label.innerText = `${labelOriginalText} (${invalidEmailMessage})`;
            }

            if (!sendBtn.hasAttribute('disabled')) {
                sendBtn.setAttribute('disabled', 'disabled');
            }
        } else {
            parentNode.classList.remove(styles.formControlBorderError);
            formControlBorder.classList.remove(styles.formControlBorderError);

            label.innerText = labelOriginalText;

            if (sendBtn.hasAttribute('disabled')) {
                sendBtn.removeAttribute('disabled');
            }
        }
    }

    const checkRecaptchaConfig = () => {
        const envValue = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
        if(!envValue) {
            console.error('Recaptcha site key is missing. Check your .env file or create from .env.dist.');
            return false;
        }

        return true;
    }

    return {
        resetForm,
        handleFormInputsListeners,
        handleEmailChange,
        checkRecaptchaConfig,
    }
}