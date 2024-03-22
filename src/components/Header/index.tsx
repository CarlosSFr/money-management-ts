import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoMoney from "../../assets/logo-money.png"


export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <div>
                    <img src={logoMoney} alt="" />
                    <span>Money Management</span>
                </div>
                

                <NewTransactionButton>Nova transação</NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}