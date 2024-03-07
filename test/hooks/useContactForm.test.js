import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useContactForm } from '../../src/hooks/useContactForm';

const styles = {
    formControl: 'form-control',
    formGroupFocus: 'form-group-focus',
    formControlBorderError: 'form-control-border-error',
    formControlBorder: 'form-control-border',
    formSubmitBtn: 'form-submit-btn',
};

const invalidEmailMessage = 'Invalid email';

const mainProps = {
    styles,
    invalidEmailMessage,
};

describe('useContactForm tests', () => {
    const { result } = renderHook(() => useContactForm(mainProps));

    it('should reset form', () => {
        const { resetForm } = result.current;
        const form = {
            current: {
                reset: vi.fn(),
                querySelectorAll: vi.fn().mockReturnValue([]),
            },
        };
        window.grecaptcha = { reset: vi.fn() };
        resetForm(form);
        expect(form.current.reset).toHaveBeenCalled();
        expect(window.grecaptcha.reset).toHaveBeenCalled();
    });

    it('should not remove formGroupFocus if formControls is undefined when reseting Form', () => {
        const { resetForm } = result.current;

        const form = {
            current: {
                reset: vi.fn(),
                querySelectorAll: vi.fn().mockReturnValue(undefined),
            },
        };

        window.grecaptcha = { reset: vi.fn() };
        resetForm(form);

        expect(form.current.querySelectorAll).toHaveBeenCalledWith(`.${styles.formControl}`);
    });

    it('should remove formGroupFocus from formControl when reseting form', () => {
        const { resetForm } = result.current;

        const formControl = document.createElement('input');
        formControl.classList.add(styles.formControl);

        const formGroup = document.createElement('div');
        formGroup.classList.add(styles.formGroupFocus);
        formGroup.appendChild(formControl);

        const form = {
            current: {
                reset: vi.fn(),
                querySelectorAll: vi.fn().mockReturnValue([formControl])
            }
        };
        window.grecaptcha = { reset: vi.fn() };

        resetForm(form);

        expect(formGroup.classList.contains(styles.formGroupFocus)).toBe(false);
    });


    it('should handle form inputs listeners', () => {
        const { handleFormInputsListeners } = result.current;

        const formControl = document.createElement('input');
        formControl.classList.add('form-control');

        const formGroup = document.createElement('div');
        formGroup.appendChild(formControl);

        const form = { current: { querySelectorAll: vi.fn().mockReturnValue([formControl]) } };
        handleFormInputsListeners(form);

        const focusinEvent = new Event('focusin');
        formControl.dispatchEvent(focusinEvent);
        expect(formGroup.classList.contains('form-group-focus')).toBe(true);

        const focusoutEvent = new Event('focusout');
        formControl.dispatchEvent(focusoutEvent);
        expect(formGroup.classList.contains('form-group-focus')).toBe(false);
    });

    it('should handle empty value in form inputs listeners', () => {
        const { handleFormInputsListeners } = result.current;

        const formControl = document.createElement('input');
        formControl.type = 'email';
        formControl.classList.add(styles.formControl);
        formControl.value = '';


        const label = document.createElement('label');
        label.innerText = 'Email';
        // label.setAttribute('data-original-text', 'Email');

        const formGroup = document.createElement('div');
        formGroup.appendChild(formControl);
        formGroup.appendChild(label);

        const form = {
            current: {
                querySelectorAll: vi.fn().mockReturnValue([formControl])
            }
        };

        handleFormInputsListeners(form);

        const focusinEvent = new Event('focusin');
        formControl.dispatchEvent(focusinEvent);
        expect(formGroup.classList.contains(styles.formGroupFocus)).toBe(true);

        const focusoutEvent = new Event('focusout');
        formControl.dispatchEvent(focusoutEvent);
        expect(formGroup.classList.contains(styles.formGroupFocus)).toBe(false);
        expect(formGroup.classList.contains(styles.formControlBorderError)).toBe(false);
        expect(label.innerText).toBe('Email');
    });

    it('should handle invalid value when email change', () => {
        const { handleEmailChange } = result.current;

        const formControl = document.createElement('input');
        formControl.classList.add(styles.formControl);

        const formControlBorder = document.createElement('div');
        formControlBorder.classList.add(styles.formControlBorder);

        const formLabel = document.createElement('label');
        formLabel.innerText = 'Email';

        const formGroup = document.createElement('div');
        formGroup.appendChild(formControl);
        formGroup.appendChild(formLabel);
        formGroup.appendChild(formControlBorder);

        const sendBtn = document.createElement('button');
        sendBtn.classList.add(styles.formSubmitBtn);

        const form = {
            target: {
                value: 'invalid-email',
                parentNode: formGroup,
                form: {
                    querySelector: vi.fn().mockReturnValue(sendBtn),
                },
            }
        };

        handleEmailChange(form);

        expect(formGroup.classList.contains(styles.formControlBorderError)).toBe(true);
        expect(formControlBorder.classList.contains(styles.formControlBorderError)).toBe(true);
        expect(formLabel.innerText).toBe(`Email (${invalidEmailMessage})`);
        expect(sendBtn.hasAttribute('disabled')).toBe(true);
    });


    it('should handle valid value when email change', () => {
        const { handleEmailChange } = result.current;

        const formControl = document.createElement('input');
        formControl.classList.add(styles.formControl);

        const formControlBorder = document.createElement('div');
        formControlBorder.classList.add(styles.formControlBorder);

        const formLabel = document.createElement('label');
        formLabel.innerText = 'Email';

        const formGroup = document.createElement('div');
        formGroup.appendChild(formControl);
        formGroup.appendChild(formLabel);
        formGroup.appendChild(formControlBorder);

        const sendBtn = document.createElement('button');
        sendBtn.classList.add(styles.formSubmitBtn);
        sendBtn.disabled = true;

        const form = {
            target: {
                value: 'valid@email.com',
                parentNode: formGroup,
                form: {
                    querySelector: vi.fn().mockReturnValue(sendBtn),
                },
            }
        };

        handleEmailChange(form);

        expect(formGroup.classList.contains(styles.formControlBorderError)).toBe(false);
        expect(formControlBorder.classList.contains(styles.formControlBorderError)).toBe(false);
        expect(formLabel.innerText).toBe(`Email`);
        expect(sendBtn.hasAttribute('disabled')).toBe(false);
    });

    it('should return false if param is true but env value is not set when checking recaptcha config', () => {
        const { checkRecaptchaConfig } = result.current;
        vi.stubEnv('VITE_RECAPTCHA_SITE_KEY', '');
        const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        expect(checkRecaptchaConfig(true)).toBe(false);
        expect(consoleMock).toHaveBeenCalledOnce();
        expect(consoleMock).toHaveBeenLastCalledWith('Recaptcha site key is missing. Check your .env file or create from .env.dist.');
        vi.unstubAllEnvs()
        consoleMock.mockReset();
    })

    it('should return true if param is true and env value is set when checking recaptcha config', () => {
        const { checkRecaptchaConfig } = result.current;
        vi.stubEnv('VITE_RECAPTCHA_SITE_KEY', 'abc');
        expect(checkRecaptchaConfig(true)).toBe(true)
        vi.unstubAllEnvs()
    })
})
