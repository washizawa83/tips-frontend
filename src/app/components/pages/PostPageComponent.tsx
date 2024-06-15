import { Box } from '@mui/material';
import React, { useState } from 'react';
import { EditorComponent } from '../editor/EditorComponent';
import { loadData } from '../editor/loadData';
import { TextFieldComponent } from '../ui/TextFieldComponent';
import { BasePageComponent } from './BasePageComponent';

export const PostPageComponent = () => {
    const [tips, setTips] = useState(loadData());

    const postData = (newData: string) => {
        console.log([newData, ...tips]);
        setTips([...tips, newData]);
    };
    return (
        <BasePageComponent>
            <EditorComponent editable={true} postData={postData} />
            <Box sx={{ margin: '80px 0 60px' }}>
                <TextFieldComponent label='Search' />
            </Box>
            <Box>
                {tips.map((tip, index) => (
                    <EditorComponent
                        key={index}
                        editable={false}
                        initialEditorText={tip}
                        postData={postData}
                    />
                ))}
            </Box>
        </BasePageComponent>
    );
};
