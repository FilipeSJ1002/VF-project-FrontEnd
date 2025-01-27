import { Textarea, TextareaProps } from "@chakra-ui/react";

interface CustomTextareaProps extends TextareaProps {
    placeholder?: string;
    width?: string;
    height?: string;
}

function TextareaConfig(props: CustomTextareaProps) {
    return (
        <Textarea
            {...props}
            size="sm"
            resize="vertical"
            placeholder={props.placeholder || 'Digite aqui...'}
        />
    );
}

export default TextareaConfig;
