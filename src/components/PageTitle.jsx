import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    padding-right: 25px;
    padding-bottom: 15px;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    position: relative;
    font-size: 32px;
    z-index: 1;

    span {
        color: ${props => props.theme.primaryColor};
    }
`;

export const PageTitle = ({title}) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
        </Wrapper>
    )
}

PageTitle.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired
}