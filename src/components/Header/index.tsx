import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoMoney from "../../assets/logo-money.png"
import * as Dialog from "@radix-ui/react-dialog"
import { NewTransactionModal } from "../NewTransactionModal";


export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <div>
                    <img src={logoMoney} alt="" />
                    <span>Money Management</span>
                </div>
                
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal />
                </Dialog.Root>
        
            </HeaderContent>
        </HeaderContainer>
    )
}