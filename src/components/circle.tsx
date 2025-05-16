import styled from 'styled-components';

interface ContainerProps{
    bgColor: string;
    borderColor: string;
}
const Container = styled.div<ContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${props=>props.bgColor};
    border: 2px solid ${props=>props.borderColor};
`;

interface CircleProps{
    bgColor: string;
    borderColor?: string;
    text?: string;
}
function Circle({ bgColor, borderColor, text }:CircleProps){
    return(
        <Container bgColor={bgColor} 
            borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    )
}

export default Circle;