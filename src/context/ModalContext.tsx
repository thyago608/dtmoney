import { useState, createContext, ReactNode } from 'react';

type Transaction = {
    id: number;
    title: string;
    type: string;
    category: string;
    value: number;
    createdAt: string;
};

type ModalContextProps = {
    isNewTransactionModalOpen: boolean;
    isUpdateTransactionModalOPen:boolean;
    transactionCurrent: Transaction;
    handleOpenNewTransactionModal:() => void;
    handleCloseNewTransactionModal:() => void;
    handleOpenUpdateTransactionModal: (transaction:Transaction) => void;
    handleCloseUpdateTransactionModal: ()=> void;
};

type ModalContextProviderProps = {
    children: ReactNode;
};


export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);


export function ModalProvider({children}:ModalContextProviderProps){
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [isUpdateTransactionModalOPen, setIsUpdateTransactionModal] = useState(false);
    const [transactionCurrent, setTransactionCurrent] = useState<Transaction>({} as Transaction);

    //Modal de Criação
    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false);
    }

    //Modal de Atualização

    function handleOpenUpdateTransactionModal(transaction:Transaction){ 
        setIsUpdateTransactionModal(true);
        setTransactionCurrent(transaction);
    }

    function handleCloseUpdateTransactionModal(){
        setIsUpdateTransactionModal(false);
        setTransactionCurrent({} as Transaction);
    }



    return(
        <ModalContext.Provider value={{
            isNewTransactionModalOpen,
            isUpdateTransactionModalOPen,
            transactionCurrent,
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal,
            handleOpenUpdateTransactionModal,
            handleCloseUpdateTransactionModal
        }}>
            {children}
        </ModalContext.Provider>
    );
}