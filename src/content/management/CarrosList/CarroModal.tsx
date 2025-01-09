import { styled } from '@mui/material';

const ModalOverlay = styled("div")`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
const ModalContainer = styled('div')`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ModalHeader = styled('div')`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
`;
const ModalImage = styled('img')`
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-bottom: 20px;
`;
const InfoGroup = styled('span')`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const InfoLabel= styled('span')`   
    font-weight: bold;
    color: #333;
`;
const InfoValue = styled('span')`
    color: #666
`;
const CloseButton= styled('button')`
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: rgba(255, 79, 26, 0.49);
    }
`;

const CarroModal = ({carro, onClose}) =>{
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{carro.modelo} | ID: {carro.id}</ModalHeader>
        <ModalImage src={carro.image} alt={carro.modelo}></ModalImage>

        <InfoGroup>
          <InfoLabel>Modelo:</InfoLabel>
          <InfoValue>{carro.modelo}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Fabricante:</InfoLabel>
          <InfoValue>{carro.fabricante}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Pais de Origem:</InfoLabel>
          <InfoValue>{carro.pais_origem}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Ano:</InfoLabel>
          <InfoValue>{carro.ano}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Cor:</InfoLabel>
          <InfoValue>{carro.cor}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Cavalos de Potência:</InfoLabel>
          <InfoValue>{carro.cavalosDePotencia}</InfoValue>
        </InfoGroup>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  )
}
export default CarroModal;