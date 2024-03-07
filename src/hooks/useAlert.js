import Swal from 'sweetalert2/dist/sweetalert2.min.js';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useAlert = (configAlert) => {
    const displaySuccessAlert = ({title, html}) => {
        const sentAlertParams = {
            title: title,
            html: html,
            timerProgressBar: true,
            timer: 20000,
            imageUrl: "img/contact_ok.png",
            imageWidth: 200,
            imageHeight: 200,
        };

        renderAlert(sentAlertParams);
    }

    const displaySendingAlert = ({title, html, showFunction = showLoading}) => {
        const sendingAlertParams = {
            title: title,
            icon: 'info',
            html: html,
            showconfirmbutton: false,
            timerProgressBar: true,
            showLoading: true,
            timer: 200000,
            didOpen: () => {
                showFunction();
            }
        };

        renderAlert(sendingAlertParams);
    }

    const displayErrorAlert = ({title, html, error, closeFunction}) => {
        const errorAlertParams = {
            title: title,
            icon: 'error',
            html: html,
            footer: `<small>Error: ${error}</small>`,
            willClose: () => {
                closeFunction();
            },
        };

        renderAlert(errorAlertParams);
    }

    const renderAlert = (params) => {
        const alertParams = {
            title: params.title,
            html: params.html,
            icon: params.icon ?? '',
            footer: params.footer,
            color:configAlert.alertModalTextColor,
            background: configAlert.alertModalBackgroundColor,
            showConfirmButton: params.showConfirmButton ?? true,
            confirmButtonText: params.confirmButtonText ?? 'Ok',
            showCancelButton: params.showCancelButton ?? false,
            cancelButtonText: params.cancelButtonText ?? 'Cancel',
            imageUrl: params.imageUrl ? params.imageUrl : '',
            imageWidth: params.imageWidth ? params.imageWidth : 400,
            imageHeight: params.imageHeight ? params.imageHeight : 200,
            timer: Number.isInteger(params.timer) ? params.timer : 100000,
            timerProgressBar: params.timerProgressBar ?? false,
            position: 'center',
            customClass: {
                loader: configAlert.alertModalLoaderClass,
                timerProgressBar: configAlert.alertModalTimerProgressBarClass,
            },
            willClose: (e) => {
                if(typeof params.willClose === 'function') {
                    params.willClose(e);
                }
            },
            didOpen: (e) => {
                if(typeof params.didOpen === 'function') {
                    params.didOpen(e);
                }
            },
        };

        Swal.fire(alertParams);
    }

    const showLoading = () => {
        Swal.showLoading();
    }

    return {
        displaySuccessAlert,
        displaySendingAlert,
        displayErrorAlert
    }
}
