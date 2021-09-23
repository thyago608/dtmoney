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
    updateTransaction: (transaction: Transaction) => Promise<void>;
    deleteTransaction: (id:string)=> Promise<void>;
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


    async function updateTransaction(transactionInput: Transaction){
        const response = await api.put('/transactions', transactionInput);

        const { transaction } = response.data;

        let transactionsCopy = transactions;

        const transactionIndex = transactionsCopy.findIndex(transaction => transaction.id === transactionInput.id);

        transactionsCopy.splice(transactionIndex, 1);

        transactionsCopy.push(transaction);

        setTransactions([...transactionsCopy]);
    }   


    async function deleteTransaction(id:string){
        await api.delete('/transactions',{params:id});

        const copyTransactions = transactions;

        const transactionIndex = copyTransactions.findIndex(transaction => transaction.id === Number(id));

        copyTransactions.splice(transactionIndex, 1);

        setTransactions([...copyTransactions]);
    }

    useEffect(()=>{
        const loadTransactions = async () => {
            const response = await api.get('/transactions');

            setTransactions(response.data.transactions);
        }

        loadTransactions();
    },[]);


    return(
        <TransactionContext.Provider value={{ 
                transactions, 
                createNewTransaction,
                updateTransaction,
                deleteTransaction
            }}>
            {children}
        </TransactionContext.Provider>
    );
}