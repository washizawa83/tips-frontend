import { TextField } from '@mui/material';
import React from 'react';

type BaseTextFieldProps = {
    label: string;
    width?: number;
};

export const TextFieldComponent = ({ label, width }: BaseTextFieldProps) => {
    const textFieldStyle = {
        maxWidth: width ? width : '100%',
        width: '100%',
        '& .MuiInputBase-input': {
            color: '#e0d8f5',
        },
        '& label': {
            color: '#c3b0fa',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#c3b0fa',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#c3b0fa',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#c3b0fa',
            },
            '&:hover fieldset': {
                borderColor: '#c3b0fa',
            },
        },
        '.css-96k49a-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
            color: '#c3b0fa',
        },
        '.css-165kd6v-MuiInputBase-root-MuiInput-root::after': {
            borderColor: '#c3b0fa',
        },
    };
    return (
        <TextField
            id='standard-basic'
            label={label}
            variant='standard'
            sx={textFieldStyle}
        />
    );
};
