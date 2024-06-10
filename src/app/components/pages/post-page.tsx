import { Box } from '@mui/material';
import React from 'react';
import { Editor } from '../editor/editor';
import { loadData } from '../editor/loadData';

export const PostPage = () => {
    const tips = loadData();
    return (
        <Box>
            <Editor editable={true} />
            <Box>
                {tips.map((tip, index) => (
                    <Editor
                        key={index}
                        editable={false}
                        initialEditorText={tip}
                    />
                ))}
            </Box>
        </Box>
    );
};
