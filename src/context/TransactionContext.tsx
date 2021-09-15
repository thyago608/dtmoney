import { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

//Tipagem do obj Transaction
type Transaction = {
    id: number;
    title: string;
    type: string;
    category: string;
    value: number;
    createdAt: string;
};

//Tipagem do obj que virá na requisição
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

//Tipagem do contexto
type TransactionContext = {
    transactions: Transaction[];
    createNewTransaction: (transaction:TransactionInput) => void;
};

//Tipagem do Provider
type TransactionProviderProps = {
    children: ReactNode;
};

export const TransactionContext = createContext<TransactionContext>({} as TransactionContext);

export function TransactionProvider({ children }:TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function createNewTransaction(transaction:TransactionInput){
        api.post('/transactions', transaction);
    }
    
    useEffect(()=>{
        const loadTransactions = async () => {
            const response = await api.get('/transactions');

            setTransactions(response.data.transactions);
        }

        loadTransactions();
    },[])
    
    return(
        <TransactionContext.Provider value={{ transactions, createNewTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}