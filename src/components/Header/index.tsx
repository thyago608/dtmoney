import { useModal } from '../../hooks/useModal';
import { Container, Content } from "./styles";
import logo from "../../assets/logo.svg";

export function Header() {
  const { handleOpenNewTransactionModal } = useModal();

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <button type="button" onClick={handleOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}
