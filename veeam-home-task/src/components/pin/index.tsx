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
        imageWidth: 0,
        imageHeight: 0,
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

    return (
        <div style={{ left, top }} className="pin">
            {label}
            {isBlur && <input autoFocus onBlur={blurHandler} />}
        </div>
    );
};

export default Pin;
