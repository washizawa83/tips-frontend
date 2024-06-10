import { colors, TextField } from '@mui/material';
import React from 'react';

type BaseTextFieldProps = {
    width: number;
    label: string;
};

export const BaseTextField = ({ width, label }: BaseTextFieldProps) => {
    const textFieldStyle = {
        width: width,
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
