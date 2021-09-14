import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer} from './styles';

type NewTransactionModalProps = {
    isOpen:boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({isOpen,onRequestClose }:NewTransactionModalProps){
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
           
            <Container>
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
                    <button type="button">
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </button>

                    <button type="button">
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </button>
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