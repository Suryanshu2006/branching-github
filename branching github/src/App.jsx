import React, { useState, useEffect } from "react";
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
    </div>
  );
};

const App = () => {
  return <AgeCalculator />;
};

export default App;
