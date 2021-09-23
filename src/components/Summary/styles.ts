import styled from "styled-components";
import { transparentize} from 'polished';

export const Container = styled.div`
  @media(min-width: 720px){
    .button{
      display:none;
    }
  }
`;


export const CarrouselWrapper = styled.div`
  margin-top: -10rem;

  overflow-x: hidden;

`;


export const Carrousel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  section {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: normal;
      line-height: 3rem;
    }

    &.highlight-background {
      background: var(--green);
      color: #fff;
    }

    @media(max-width:620px){
      strong{
        font-size: 1.3rem;
      }
    }


    @media(max-width:720px){
      &{
        width: 28rem;
        height: 10rem;
      }
    }
  }
`;

export const ContainerButtons = styled.div`
  border: 1px solid blue;

  margin-top: -7rem;

  display: flex;
  justify-content: space-between;

  button{
    border: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4rem;
    height: 4rem;

    border-radius: 50%;
    font-size: 2rem;
    color: var(--text-title);
    background: ${transparentize(0.5,'#ccc')};

    &:hover{
      filter: brightness(0.9);
    }
  }
`;