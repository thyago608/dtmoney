import { useModal } from '../../hooks/useModal';
import { FiTool, FiTrash2 } from 'react-icons/fi';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();
  const { handleOpenUpdateTransactionModal } = useModal();

  return (
    <Container>
      <table>
        <thead>
          <tr>  
            <th>Títlo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                 <td>{transaction.title}</td>
                 <td className={transaction.type}>
                   {new Intl.NumberFormat('pt-BR',{
                     style:'currency',
                     currency: 'BRL'
                   }).format(transaction.value)}
                </td>
                 <td>{transaction.category}</td>
                 <td>
                   {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                </td>
                <td>
                  <div className="container-buttons">
                      <button 
                        type="button" 
                        className="update-transaction"
                        onClick={()=>handleOpenUpdateTransactionModal(transaction)}
                      >
                          <FiTool/>
                      </button>
                      <button type="button" className="delete-transaction">
                          <FiTrash2/>
                      </button>
                  </div>
                </td>
            </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
