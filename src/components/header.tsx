import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { FaMobileScreen } from 'react-icons/fa6';

const Container = styled.div`
    padding: 4px 12px;
    margin: 0 auto;
`;
const MenuBar = styled.ul`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    height: 36px;
    width: 480px;
    gap: 4px;
    padding: 4px;
    font-size: 14px;
`;
const Menu = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15%;
    color: ${props => props.theme.textColor};
    a {
        padding: 8px;
    }
    a:hover{
        color: ${props => props.theme.accentColor};
        font-weight: bold;
    }
`;


function Header(){
    return(
        <Container>
            <MenuBar>
                <Menu>
                    <Link to={"/"}>
                        <FaHome size="24"/>
                    </Link>
                </Menu>
                <Menu>
                    <Link to={"/about"}>
                        <FaMobileScreen size="24" color="black"/>
                    </Link>
                </Menu>
            </MenuBar>
        </Container>
    )
}

export default Header;