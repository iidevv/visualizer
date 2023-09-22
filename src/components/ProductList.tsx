import React, { useEffect, useState, Dispatch, SetStateAction, useRef, useCallback } from 'react';
import type { SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductListProps {
    setPatternUrl: Dispatch<SetStateAction<string>>;
}

const ProductList: React.FC<ProductListProps> = ({ setPatternUrl }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [color, setColor] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const [texture, setTexture] = useState<string>("");

    const sliderRef = useRef<SwiperRef>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current?.swiper) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current?.swiper) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        fetch(`https://dev.admflooring.com/wp-json/custom/v1/products?color=${color}&grade=${grade}&texture=${texture}`, {
            signal: controller.signal,
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Fetch failed:", error);
                }
            });
        return () => {
            controller.abort();
        }
    }, [color, grade, texture]);

    return (
        <div>
            <div className="visualizer-filters">
                <div className="visualizer-filter">
                    <select onChange={e => {
                        setColor(e.target.value);
                    }} id="color">
                        <option value="">Color</option>
                        <option value="dark">Dark</option>
                        <option value="grey">Grey</option>
                        <option value="light">Light</option>
                        <option value="natural">Natural</option>
                    </select>
                </div>
                <div className="visualizer-filter">
                    <select onChange={e => {
                        setGrade(e.target.value);
                    }} id="grade">
                        <option value="">Grade</option>
                        <option value="abcd-character">ABCD (Character)</option>
                        <option value="prime-ab">Prime AB</option>
                        <option value="rustic">Rustic</option>
                        <option value="abcd">ABCD</option>
                        <option value="abcd-light-character">ABCD (Light Character)</option>
                        <option value="rustic-select">Rustic Select</option>
                        <option value="select-abc">Select ABC</option>
                    </select>
                </div>
                <div className="visualizer-filter">
                    <select onChange={e => {
                        setTexture(e.target.value);
                    }} id="texture">
                        <option value="">Texture</option>
                        <option value="medium-wire-brushed">Medium Wire Brushed</option>
                        <option value="smooth">Smooth</option>
                        <option value="unfinished">Unfinished</option>
                    </select>
                </div>
            </div>
            <div className="visualizer-slider">
                <Swiper
                    ref={sliderRef}
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={3}
                    breakpoints={{
                        374: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 10,
                        },
                        550: {
                            slidesPerView: 8,
                            slidesPerGroup: 8,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {products.map((product, i) => (
                        <SwiperSlide key={i}>
                            <button className="visualizer-floor" onClick={() => { setPatternUrl(product.image_url) }}>
                                <img className="visualizer-floor__image" src={product.image_url} alt={product.title} />
                                <span>{product.title}</span>
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-prev visualizer-slider-prev" onClick={handlePrev} />
                <div className="swiper-button-next visualizer-slider-next" onClick={handleNext} />
            </div>
        </div>
    );
};

export default ProductList;
