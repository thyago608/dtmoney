import styled from "styled-components";
import {darken, transparentize} from 'polished';

export const Container = styled.div`
  margin-top: 5rem;
  position: relative;


  @media(min-width: 720px){
    margin-top: 9rem;
  }
`;

export const ContainerTable = styled.div`
  overflow-x: hidden;

    table {
      width: 100%;
      border-spacing: 0 0.5rem;

      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem 2rem;
        text-align: left;
        line-height: 1.5rem;
      }

      td {
        
        padding: 1rem 2rem;
        border: 0;
        background: var(--shape);
        color: var(--text-body);
        border-radius: 0.25rem;

        &:first-child {
          color: var(--text-title);
        }

        &.withdraw {
          color: var(--red);
        }

        &.deposit {
          color: var(--green);
        }

        .container-buttons{
          display: flex;
          justify-content: space-evenly;
        }

        button{
          border: 0;

          font-size: 1.1rem;

          width: 1.8rem;
          height: 1.8rem;

          border-radius:50%;

          transition: filter 0.2s;
          cursor: pointer;

          &:hover{
            filter: brightness(0.9);
          }

          &.update-transaction{
            color: ${darken(0.1,'#33CC95')};
            margin-right: 5px;
          }

          &.delete-transaction{
            color: ${darken(0.1,'#E52e54')}
          }
        }

        @media(max-width: 720px){
          padding: 1rem 0.85rem;

          .container-buttons{
            flex-direction:column;

            button.update-transaction{
              margin-bottom: 10px;
            }
          }

        }
      }
    }
`;


export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-between;

    position: absolute;
    top:0;
    left:0;
    right:0;

    button.button{
      display: flex;
      align-items: center;
      justify-content: center;

      width: 4rem;
      height: 4rem;
      
      border:0;
      background: ${transparentize(0.7, '#ccc')};
      color: var(--text-title);
      font-size: 2rem;
      transition: filter 0.2s;

      border-radius: 50%;


      &:hover{
        filter: brightness(0.9);
      }
    }

    @media(min-width: 420px){
      display: none;
    }
`;