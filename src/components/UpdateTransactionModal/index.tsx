import { useState, useRef, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import { useModal } from '../../hooks/useModal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, Button } from './styles';

export function UpdateTransactionModal(){
    const { isUpdateTransactionModalOPen, 
            handleCloseUpdateTransactionModal,
            transactionCurrent
    } = useModal();

    const { updateTransaction } = useTransactions();

    const [title, setTitle]= useState('');
    const [category, setCategory]= useState('');
    const [value, setValue]= useState('');
    

    const [type, setType] = useState('');

    useEffect(()=>{
        setType(transactionCurrent.type);
    },[transactionCurrent])

    async function handleUpdateTransaction(event:FormEvent){
        event.preventDefault();

        await updateTransaction({
            id: transactionCurrent.id,
            title,
            category,
            value: Number(value),
            type,
            createdAt: transactionCurrent.createdAt
        });


        setTitle('');
        setCategory('');
        setValue('');
        setType('');
        handleCloseUpdateTransactionModal();
    }


    function inputIsEmpty(){

    }

    return(
        <Modal
            isOpen={true}
            onRequestClose={handleCloseUpdateTransactionModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                className="react-modal-close"
                onClick={handleCloseUpdateTransactionModal}
            >
                <img src={closeImg} alt="Fechar Modal"/>
            </button>   

            <Container onSubmit={handleUpdateTransaction}>
                <h2>Atualizar Transação</h2>

                <input 
                    type="text" 
                    placeholder={`${transactionCurrent.title}`}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />

                <input 
                    type="number" 
                    min={0}
                    placeholder={`R$ ${transactionCurrent.value}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <TransactionTypeContainer>
                    <Button 
                        type="button"
                        onClick={()=> setType('deposit')}
                        isActive={type === 'deposit'}
                        color='green'
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </Button>

                    <Button 
                        type="button"
                        onClick={()=>{setType('withdraw')}}
                        isActive={type === 'withdraw'}
                        color='red'
                    >
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </Button>
                </TransactionTypeContainer>
                
                <input 
                    type="text" 
                    placeholder={`${transactionCurrent.category}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">
                    Atualizar
                </button>
            </Container>
        </Modal>
    );
}