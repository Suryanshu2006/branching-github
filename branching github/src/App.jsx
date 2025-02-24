import React, { useState, useEffect } from 'react';
import Maze from './components/Maze';
import mazeData from './mazeData';
import styled from 'styled-components';

const PlayerStyled = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
  position: absolute;
  top: ${(props) => props.y * 30}px;
  left: ${(props) => props.x * 30}px;
`;

function App() {
  const [player, setPlayer] = useState({ x: 1, y: 1 }); // Starting position

  const handleKeyDown = (e) => {
    const { x, y } = player;
    let newX = x;
    let newY = y;

    if (e.key === 'ArrowUp' && mazeData[y - 1][x] === 0) {
      newY -= 1;
    } else if (e.key === 'ArrowDown' && mazeData[y + 1][x] === 0) {
      newY += 1;
    } else if (e.key === 'ArrowLeft' && mazeData[y][x - 1] === 0) {
      newX -= 1;
    } else if (e.key === 'ArrowRight' && mazeData[y][x + 1] === 0) {
      newX += 1;
    }

    setPlayer({ x: newX, y: newY });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player]);

  return (
    <div style={{ position: 'relative' }}>
      <Maze />
      <h1>Maze game</h1>
      <PlayerStyled x={player.x} y={player.y} />
    </div>
  );
}

export default App;