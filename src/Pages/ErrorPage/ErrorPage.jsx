import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import styles from '../../styles/globals.module.scss';

const Wrapper = styled.div`
    position: relative;
    height: 100vh;
`;

const ErrorPageContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 767px;
    width: 100%;
    line-height: 1.4;
    padding: 110px 40px;
    text-align: center;

    .btn-primary {
        color: ${styles.sectionBackgroundColor};
        border-color: ${styles.primaryColor};
    }
`;

const ErrorCode = styled.div`
    position: relative;
    height: 180px;
`;

const CodeNumber = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 165px;
    font-weight: 700;
    margin: 0;
    color: ${styles.sectionBackgroundColor};
    text-transform: uppercase;

    span {
        color: ${styles.primaryColor};
    }
`;

const Description = styled.div`
    font-size: 18px;
    font-weight: 400;
    text-transform: uppercase;
    color: ${styles.sectionBackgroundColor};
    margin-top: 0;
    margin-bottom: 25px;
`;

export const ErrorPage = () => {
    const { i18n } = useTranslation();

    const error = useRouteError();

    const statusCode = error.status || 404;
    const statusCodeString = statusCode.toString();
    const statusCodeElements = statusCodeString.split('').map((digit, index, array) => {
        return array.length >= 3 && index === 1 ? <span key={index}>{digit}</span> : digit;
    });

    const errorMessages = {
        404: i18n.t('errorPage.pageNotFound'),
        500: i18n.t('errorPage.internalError'),
        default: i18n.t('errorPage.defaultError')
    };

    const description = errorMessages[statusCode] || errorMessages.default;

    useEffect(() => {
        document.title = `Error ${statusCode} - ${description}`;
    });

    return (
        <Wrapper>
            <ErrorPageContent>
                <ErrorCode>
                    <CodeNumber>{ statusCodeElements }</CodeNumber>
                </ErrorCode>

                <Description>{ description }</Description>

                <a href="/" className='btn btn-primary'>{i18n.t('errorPage.backToHome')}</a>
            </ErrorPageContent>
        </Wrapper>
    )
}
