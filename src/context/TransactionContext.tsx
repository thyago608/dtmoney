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
type TransactionContextData = {
    transactions: Transaction[];
    createNewTransaction: (transaction:TransactionInput) => Promise<void>;
};

//Tipagem do Provider
type TransactionProviderProps = {
    children: ReactNode;
};

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children }:TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

   async function createNewTransaction(transactionInput:TransactionInput){
        const response = await api.post('/transactions', transactionInput);
        const { transaction } = response.data;

        setTransactions([...transactions, transaction ]);
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