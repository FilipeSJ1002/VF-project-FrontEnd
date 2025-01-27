import { Button } from '@chakra-ui/react';

interface ButtonConfigProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ButtonConfigMini: React.FC<ButtonConfigProps> = ({ type, text, onClick, isLoading = false, isDisabled = false}) => {
  return (
    <Button
      bg="aliceblue"
      color="#333"
      borderRadius="10px"
      size={'sm'}
      p="5px 15px"
      border="2px solid black"
      transition="0.5s"
      isLoading={isLoading}
      _hover={{
        textDecoration: "underline",
        transition: "0.7s",
        boxShadow: "5px 5px black"
      }}
      isDisabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
};

export default ButtonConfigMini;
