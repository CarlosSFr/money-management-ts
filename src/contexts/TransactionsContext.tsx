import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number,
    description: string,
    type: "income" | "outcome",
    price: number,
    category: string,
    createdAt: string,
}

interface CreateTransactionInput {
    description: string,
    price: number,
    category: string,
    type: "income" | "outcome",
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?:string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput ) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}



export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string){
        // const url = new URL("http://localhost:3000/transactions")

        // if(query){
        //     url.searchParams.append("q", query); // Código sem utilizar o AXIOS, que é uma biblioteca para facilitar as requisições HTTP
        // }

        // const response = await fetch(url)
        // const data = await response.json();

        const response = await api.get("transactions", { // Fazendo a atualização das transactions e setando o tipo de pesquisa com o AXIOS
            params: {
                _sort: "createdAt", //está organizando a tabela com os mais recentes em cima
                _order: "desc",
                q: query,
            }
        })
    
        setTransactions(response.data);
    }

    async function createTransaction(data: CreateTransactionInput){
        const { description, category, price, type } = data;

        const response = await api.post("transactions", {
            description,
            category,
            price,
            type,
            createdAt: new Date(),
        })
        setTransactions(state => [response.data, ...state])

    }
    
    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }} >
            {children}
        </TransactionsContext.Provider>
    )
}