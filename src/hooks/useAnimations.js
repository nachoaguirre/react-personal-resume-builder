import { useCallback } from "react";

export const useAnimations = () => {
    const createCirclesStyle = useCallback((element, itemsCount) => {
        if(!element) return;

        const elementChildrens = element.children.length;

        if(itemsCount <= elementChildrens) return;

        for(let i = 0; i < itemsCount; i++) {
            const li = document.createElement('li');
            element.appendChild(li);
        }

        const avaliableLefts = [10, 20, 25, 35, 40, 50, 65, 70, 75, 85];
        const avaliableSizes = [15, 20, 25, 60, 80, 110, 150];
        const avaliableAnimationDelays = [0, 2, 3, 4, 7, 15];
        const avaliableAnimationDurations = [12, 18, 45, 35, 11];

        const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];

        for(let i = 0; i < element.children.length; i++) {
            const circle = element.children[i];

            const randomLeft = getRandomValue(avaliableLefts);
            const randomSize = getRandomValue(avaliableSizes);
            const randomAnimationDelay = getRandomValue(avaliableAnimationDelays);
            const randomAnimationDuration = getRandomValue(avaliableAnimationDurations);

            circle.style.width = `${randomSize}px`;
            circle.style.height = `${randomSize}px`;
            circle.style.left = `${randomLeft}%`;
            circle.style.animationDelay = `${randomAnimationDelay}s`;
            circle.style.animationDuration = `${randomAnimationDuration}s`;
        }
    }, []);

    return {
        createCirclesStyle,
    };
};
