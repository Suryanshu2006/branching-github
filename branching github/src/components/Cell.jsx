import styled from 'styled-components';

const CellStyled = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.isWall ? 'black' : 'white')};
  border: 1px solid lightgray;
`;

function Cell({ isWall }) {
  return <CellStyled isWall={isWall} />;
}

export default Cell;