import Modal from 'react-modal';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';
import { UpdateTransactionModal } from './components/UpdateTransactionModal';

import { TransactionProvider } from './context/TransactionContext';
import { ModalProvider } from './context/ModalContext';

import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

function App() {

  return (
        <TransactionProvider>
            <GlobalStyle/>
            <ModalProvider>
                <Header />
                <Dashboard />

                <NewTransactionModal />
                <UpdateTransactionModal/>
            </ModalProvider>
        </TransactionProvider>
  );
}

export default App;
