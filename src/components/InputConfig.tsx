import { Input } from "@chakra-ui/react";

interface InputConfigProps {
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    height?: string;
  }

function InputConfig ({placeholder, type, value, onChange, width, height }: InputConfigProps) {
  return (
    <Input
    margin={'10px'}
    background-color= '#f0f0f0'
    border= '1px solid #ccc'
    padding= '5px'
    border-radius= '5px'
    font-size= '16px'
    color= '#333'
    outline= 'none'
    width={width}
    height={height}
    resize={"vertical"}
    _focus={{
        borderColor: '#007BFF',
        boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)' 
    }}
    value={value}
    placeholder={placeholder} 
    type={type}
    onChange={onChange}
    >
    </Input>
  );
};

export default InputConfig;
