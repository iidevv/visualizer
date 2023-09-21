import roomImage from "./../assets/room.png";
import { CSSProperties, useEffect, useState } from "react";
import type { SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Controls from "./Controls";

interface VisualizerItemProps {
    backgroundUrl: string;
    patternUrl: string;
    id: number;
    title: string;
    css_styles: string;
    setBackgrounds: React.Dispatch<React.SetStateAction<any>>;
}

const VisualizerItem: React.FC<VisualizerItemProps> = ({ id, title, css_styles, backgroundUrl, patternUrl, setBackgrounds }) => {

    const isAdmin = (window as any).wpData && (window as any).wpData.isAdmin === 'true';


    const initStyles = css_styles ? JSON.parse(css_styles) : {};

    const [patternSize, setPatternSize] = useState(initStyles.patternSize || 20);
    const [width, setWidth] = useState(initStyles.width || 50);
    const [height, setHeight] = useState(initStyles.height || 50);
    const [positionX, setPositionX] = useState(initStyles.positionX || 50);
    const [positionY, setPositionY] = useState(initStyles.positionY || 50);
    const [rotateX, setRotateX] = useState(initStyles.rotateX || 50);
    const [rotateZ, setRotateZ] = useState(initStyles.rotateZ || 0);
    const [perspective, setPerspective] = useState(initStyles.perspective || 600);
    const [zIndex, setZIndex] = useState(initStyles.zIndex || 2);

    useEffect(() => {
        const updatedStyles = css_styles ? JSON.parse(css_styles) : {};
        setPatternSize(updatedStyles.patternSize || 20);
        setWidth(updatedStyles.width || 50);
        setHeight(updatedStyles.height || 50);
        setPositionX(updatedStyles.positionX || 50);
        setPositionY(updatedStyles.positionY || 50);
        setRotateX(updatedStyles.rotateX || 50);
        setRotateZ(updatedStyles.rotateZ || 0);
        setPerspective(updatedStyles.perspective || 600);
        setZIndex(updatedStyles.zIndex || 2);
    }, [css_styles]);

    const style: CSSProperties = {
        position: "absolute",
        top: `${positionY}%`,
        left: `${positionX}%`,
        transform: `translate(-50%, -50%) perspective(${perspective}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
        backgroundSize: patternSize == 0 ? "cover" : `${patternSize}px`,
        backgroundImage: `url(${patternUrl})`,
        backgroundPosition: "center",
        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.5)",
        width: `${width}%`,
        height: `${height}%`,
        zIndex: zIndex,
    };

    return (
        <div className="visualizer">
            {isAdmin && <Controls
                id={id} title={title} css_styles={css_styles} backgroundUrl={backgroundUrl}
                patternSize={patternSize} setPatternSize={setPatternSize}
                width={width} setWidth={setWidth}
                height={height} setHeight={setHeight}
                positionX={positionX} setPositionX={setPositionX}
                positionY={positionY} setPositionY={setPositionY}
                rotateX={rotateX} setRotateX={setRotateX}
                rotateZ={rotateZ} setRotateZ={setRotateZ}
                perspective={perspective} setPerspective={setPerspective}
                zIndex={zIndex} setZIndex={setZIndex}
                setBackgrounds={setBackgrounds}
            />}
            <div className="visualizer-main">
                <div className="visualizer-room">
                    <img className="visualizer-room__image" src={backgroundUrl} alt="room" />
                </div>
                <div className="visualizer-pattern" style={style}></div>
            </div>
        </div>
    );
};

export default VisualizerItem;
