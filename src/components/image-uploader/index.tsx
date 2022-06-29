import React, { useCallback, useState, useEffect, useRef } from 'react';

import Pin, { PinProps } from '../pin';

import './index.css';

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState<File>();
    const [blockClick, setBlockClick] = useState(true);
    const [pins, setPins] = useState<PinProps[]>([]);
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

    const ref = useRef<HTMLDivElement>(null);

    const resizeHandler = useCallback(() => {
        const imgRect = ref?.current?.getBoundingClientRect();

        if (!imgRect) return;
        const newPins = pins?.map(el => ({
            ...el,
            imageWidth: imgRect.width,
            imageHeight: imgRect.height,
        }));

        setPins(newPins);
    }, [pins, ref]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const img = new Image();
            let objUrl = URL.createObjectURL(file);
            img.onload = function() {
                setImgSize({
                    width: ref.current?.clientWidth || 0,
                    height: ref.current?.clientHeight || 0,
                });
                setBlockClick(false);
                setPins([]);
            };
            img.src = objUrl;

            setSelectedImage(file);
        }
    };

    const onClickHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (blockClick) {
            setBlockClick(false);
            return;
        }

        var rect = (e.target as HTMLImageElement).getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top - 20;

        setPins([
            ...pins,
            {
                x,
                y: y > 0 ? y : 0,
                imageWidth: ref?.current?.clientWidth || 0,
                imageHeight: ref?.current?.clientHeight || 0,
                key: Date.now(),
                setBlockClick,
            },
        ]);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [imgSize, pins.length]);

    return (
        <>
            <input type="file" onChange={onChangeHandler} />
            <div className="container">
                {selectedImage && (
                    <div className="img-wrapper" ref={ref}>
                        <img src={URL.createObjectURL(selectedImage)} onClick={onClickHandler} id="image" />
                        {pins?.map(el => (
                            <Pin
                                x={el.x}
                                y={el.y}
                                imageWidth={el.imageWidth}
                                imageHeight={el.imageHeight}
                                key={el.key}
                                setBlockClick={setBlockClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default UploadAndDisplayImage;
