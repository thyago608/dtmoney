import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container } from "./styles";

export function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    const loadTransactions = async () => {
      const response = await api.get('/transactions');

      setTransactions(response.data.transactions);

    };
 
    loadTransactions();
 
  },[]);


  console.log(transactions);
  return (
    <Container>
      <table>
        <thead>
          <tr>  
            <th>Títlo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>20/02/2021</td>
          </tr>

          <tr>
            <td>Aluguel</td>
            <td className="withdraw">-R$1.100</td>
            <td>Casa</td>
            <td>03/01/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
