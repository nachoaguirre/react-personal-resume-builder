import PropTypes from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";

export const Recaptcha = (props) => {
    const { recaptchaRef, className } = props;

    return (
        <ReCAPTCHA
            className={className}
            theme='dark'
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        />
    )
}

Recaptcha.propTypes = {
    recaptchaRef: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
}
