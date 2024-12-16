import { toast } from "react-toastify";

export const toastwarn = (message: string, options: any) => {
    toast.warn(message,options)
    toast.update(options.toastId, { ...options, render: message });
  }

  export const toastsuccess = (message: string, options: any) => {
    toast.success(message,options)
    toast.update(options.toastId, { ...options, render: message });
  }

  export const toasterror = (message: string, options: any) => {
    toast.error(message,options)
    toast.update(options.toastId, { ...options, render: message });
  }