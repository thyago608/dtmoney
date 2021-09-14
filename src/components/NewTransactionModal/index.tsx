import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer, Button } from './styles';

type NewTransactionModalProps = {
    isOpen:boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({isOpen,onRequestClose }:NewTransactionModalProps){
    const [category, setCategory]= useState('');
    const [title, setTitle]= useState('');
    const [value, setValue]= useState(0);
    
    const [type, setType] = useState('deposit');
    
    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

    }

    return(
        <Modal
            isOpen={true}
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
                />

                <input 
                    type="number" 
                    placeholder="Valor"
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
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}