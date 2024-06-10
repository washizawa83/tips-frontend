import { Box } from '@mui/material';
import React from 'react';
import { Editor } from '../editor/editor';
import { loadData } from '../editor/loadData';
import { BaseTextField } from '../ui/base-text-field';

export const PostPage = () => {
    const tips = loadData();
    return (
        <Box>
            <Editor editable={true} />
            <Box sx={{ width: '800px', margin: '80px auto 50px' }}>
                <BaseTextField width={800} label='Search' />
            </Box>
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
