import { ArrowCircleDown, ArrowCircleUp, Money } from "phosphor-react";
import { SummaryContainer } from "./styles";


export function Summary(){
    return(
        <SummaryContainer>
            <div>
                <header>
                    <span>
                        Entradas
                    </span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>

                <strong>R$ 17.400,00</strong>
            </div>
            <div>
                <header>
                    <span>
                        Saídas
                    </span>
                    <ArrowCircleDown size={32} color="#F75A68" />
                </header>

                <strong>R$ 1.259,00</strong>
            </div>
            <div>
                <header>
                    <span>
                        Total
                    </span>
                    <Money size={32} color="#fff" />
                </header>

                <strong>R$ 16.141,00</strong>
            </div>
        </SummaryContainer>
    )
}