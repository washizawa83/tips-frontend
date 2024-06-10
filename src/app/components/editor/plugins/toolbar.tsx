import {
    $createCodeNode,
    $isCodeNode,
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
} from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $createHeadingNode,
    $isHeadingNode,
    HeadingTagType,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { LiaRedoAltSolid, LiaUndoAltSolid } from 'react-icons/lia';
import {
    PiTextBBold,
    PiTextHOneBold,
    PiTextHThreeBold,
    PiTextHTwoBold,
    PiTextItalicBold,
    PiTextStrikethroughBold,
    PiTextUnderlineBold,
} from 'react-icons/pi';
import { RiCodeBlock, RiCodeFill } from 'react-icons/ri';
import {
    RxTextAlignCenter,
    RxTextAlignJustify,
    RxTextAlignLeft,
} from 'react-icons/rx';
import { CODE_LANGUAGE_COMMAND } from './code-highlight';

const LowPriority = 1;

function Divider() {
    return <div className='divider' />;
}

const SupportedBlockType = {
    paragraph: 'Paragraph',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    code: 'Code Block',
    textCode: 'Text Code',
} as const;
type BlockType = keyof typeof SupportedBlockType;
const CodeLanguagesOptions = Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
).map(([value, label]) => ({ value, label }));

export const ToolbarPlugin: FC = () => {
    const [blockType, setBlockType] = useState<BlockType>('paragraph');
    const [codeLanguage, setCodeLanguage] = useState('');

    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsCode(selection.hasFormat('code'));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, _newEditor) => {
                    $updateToolbar();
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority,
            ),
        );
    }, [editor, $updateToolbar]);

    const formatHeading = useCallback(
        (type: HeadingTagType) => {
            if (blockType !== type) {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        $setBlocksType(
                            selection,
                            () => $createHeadingNode(type),
                        );
                    }
                });
                setBlockType(type);
            }
        },
        [blockType, editor],
    );

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;

                const anchorNode = selection.anchor.getNode();
                const targetNode = anchorNode.getKey() === 'root'
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();

                if ($isHeadingNode(targetNode)) {
                    const tag = targetNode.getTag();
                    setBlockType(tag);
                } else {
                    if ($isCodeNode(targetNode)) {
                        setCodeLanguage(targetNode.getLanguage() || '');
                    }
                    const nodeType = targetNode.getType();
                    if (nodeType in SupportedBlockType) {
                        setBlockType(nodeType as BlockType);
                    } else {
                        setBlockType('paragraph');
                    }
                }
            });
        });
    }, [editor]);

    const formatCode = useCallback(() => {
        if (blockType !== 'code') {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createCodeNode());
                }
            });
        }
    }, [blockType, editor]);

    return (
        <div className='toolbar' ref={toolbarRef}>
            <button
                disabled={!canUndo}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                className='toolbar-item spaced'
                aria-label='Undo'
            >
                <LiaUndoAltSolid />
            </button>
            <button
                disabled={!canRedo}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                className='toolbar-item'
                aria-label='Redo'
            >
                <LiaRedoAltSolid />
            </button>
            <Divider />
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
                aria-label='Format Bold'
            >
                <PiTextBBold />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                }}
                className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
                aria-label='Format Italics'
            >
                <PiTextItalicBold />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                }}
                className={'toolbar-item spaced '
                    + (isUnderline ? 'active' : '')}
                aria-label='Format Underline'
            >
                <PiTextUnderlineBold />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_TEXT_COMMAND,
                        'strikethrough',
                    );
                }}
                className={'toolbar-item spaced '
                    + (isStrikethrough ? 'active' : '')}
                aria-label='Format Strikethrough'
            >
                <PiTextStrikethroughBold />
            </button>
            <Divider />
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                }}
                className='toolbar-item spaced'
                aria-label='Left Align'
            >
                <RxTextAlignLeft />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                }}
                className='toolbar-item spaced'
                aria-label='Center Align'
            >
                <RxTextAlignCenter />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                }}
                className='toolbar-item spaced'
                aria-label='Right Align'
            >
                <RxTextAlignLeft />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                }}
                className='toolbar-item'
                aria-label='Justify Align'
            >
                <RxTextAlignJustify />
            </button>{' '}
            <Divider />
            <button
                role='checkbox'
                onClick={() => formatHeading('h1')}
                className={`toolbar-item spaced ${
                    blockType === 'h1' ? 'active' : ''
                }`}
                aria-label='heading-1'
                aria-checked={blockType === 'h1'}
            >
                <PiTextHOneBold />
            </button>
            <button
                role='checkbox'
                onClick={() => formatHeading('h2')}
                className={`toolbar-item spaced ${
                    blockType === 'h2' ? 'active' : ''
                }`}
                aria-label='heading-2'
                aria-checked={blockType === 'h2'}
            >
                <PiTextHTwoBold />
            </button>
            <button
                role='checkbox'
                onClick={() => formatHeading('h3')}
                className={`toolbar-item spaced ${
                    blockType === 'h3' ? 'active' : ''
                }`}
                aria-label='heading-3'
                aria-checked={blockType === 'h3'}
            >
                <PiTextHThreeBold />
            </button>
            <Divider />
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                }}
                className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
                aria-label='Format Code'
            >
                <RiCodeFill />
            </button>
            <button
                role='checkbox'
                onClick={formatCode}
                className={`toolbar-item spaced ${
                    blockType === 'code' ? 'active' : ''
                }`}
                aria-label={SupportedBlockType['code']}
                aria-checked={blockType === 'code'}
            >
                <RiCodeBlock />
            </button>
            {blockType === 'code' && (
                <div>
                    <select
                        aria-label='code languages'
                        className='bg-[#323b60]'
                        value={codeLanguage}
                        onChange={(event) =>
                            editor.dispatchCommand(
                                CODE_LANGUAGE_COMMAND,
                                event.target.value,
                            )}
                    >
                        <option value=''>select...</option>
                        {CodeLanguagesOptions.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};
