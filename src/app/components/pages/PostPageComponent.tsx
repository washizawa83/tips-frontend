import { Box } from '@mui/material';
import React from 'react';
import { EditorComponent } from '../editor/EditorComponent';
import { loadData } from '../editor/loadData';
import { TextFieldComponent } from '../ui/TextFieldComponent';

const contentWidth = 800;

export const PostPageComponent = () => {
    const tips = loadData();
    return (
        <Box>
            <EditorComponent editable={true} />
            <Box
                sx={{
                    maxWidth: `${contentWidth}px`,
                    margin: '80px auto 50px',
                }}
            >
                <TextFieldComponent width={contentWidth} label='Search' />
            </Box>
            <Box>
                {tips.map((tip, index) => (
                    <EditorComponent
                        key={index}
                        editable={false}
                        initialEditorText={tip}
                    />
                ))}
            </Box>
        </Box>
    );
};
