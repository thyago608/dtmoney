import styled from "styled-components";
import {darken, transparentize} from 'polished';

export const Container = styled.div`
  margin-top: 4rem;

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

      button{
        border: 0;

        font-size: 1.1rem;

        width: 2rem;
        height: 2rem;

        border-radius:50%;

        transition: filter 0.2s;
        cursor: pointer;

        &:hover{
          filter: brightness(0.9);
        }

        &.update-transaction{
          color: ${darken(0.1,'#33CC95')};
        }

        &.delete-transaction{
          color: ${darken(0.1,'#E52e54')}
        }
      }

      @media(max-width: 720px){
        padding: 1rem;
      }
    }
  }
`;
