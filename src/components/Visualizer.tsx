import roomImage from "./../assets/room.png";
import { CSSProperties, useEffect, useState } from "react";
import type { SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import VisualizerItem from "./VisualizerItem";
import AddNew from "./AddNew";

import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface VisualizerProps {
  patternUrl: string;
}

interface Background {
  id: number;
  title: string;
  image_url: string;
  css_styles: string;
}

const Visualizer: React.FC<VisualizerProps> = ({ patternUrl }) => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const isAdmin = (window as any).wpData && (window as any).wpData.isAdmin === 'true';
  useEffect(() => {
    fetch(`https://dev.admflooring.com/wp-json/custom/v1/backgrounds/`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setBackgrounds(data);
      });
  }, []);

  return (
    <div className="visualizer-slider-main">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect={"fade"}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}

      >
        {backgrounds.map((background, i) => (
          <SwiperSlide key={i}>
            <VisualizerItem id={background.id} title={background.title} backgroundUrl={background.image_url} css_styles={background.css_styles} patternUrl={patternUrl} setBackgrounds={setBackgrounds} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isAdmin && <AddNew setBackgrounds={setBackgrounds} />}
    </div>
  );
};

export default Visualizer;
