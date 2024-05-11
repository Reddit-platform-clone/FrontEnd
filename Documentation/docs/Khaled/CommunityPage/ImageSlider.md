# Image Slider

```jsx
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
}

```
#### The ImageSlider component provides basic functionality to navigate through a slideshow of images (slides). It dynamically updates the active slide based on user interaction with "Previous" and "Next" navigation buttons. The styling of the "Next" button (nextButtonStyle) is adjusted based on the viewType prop to suit different layout requirements ("card" or otherwise). This component can be used flexibly by passing different sets of images (slides) and specifying the desired layout (viewType).