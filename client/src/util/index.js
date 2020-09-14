import { toast } from 'react-toastify';

const toastObj = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
export const toastSuccessMessage = (message) => {
    toast.success(message, toastObj);
};
export const toastErrorMessage = (message) => {
    toast.error(message, toastObj);
};
export const toastWarnMessage = (message) => {
    toast.warn(message, toastObj);
};
export const toastInfoMessage = (message) => {
    toast.info(message, toastObj);
};
