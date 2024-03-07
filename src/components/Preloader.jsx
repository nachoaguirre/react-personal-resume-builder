import styled, {keyframes} from 'styled-components';
import styles from '../styles/globals.module.scss';

const preloaderRotate = keyframes`
    0% { transform: rotate(0deg) scale(0.8); }
    50% { transform: rotate(360deg) scale(1.2); }
    100% { transform: rotate(720deg) scale(0.8); }
`;

const preloaderBall1 = keyframes`
    0% { box-shadow: 30px 0 0 ${styles.bodyDark10}; }
    50% {
        box-shadow: 0 0 0 ${styles.bodyDark10};
        margin-bottom: 0;
        transform: translate(15px,15px);
    }
    100% {
        box-shadow: 30px 0 0 ${styles.bodyDark10};
        margin-bottom: 10px;
    }
`;

const preloaderBall2 = keyframes`
    0% { box-shadow: 30px 0 0 ${styles.bodyDark90}; }
    50% {
        box-shadow: 0 0 0 ${styles.bodyDark90};
        margin-top: -20px;
        transform: translate(15px,15px);
    }
    100% {
        box-shadow: 30px 0 0 ${styles.bodyDark90};
        margin-top: 0;
    }
`;

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    color: ${styles.sectionBackgroundColor};
`;

const InnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    background-color: inherit;
    color: inherit;
    opacity: 1;
    transition: opacity .3s;
    transform: translate3d(-50%,-50%,0);
`;

const Loader = styled.div`
    animation: ${preloaderRotate} 3s infinite;
    height: 50px;
    width: 50px;

    &:before, &:after {
        border-radius: 50%;
        content: '';
        display: block;
        height: 20px;
        width: 20px;
    }

    &:before {
        animation: ${preloaderBall1} 3s infinite;
        background-color: ${styles.bodyLight10};
        box-shadow: 30px 0 0 ${styles.bodyDark10};
        margin-bottom: 10px;
    }

    &:after {
        animation: ${preloaderBall2} 3s infinite;
        background-color: ${styles.bodyDark50};
        box-shadow: 30px 0 0 ${styles.bodyDark90};
    }
`;

export const Preloader = () => {
    return (
        <Wrapper>
            <InnerWrapper>
                <Loader></Loader>
            </InnerWrapper>
        </Wrapper>
    );
}
