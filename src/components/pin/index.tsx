import React, { useState } from 'react';
import { useEffect } from 'react';

import './index.css';

export type PinProps = {
    x: number;
    y: number;
    imageWidth: number;
    imageHeight: number;
    setBlockClick?: (blockClick: boolean) => void;
    key: number;
};

const Pin: React.FC<PinProps> = ({ x, y, imageWidth, imageHeight, setBlockClick }) => {
    const [imageSizes, setImageSizes] = useState({
        imageWidth: imageWidth,
        imageHeight: imageHeight,
    });
    const [label, setLabel] = useState<string>();
    const [isBlur, setIsBlur] = useState(true);

    useEffect(() => {
        setImageSizes({ imageWidth, imageHeight });
    }, []);

    useEffect(() => {
        isBlur && setBlockClick?.(true);
    }, [isBlur]);

    const left = `${(x / imageSizes.imageWidth) * imageWidth}px`;
    const top = `${(y / imageSizes.imageHeight) * imageHeight}px`;

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsBlur(false);
        setLabel(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
            setBlockClick?.(false);
        }
    };

    return (
        <div style={{ left, top }} className="pin">
            {label}
            {isBlur && <input autoFocus onBlur={blurHandler} onKeyDown={handleKeyDown} className="pin-input" />}
        </div>
    );
};

export default Pin;
