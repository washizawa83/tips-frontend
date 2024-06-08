import React from 'react';
export type AnchorLinkProps = {
    text: string;
    link: string;
    icon?: JSX.Element;
};

export const AnchorLink = (props: AnchorLinkProps) => {
    return (
        <>
            <a
                className='text-tips-gray-text text-base font-medium'
                href={props.link}
            >
                {props.icon}
                {props.text}
            </a>
        </>
    );
};
