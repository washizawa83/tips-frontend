import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Editor } from '../editor/Editor';
import { loadData } from '../editor/loadData';
import { TipsTextField } from '../ui/TipsTextField';
import { BasePage } from './BasePage';

export const PostPageComponent = () => {
    const [tips, setTips] = useState(loadData());

    const postData = (newData: string) => {
        console.log([newData, ...tips]);
        setTips([...tips, newData]);
    };
    return (
        <BasePage>
            <Editor editable={true} postData={postData} />
            <Box sx={{ margin: '80px 0 60px' }}>
                <TipsTextField label='Search' />
            </Box>
            <Box>
                {tips.map((tip, index) => (
                    <Editor
                        key={index}
                        editable={false}
                        initialEditorText={tip}
                        postData={postData}
                    />
                ))}
            </Box>
        </BasePage>
    );
};
