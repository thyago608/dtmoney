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

    const inputTitleRef = useRef<HTMLInputElement>(null);
    const inputCategoryRef = useRef<HTMLInputElement>(null);
    const inputValueRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState('');

    useEffect(()=>{
        setType(transactionCurrent.type);
    },[transactionCurrent])

    async function handleUpdateTransaction(event:FormEvent){
        event.preventDefault();

        if(isValidated()){
            await updateTransaction({
                id: transactionCurrent.id,
                title: inputTitleRef.current!.value,
                category: inputCategoryRef.current!.value,
                value: Number(inputValueRef.current!.value),
                type,
                createdAt: transactionCurrent.createdAt
            });

            setType('');
            handleCloseUpdateTransactionModal();
        }

    }


    function isValidated(){
        inputTitleRef.current?.value === '' ? inputTitleRef.current?.classList.add('empty-value')
                    :inputTitleRef.current?.classList.remove('empty-value');
    
        inputCategoryRef.current?.value === '' ? inputCategoryRef.current?.classList.add('empty-value')
                    :inputCategoryRef.current?.classList.remove('empty-value');

        inputValueRef.current?.value === '' ? inputValueRef.current?.classList.add('empty-value')
                    :inputValueRef.current?.classList.remove('empty-value');

        const validated = inputTitleRef.current?.value !== '' 
                        && inputCategoryRef.current?.value !== ''
                        && inputValueRef.current?.value !== '';

        return validated;
    }

    return(
        <Modal
            isOpen={isUpdateTransactionModalOPen}
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
                    ref={inputTitleRef}
                />

                <input 
                    type="number" 
                    min={0}
                    placeholder={`R$ ${transactionCurrent.value}`}
                    ref={inputValueRef}
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
                    ref={inputCategoryRef}
                />

                <button type="submit">
                    Atualizar
                </button>
            </Container>
        </Modal>
    );
}