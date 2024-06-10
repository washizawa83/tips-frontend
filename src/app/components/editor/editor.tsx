import React from 'react';
import './editor.css';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { CodeHighlightPlugin } from './plugins/code-highlight';

import { createEditor } from 'lexical';
import { nodes } from './node';
import { FooterPlugin } from './plugins/footer';
import { ToolbarPlugin } from './plugins/toolbar';
import ExampleTheme from './theme';

function Placeholder() {
    return <div className='editor-placeholder'>Please Enter Text ...</div>;
}

type EditorProps = { editable: boolean; initialEditorText?: string };

export const Editor = ({ editable, initialEditorText }: EditorProps) => {
    const initialEditorConfig = {
        editable: editable,
        namespace: 'React.js Demo',
        nodes: nodes,
        onError(error: Error) {
            throw error;
        },
        theme: ExampleTheme,
    };

    const createEditorConfig = () => {
        if (!initialEditorText) {
            return initialEditorConfig;
        }
        const editor = createEditor(initialEditorConfig);
        const readOnlyEditorConfig = {
            ...initialEditorConfig,
            editorState: editor.parseEditorState(initialEditorText),
        };
        return readOnlyEditorConfig;
    };

    return (
        <LexicalComposer initialConfig={createEditorConfig()}>
            <div className='editor-container'>
                {editable && <ToolbarPlugin />}
                <div className={`editor-inner ${editable && 'editable'}`}>
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
                {editable && <FooterPlugin />}
            </div>
        </LexicalComposer>
    );
};
