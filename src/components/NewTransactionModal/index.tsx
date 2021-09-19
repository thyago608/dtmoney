import { FormEvent, useState } from 'react';
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

    const [title, setTitle]= useState('');
    const [category, setCategory]= useState('');
    const [value, setValue]= useState('');
    
    const [type, setType] = useState('deposit');
    
    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createNewTransaction({
            title,
            category,
            value: Number(value),
            type
        });

        setTitle('');
        setCategory('');
        setValue('');
        setType('deposit');
        handleCloseNewTransactionModal();
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
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />

                <input 
                    type="number" 
                    min={0}
                    placeholder="R$ 0,00"
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
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}