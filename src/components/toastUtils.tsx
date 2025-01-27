import { useToast } from "@chakra-ui/react";

const useAlertToast = () => {
  const toast = useToast();

  const alertToast = (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  return { alertToast };
};

export default useAlertToast;
