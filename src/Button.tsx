export type ButtonType = {
    title: string
    onClick: () => void
    disabled?: boolean
    className?: string
}

export const Button = ({title, onClick, disabled, className}: ButtonType) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}
        > {title}</button>
    );
};

