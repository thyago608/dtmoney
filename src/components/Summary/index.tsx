import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

export function Summary() {
  return (
    <Container>
      <section>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </section>

      <section>
        <header>
          <p>Entradas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-R$500,00</strong>
      </section>

      <section className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$500,00</strong>
      </section>
    </Container>
  );
}
