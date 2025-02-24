
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
import React, { useState, useEffect } from "react";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import "./App.css";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);

  useEffect(() => {
    let interval;
    if (birthDate) {
      interval = setInterval(() => {
        calculateAge();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [birthDate]);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = new Date();

    const totalMilliseconds = now - birth;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30.44); // Approximate months
    const totalYears = Math.floor(totalDays / 365.25); // Accounts for leap years

    setAge({ totalYears, totalMonths, totalDays, totalHours, totalMinutes, totalSeconds });
  };

  const handleResetClick = () => {
    setBirthDate("");
    setAge(null);
  };

  return (
    <div className="container">
      <h1>Age Calculator</h1>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      {age && (
        <div className="age-result">
          <p><strong>Total Age:</strong></p>
          <p><span>{age.totalYears}</span> Years</p>
          <p><span>{age.totalMonths}</span> Months</p>
          <p><span>{age.totalDays}</span> Days</p>
          <p><span>{age.totalHours}</span> Hours</p>
          <p><span>{age.totalMinutes}</span> Minutes</p>
          <p><span>{age.totalSeconds}</span> Seconds</p>
        </div>
      )}
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

const Quiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris"
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
      answer: "Harper Lee"
    },
    {
      question: "What is the smallest planet in our solar system?",
      options: ["Earth", "Mars", "Mercury", "Venus"],
      answer: "Mercury"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleResetClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
          <button onClick={handleResetClick}>Reset Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="logo-container">
        <img src={reactLogo} className="logo" alt="React logo" />
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>To-Do List</h1>
      <div className="todo-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task} <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div>
      <AgeCalculator />
      <Quiz />
      <TodoList />
    </div>
  );
};

export default App;
