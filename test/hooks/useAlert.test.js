import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useAlert } from '../../src/hooks/useAlert';
import Swal from 'sweetalert2/dist/sweetalert2.min.js';

const swalFire = vi.spyOn(Swal, 'fire');
const showLoading = vi.spyOn(Swal, 'showLoading');

describe('useAlert tests', () => {
    beforeEach(() => {
        swalFire.mockImplementation((params) => {
            if (params.willClose && typeof params.willClose === 'function') {
                const mockEvent = {};
                params.willClose(mockEvent);
            }
            if (params.didOpen && typeof params.didOpen === 'function') {
                const mockEvent = {};
                params.didOpen(mockEvent);
            }
            return Promise.resolve(true);
        });

        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should display success alert', () => {
        const { displaySuccessAlert } = useAlert({});
        displaySuccessAlert({ title: 'Success', html: 'Operation successful' });

        const fireResultProps = Swal.fire.mock.calls[0][0];

        expect(Swal.fire).toHaveBeenCalled();
        expect(fireResultProps.title).toBe('Success');
        expect(fireResultProps.html).toBe('Operation successful');
    });

    it('should display sending alert', async () => {
        const { displaySendingAlert } = useAlert({});
        displaySendingAlert({
            title: 'Sending',
            html: 'Operation in progress',
        });

        expect(swalFire).toHaveBeenCalled();
        expect(showLoading).toHaveBeenCalled()
    });

    it('should display error alert', () => {
        const { displayErrorAlert } = useAlert({});
        displayErrorAlert({ title: 'Error', html: 'Operation failed', error: 'Network error', closeFunction: vi.fn() });

        const fireResultProps = swalFire.mock.calls[0][0];

        expect(swalFire).toHaveBeenCalled();
        expect(fireResultProps.title).toBe('Error');
        expect(fireResultProps.html).toBe('Operation failed');
        expect(fireResultProps.footer).toBe('<small>Error: Network error</small>');
    });

    it('calls willClose function with event parameter on alert close', async () => {
        const closeFunctionMock = vi.fn();
        const { displayErrorAlert } = useAlert({});

        displayErrorAlert({
            title: 'Error',
            html: 'Operation failed',
            error: 'Network error',
            closeFunction: closeFunctionMock
        });

        expect(closeFunctionMock).toHaveBeenCalled();
    });
 })
