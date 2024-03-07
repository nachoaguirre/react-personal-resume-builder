import emailjs from '@emailjs/browser';

export const useEmailJs = () => {
    const emailJsCredentials = {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        public_key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };

    const hasEmailJsCredentials = () => {
        const check = Object.entries(emailJsCredentials).reduce((errors, [key, value]) => {
            if (value === undefined || value === null || value === '') {
                errors.push(key);
            }
            return errors;
        }, []);

        if (check.length > 0) {
            console.error(`EmailJS credentials are missing. Check your .env file or create from .env.dist. Missing keys: ${check.join(', ')}`);
            return false;
        }
        return true;
    }

    const submitToEmailJs = async (form) => {
        const send = await emailjs.sendForm(
            emailJsCredentials.serviceId,
            emailJsCredentials.templateId,
            form,
            emailJsCredentials.public_key
        );

        return send;
    }

    return {
        emailJsCredentials,
        hasEmailJsCredentials,
        submitToEmailJs
    }
}