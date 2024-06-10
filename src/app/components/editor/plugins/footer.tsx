import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Height } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { FC } from 'react';
import { BaseTextField } from '../../ui/base-text-field';

function downloadJSON(data: string, filename = 'data.json') {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export const FooterPlugin: FC = () => {
    const [editor] = useLexicalComposerContext();

    const postTips = () => {
        const editorState = editor.getEditorState();
        console.log(editorState);
        const editorJson = editorState.toJSON();
        console.log(editorJson);
        const parseEditorState = editor.parseEditorState(editorJson);
        console.log(parseEditorState);

        const jsonString = JSON.stringify(editorState.toJSON());
        downloadJSON(jsonString);
    };

    return (
        <Box
            className={'bg-[#242841] p-2 flex justify-between items-center'}
            sx={{
                borderRadius: '0 0 10px 10px',
                position: 'relative',
                padding: '20px',
            }}
        >
            <BaseTextField width={300} label='Tags' />
            <IconButton aria-label='delete' onClick={() => postTips()}>
                <SendIcon sx={{ fontSize: 20, color: '#c3b0fa' }} />
            </IconButton>
        </Box>
    );
};
