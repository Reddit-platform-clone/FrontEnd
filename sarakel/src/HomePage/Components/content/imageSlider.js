import { useState } from "react";
import styles from "./imageSlider.module.css";

const ImageSlider = ({ slides, viewType }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(newIndex);
    };

    const nextButtonStyle = viewType === "card" ? { right: "-15px" } : { right: "85px" };

    return (
        <div className={styles["image-slider"]}>
            {currentIndex !== 0 && ( // Render previous button if currentIndex is not 0
                <button className={styles["prev-button"]} onClick={goToPrevious}>
                    ❮
                </button>
            )}
            <img
                src={slides[currentIndex]}
                alt={`Image ${currentIndex}`}
                className={styles["post-image"]}
            />
            {currentIndex !== slides.length - 1 && ( // Render next button if currentIndex is not the last index
                <button className={styles["next-button"]} style={nextButtonStyle} onClick={goToNext}>
                    ❯
                </button>
            )}
        </div>
    );
};

export default ImageSlider;
