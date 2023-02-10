import { toast } from 'react-toastify';

const Toaster = () => {

  const showSuccessToast = (text = '') => {
    toast.success(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }
  
  const showInfoToast = (text = '') => {
    toast.info(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }
  
  const showErrorToast = (text = '') => {
    toast.error(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }

  const showWarningToast = (text = '') => {
    toast.warn(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }

  const showToast = (text = '') => {
    toast(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }

  return {
    showSuccessToast,
    showInfoToast,
    showErrorToast,
    showWarningToast,
    showToast,
  }
}

export default Toaster