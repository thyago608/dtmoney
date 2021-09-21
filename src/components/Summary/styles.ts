import styled from "styled-components";
import { transparentize} from 'polished';

export const Container = styled.div`
  position: relative;
  
  .button{
    padding: 0 0.1rem;
    height: 10rem;
    font-size: 2rem;
    color: var(--text-title);
    background: ${transparentize(0.5,'#ccc')};
    border: 0;

    position: absolute;

    &:hover{
      filter: brightness(0.9);
    }
  }

  .button-previous{
    top:0;
    left:0;
  }

  .button-next{
    top:0;
    right: 0;
  }


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