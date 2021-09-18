import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { Container, CarrouselWrapper, Carrousel } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();
  const [scrollAmount, setScrollAmount] = useState(0);
  let valueToGo = scrollAmount;

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

  function sliderScrollLeft(){
    const carrousel = document.querySelector('.carrousel');

    valueToGo -= 400;

    if(valueToGo < 0){
        valueToGo = 0;
    }

    setScrollAmount(valueToGo);

    carrousel?.scrollTo({
        top:0,
        left:valueToGo,
        behavior: 'smooth'
    });

    }

  function sliderScrollRight(){
    const carrousel = document.querySelector('.carrousel');

    const scrollWidth = carrousel?.scrollWidth ?? 0;

    const clientWidth = carrousel?.clientWidth ?? 0;

    const total = scrollWidth - clientWidth;

    if(scrollAmount <= total){
      valueToGo += 400;

      setScrollAmount(valueToGo);

      carrousel?.scrollTo({
          top:0,
          left:valueToGo,
          behavior: 'smooth'
      });

    }
  }


  console.log(scrollAmount);

  return (
    <Container>
      <CarrouselWrapper className="carrousel">
          <Carrousel>
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
        </Carrousel>
      </CarrouselWrapper>

      <button 
            type="button" 
            className="button button-previous"
            onClick={sliderScrollLeft}
      >
          <FiChevronLeft/>
      </button>

      <button 
            type="button" 
            className="button button-next"
            onClick={sliderScrollRight}
        >
          <FiChevronRight/>
      </button>
    </Container>
  );
}
