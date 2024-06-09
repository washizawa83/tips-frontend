import React from 'react';
import './editor.css';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { CodeHighlightPlugin } from './plugins/code-highlight';

import { nodes } from './node';
import { ToolbarPlugin } from './plugins/toolbar';
import ExampleTheme from './theme';

function Placeholder() {
    return <div className='editor-placeholder'>Please Enter Text ...</div>;
}

const editorConfig = {
    editable: true,
    namespace: 'React.js Demo',
    nodes: nodes,
    onError(error: Error) {
        throw error;
    },
    theme: ExampleTheme,
};

export const Editor = () => {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className='editor-container'>
                <ToolbarPlugin />
                <div className='editor-inner'>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className='editor-input' />
                        }
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
};
