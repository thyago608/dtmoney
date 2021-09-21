import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiTool, FiTrash2 } from 'react-icons/fi';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, ContainerButtons } from "./styles";

export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const { handleOpenUpdateTransactionModal } = useModal();
  const [widthContainerButtons, setWidthContainerButtons] = useState(()=>{
  const width = window.innerWidth - (window.innerWidth * 0.07);

    return width;
  });
  let scrollAmount = 0;

  async function handleDeleteTransaction(id:string){
      await deleteTransaction(id);
  }

  function sliderScrollLeft(){
    const containerScroll = document.querySelector('.container-scroll');
    
    scrollAmount-= 200;

    if(scrollAmount < 0){
      scrollAmount = 0;
    }

    containerScroll?.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior:'smooth'
    });

  }

  function sliderScrollRight(){
    const containerScroll = document.querySelector('.container-scroll');

    const scrollWidth = containerScroll?.scrollWidth ?? 0;

    const clientWidth = containerScroll?.clientWidth ?? 0;

    const total = scrollWidth - clientWidth;

    if(scrollAmount <= total){
       scrollAmount+= 200;

       containerScroll?.scrollTo({
         top:0,
         left: scrollAmount,
         behavior: 'smooth'
       });

          if(widthContainerButtons === 479){
            containerScroll?.scrollTo({
              top:0,
              left: 0,
              behavior: 'smooth'
            });

            setWidthContainerButtons(window.innerWidth - 30);
            return;
          }
      
       setWidthContainerButtons(scrollWidth);      
      }
  }

  return (
    <Container className="container-scroll">
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
                      <button 
                          type="button" 
                          className="delete-transaction"
                          onClick={()=> handleDeleteTransaction(String(transaction.id))}
                      >
                          <FiTrash2/>
                      </button>
                  </div>
                </td>
            </tr>
            ))}
        </tbody>
      </table>
    
      <ContainerButtons style={{width: `${widthContainerButtons}px`}}>
        <button 
          type="button"
          onClick={sliderScrollLeft}
          className="button button-previous">
          <FiChevronLeft/>
        </button>

        <button 
          type="button"
          onClick={sliderScrollRight}
          className="button button-next">
          <FiChevronRight/>
        </button>
      </ContainerButtons>
    </Container>
  );
}
