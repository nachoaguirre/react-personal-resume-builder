import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export const TextRotator = (props) => {
    const { animationClass, words, parentClass } = props;

    const timeoutRef = useRef();
    const textRotatorRef = useRef(null);

    const createTextRotator = (element, animationClass, words) => {
        let state = {
            words: words || [],
            count: 0,
            position: 0,
            running: false,
            actual: '',
            siguiente: '',
            animation: animationClass,
            element: element,
            timeout: null,
            speed: 5000
        };

        return state;
    }

    useEffect(() => {
        initTextRotator(createTextRotator(textRotatorRef.current, animationClass, words));
        // initTextRotator(createTextRotator(textRotatorRef.current, styles.textRotatorAnimation, translatedWords));
    });

    const initTextRotator = (textRotatorState) => {
        clearTimeOuts();

        textRotatorState.count = textRotatorState.words.length;
        textRotatorState.position = 0;
        textRotatorState.running = false;

        textRotatorState.actual = '';
        textRotatorState.siguiente = '';

        start(textRotatorState);
    }

    const start = (textRotatorState) => {
        if (textRotatorState.running !== true) {
            textRotatorState.running = true;

            textRotatorState.actual = textRotatorState.words[textRotatorState.position];
            textRotatorState.siguiente = textRotatorState.words[textRotatorState.position + 1];

            changeWord(textRotatorState, textRotatorState.words[textRotatorState.position]);

            textRotatorState.position++;

            timeoutRef.current = setTimeout(() => changeAnimation(textRotatorState), textRotatorState.speed);
        }
    };

    const changeAnimation = (textRotatorState) => {
        change(textRotatorState);
        clearTimeOuts(textRotatorState);
        timeoutRef.current = setTimeout(() => changeAnimation(textRotatorState), textRotatorState.speed);
    };

    const change = (textRotatorState) => {
        if (textRotatorState.position > textRotatorState.count-1) {
            textRotatorState.position = 0;
        }

        textRotatorState.actual = textRotatorState.words[textRotatorState.position];

        changeWord(textRotatorState, textRotatorState.words[textRotatorState.position]);
        textRotatorState.position++;
    };

    const changeWord = (textRotatorState, word) => {
        textRotatorState.element.innerHTML = `<span class="${textRotatorState.animation}" style="display:inline-block;">${word}</span>`;
        // textRotatorRef.current.innerHTML = `<span class="${textRotatorState.animation}" style="display:inline-block;">${word}</span>`;
    };

    const clearTimeOuts = () => clearTimeout(timeoutRef.current);

    return (
        <span ref={textRotatorRef} className={parentClass}></span>
    )
}

TextRotator.propTypes = {
    animationClass: PropTypes.string.isRequired,
    words: PropTypes.array.isRequired,
    parentClass: PropTypes.string.isRequired
}
