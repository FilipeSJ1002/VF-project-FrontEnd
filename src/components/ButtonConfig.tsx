import { Button } from '@chakra-ui/react';

interface ButtonConfigProps {
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ButtonConfig: React.FC<ButtonConfigProps> = ({ width, height, type, text, onClick, isLoading = false, isDisabled = false }) => {
  return (
    <Button
      width={width || "200px"}
      height={height || "50px"}

      bg="aliceblue"
      color="#333"
      borderRadius="10px"
      fontSize="lg"
      p="20px 15px"
      border="2px solid black"
      boxShadow="5px 5px black"
      transition="0.5s"
      isLoading={isLoading}
      _hover={{
        color: "aliceblue",
        bg: "#333",
        textDecoration: "underline",
        transition: "0.7s",
        boxShadow: "10px 10px black"
      }}
      isDisabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
};

export default ButtonConfig;
