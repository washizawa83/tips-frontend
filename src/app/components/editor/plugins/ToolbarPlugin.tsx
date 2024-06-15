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
import {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { IconType } from 'react-icons';
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
    RxTextAlignRight,
} from 'react-icons/rx';
import { CODE_LANGUAGE_COMMAND } from './CodeHighlightPlugin';

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

type FormatTextTools = {
    name: 'bold' | 'italic' | 'underline' | 'strikethrough';
    state: boolean;
    icon: ReactElement<IconType>;
};

type FormatAlignTools = {
    name: 'left' | 'right' | 'center' | 'justify';
    icon: ReactElement<IconType>;
};

type FormatHeadingTools = {
    name: 'h1' | 'h2' | 'h3';
    icon: ReactElement<IconType>;
};

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
            if (blockType === type) return;

            editor.update(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;

                $setBlocksType(
                    selection,
                    () => $createHeadingNode(type),
                );
            });
            setBlockType(type);
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

    const formatTextTools: FormatTextTools[] = [
        {
            name: 'bold',
            state: isBold,
            icon: <PiTextBBold />,
        },
        {
            name: 'italic',
            state: isItalic,
            icon: <PiTextItalicBold />,
        },
        {
            name: 'underline',
            state: isUnderline,
            icon: <PiTextUnderlineBold />,
        },
        {
            name: 'strikethrough',
            state: isStrikethrough,
            icon: <PiTextStrikethroughBold />,
        },
    ];

    const formatAlignTools: FormatAlignTools[] = [
        {
            name: 'left',
            icon: <RxTextAlignLeft />,
        },
        {
            name: 'center',
            icon: <RxTextAlignCenter />,
        },
        {
            name: 'right',
            icon: <RxTextAlignRight />,
        },
        {
            name: 'justify',
            icon: <RxTextAlignJustify />,
        },
    ];

    const formatHeadingTools: FormatHeadingTools[] = [
        {
            name: 'h1',
            icon: <PiTextHOneBold />,
        },
        {
            name: 'h2',
            icon: <PiTextHTwoBold />,
        },
        {
            name: 'h3',
            icon: <PiTextHThreeBold />,
        },
    ];

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
            {formatTextTools.map((textTool) => (
                <button
                    key={textTool.name}
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_TEXT_COMMAND,
                            textTool.name,
                        );
                    }}
                    className={'toolbar-item spaced '
                        + (textTool.state ? 'active' : '')}
                    aria-label={`Format ${textTool.name}`}
                >
                    {textTool.icon}
                </button>
            ))}
            <Divider />
            {formatAlignTools.map((alignTool) => (
                <button
                    key={alignTool.name}
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_ELEMENT_COMMAND,
                            alignTool.name,
                        );
                    }}
                    className='toolbar-item spaced'
                    aria-label={`${alignTool.name} Align`}
                >
                    {alignTool.icon}
                </button>
            ))}
            <Divider />
            {formatHeadingTools.map((headingTool) => (
                <button
                    key={headingTool.name}
                    role='checkbox'
                    onClick={() => formatHeading(headingTool.name)}
                    className={`toolbar-item spaced ${
                        blockType === headingTool.name ? 'active' : ''
                    }`}
                    aria-label='heading-1'
                    aria-checked={blockType === headingTool.name}
                >
                    {headingTool.icon}
                </button>
            ))}
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
