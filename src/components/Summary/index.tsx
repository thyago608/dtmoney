import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

export function Summary() {
  const { transactions } = useTransactions();
  

  const summary = transactions.reduce((accumulator, transaction)=>{
    if(transaction.type === 'deposit'){
      accumulator.deposits += transaction.value;
      accumulator.total += transaction.value;
    }
    else{
      accumulator.withdraws += transaction.value;
      accumulator.total -= transaction.value;
    }

    return accumulator;
  },{
    deposits: 0,
    withdraws: 0,
    total: 0
  });
  return (
    <Container>
      <section>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR',{
          style:'currency',
          currency:'BRL'
        }).format(summary.deposits)}</strong>
      </section>

      <section>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- {new Intl.NumberFormat('pt-BR',{
          style:'currency',
          currency:'BRL'
        }).format(summary.withdraws)}</strong>
      </section>

      <section className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR',{
          style:'currency',
          currency:'BRL'
        }).format(summary.total)}</strong>
      </section>
    </Container>
  );
}
