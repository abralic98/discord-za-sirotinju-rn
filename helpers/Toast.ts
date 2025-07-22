import Toast from "react-native-toast-message";

interface ToastProps {
  title: string;
  description?: string;
}

export const showSuccess = ({ title, description }: ToastProps) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: description,
  });
};

export const showError = ({ title, description }: ToastProps) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: description,
  });
};

export const showInfo = ({ title, description }: ToastProps) => {
  Toast.show({
    type: "info",
    text1: title,
    text2: description,
  });
};
