import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div.attrs(props => ({
    className: props.customClass
}))`
    position: relative;
    padding-right: 12px;
`;

const Title = styled.h3`
    position: relative;
    font-size: 21px;
    z-index: 1;

    span {
        color: ${props => props.theme.primaryColor};
    }
`;

export const PageSubtitle = ({title, customClass = ''}) => {
    return (
        <Wrapper className={`pb-2 mb-3 d-inline-block page-subtitle-wrapper ${customClass}`}>
            <Title>
                {title}
            </Title>
        </Wrapper>
    )
}

PageSubtitle.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    customClass: PropTypes.string,
}