import { FormEvent, useState, useRef } from 'react';
import Modal from 'react-modal';

import { useTransactions } from '../../hooks/useTransactions';
import { useModal } from '../../hooks/useModal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, Button } from './styles';

export function NewTransactionModal(){
    const { createNewTransaction } = useTransactions();
    const { isNewTransactionModalOpen, handleCloseNewTransactionModal} = useModal();

    const [type, setType] = useState('deposit');
    

    const inputTitleRef = useRef<HTMLInputElement>(null);
    const inputCategoryRef = useRef<HTMLInputElement>(null);
    const inputValueRef =  useRef<HTMLInputElement>(null);

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        if(isValidated()){
            await createNewTransaction({
                title: inputTitleRef.current!.value,
                category: inputCategoryRef.current!.value,
                value: Number(inputValueRef.current!.value),
                type
            });
        
            setType('deposit');
            handleCloseNewTransactionModal();
        }
    }


    function isValidated(){
       inputTitleRef.current?.value === ''? inputTitleRef.current?.classList.add('empty-value')
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
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseNewTransactionModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                className="react-modal-close"
                onClick={handleCloseNewTransactionModal}
            >
                <img src={closeImg} alt="Fechar Modal"/>
            </button>
           
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input 
                    type="text" 
                    placeholder="Título"
                    ref={inputTitleRef}
                />

                <input 
                    type="number" 
                    min={0}
                    placeholder="R$ 0,00"
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
                    placeholder="Categoria"
                    ref={inputCategoryRef}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}