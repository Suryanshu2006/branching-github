import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import mazeData from '../mazeData';

const MazeStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 30px);
`;

function Maze() {
  return (
    <MazeStyled width={mazeData[0].length}>
      {mazeData.flat().map((cell, index) => (
        <Cell key={index} isWall={cell === 1} />
      ))}
    </MazeStyled>
  );
}

export default Maze;