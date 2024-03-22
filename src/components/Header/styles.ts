import styled from "styled-components";


export const HeaderContainer = styled.div`
    background: ${props => props.theme["gray-900"]};
    padding: 2.5rem 0 7.5rem;

`

export const HeaderContent = styled.div`
    width: 100%;
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        height: 48px;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font: 700 20px Roboto, sans-serif;
    }
`

export const NewTransactionButton = styled.button`
    background-color: ${props => props.theme["purple-500"]};
    padding: 0 1.25rem;
    height: 50px;
    border: none;
    border-radius: 6px;
    color: ${props => props.theme["white"]};
    font-weight: 700;
    font-size: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all;

    &:hover{
        background-color: ${props => props.theme["purple-700"]};
        cursor: pointer;
    }

`