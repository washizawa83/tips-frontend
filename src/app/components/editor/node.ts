import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { Klass, LexicalNode } from 'lexical';

export const nodes: Klass<LexicalNode>[] = [
    HeadingNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
];
