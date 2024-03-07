import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import { useEmailJs } from '../../src/hooks/useEmailJs';

class EmailJSResponseStatus {
    constructor(status, text) {
      this.status = status;
      this.text = text;
    }
}
vi.mock("@emailjs/browser", () => {
    const actual = vi.importActual("@emailjs/browser");
    return {
        ...actual,
        default: {
            ...actual.default,
            sendForm: vi.fn(),
        },
    };
});

describe('useEmailJs tests', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.resetAllMocks();
    });

    beforeEach(() => {
        vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'fake-service-id');
        vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'fake-template-id');
        vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'fake-public-key');
    });

    it('should return true if all emailJS values are set in .env when check EmailJS credentials', () => {
        const { result } = renderHook(() => useEmailJs());
        const { hasEmailJsCredentials } = result.current;
        const resultCheck = hasEmailJsCredentials();
        expect(resultCheck).toBe(true);
    });

    it('should return false if some env value is empty when check EmailJS credentials', () => {
        vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '');

        const { result } = renderHook(() => useEmailJs());

        const { hasEmailJsCredentials } = result.current;

        const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        const resultCheck = hasEmailJsCredentials();

        expect(resultCheck).toBe(false);
        expect(consoleMock).toHaveBeenCalledOnce();
        expect(consoleMock).toHaveBeenLastCalledWith('EmailJS credentials are missing. Check your .env file or create from .env.dist. Missing keys: serviceId');
    });

    it('should submit to EmailJS', async () => {
        emailjs.sendForm.mockResolvedValue(new EmailJSResponseStatus(200, 'OK'));

        const { result } = renderHook(() => useEmailJs());
        const { submitToEmailJs } = result.current;
        const form = document.createElement('form');

        const response = await submitToEmailJs(form);

        expect(response).toBeInstanceOf(EmailJSResponseStatus);
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
        expect(emailjs.sendForm).toHaveBeenCalled();
    });

    it('should handle error when submitting to EmailJS', async () => {
        expect.assertions(4);
        emailjs.sendForm.mockRejectedValue(new EmailJSResponseStatus(400, "The Public Key is invalid. To find this ID, visit https://dashboard.emailjs.com/admin/account"));

        const { result } = renderHook(() => useEmailJs());
        const { submitToEmailJs } = result.current;
        const form = document.createElement('form');

        try {
            await submitToEmailJs(form);
        } catch (error) {
            expect(error).toBeInstanceOf(EmailJSResponseStatus);
            expect(error.status).toBe(400);
            expect(error.text).toBe("The Public Key is invalid. To find this ID, visit https://dashboard.emailjs.com/admin/account");
            expect(emailjs.sendForm).toHaveBeenCalled();
        }
    });
 })
