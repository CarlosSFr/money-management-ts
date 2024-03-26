import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

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

    const fetchTransactions = useCallback(async (query?: string) => { // useCallback evita que uma funçao seja recriada em memória desnecessariamente.
        const response = await api.get("transactions", { // Fazendo a atualização das transactions e setando o tipo de pesquisa com o AXIOS
            params: {
                _sort: "createdAt", //está organizando a tabela com os mais recentes em cima
                _order: "desc",
                q: query,
            }
        })
    
        setTransactions(response.data);
    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { description, category, price, type } = data;

        const response = await api.post("transactions", {
            description,
            category,
            price,
            type,
            createdAt: new Date(),
        })
        setTransactions(state => [response.data, ...state])

    }, [])
    
    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }} >
            {children}
        </TransactionsContext.Provider>
    )
}