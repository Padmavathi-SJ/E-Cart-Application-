import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const SliderBanner = () => {
    const bannerImages = [img1, img2, img3];

    return (
        <div className="w-full max-w-screen-xl mx-auto mt-4">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                effect="fade"
                className="rounded-lg shadow-lg"
            >
                {bannerImages.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderBanner;
