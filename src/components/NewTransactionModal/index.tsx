import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';

import { TransactionContext } from '../../context/TransactionContext';

import api from '../../services/api';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer, Button } from './styles';

type NewTransactionModalProps = {
    isOpen:boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({isOpen,onRequestClose }:NewTransactionModalProps){
    const { createNewTransaction } = useContext(TransactionContext);

    const [title, setTitle]= useState('');
    const [category, setCategory]= useState('');
    const [value, setValue]= useState('');
    
    const [type, setType] = useState('deposit');
    
    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        createNewTransaction({
            title,
            category,
            value: Number(value),
            type
        })
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                className="react-modal-close"
                onClick={onRequestClose}
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