import { Container, Content } from "./styles";
import logo from "../../assets/logo.svg";

type HeaderProps = {
  onOpenNewTransactionModal: () => void;
};

export function Header({onOpenNewTransactionModal}:HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}
