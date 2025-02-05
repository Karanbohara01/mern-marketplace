import { useEffect, useRef, useState } from "react";

const Carousel = ({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const totalSlides = images?.length;

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    setTranslateX(-currentIndex * 100);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    setTranslateX(
      -currentIndex * 100 + (deltaX / carouselRef.current.offsetWidth) * 100
    );
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy =
      translateX / -carouselRef.current.offsetWidth - currentIndex;

    if (movedBy < -0.2) {
      goToNextSlide();
    } else if (movedBy > 0.2) {
      goToPrevSlide();
    } else {
      setTranslateX(-currentIndex * 100);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(goToNextSlide, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, currentIndex]);

  const renderDots = () => (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
      {images?.map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-colors duration-300 ease-in-out ${
            index === currentIndex ? "bg-gray-800" : "bg-gray-300"
          }`}
          onClick={() => setCurrentIndex(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden w-full">
      <div
        ref={carouselRef}
        style={{ transform: `translateX(${translateX}%)` }}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onTouchMove={handleMove}
        onMouseMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        className={`flex transition-transform duration-300 ease-in-out cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        }`}
      >
        {images?.map((image, index) => (
          <div
            key={index}
            className="flex-none w-full p-4"
            style={{ minWidth: "100%" }}
          >
            <div className="relative rounded-lg shadow-md overflow-hidden">
              <img
                src={image.imageUrl}
                alt={image.altText}
                className="object-cover w-full h-64 md:h-80"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 text-white flex flex-col">
                <h3 className="text-lg font-semibold">{image.title}</h3>
                <p className="text-sm">{image.description}</p>
                {image.linkText && (
                  <div className="flex justify-end mt-2">
                    <span className="text-blue-400 flex items-center gap-1">
                      {image.linkText}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 bg-black/50 text-white border-none p-2 z-10 left-2 rounded-full"
            onClick={goToPrevSlide}
            aria-label="Previous Slide"
          >
            &#8249;
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 bg-black/50 text-white border-none p-2 z-10 right-2 rounded-full"
            onClick={goToNextSlide}
            aria-label="Next Slide"
          >
            &#8250;
          </button>
        </>
      )}
      {renderDots()}
    </div>
  );
};

export default Carousel;
