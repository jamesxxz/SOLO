import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import '../../components/CoachView/CalendarBar.css'; // Ensure this path is correct 
const CalendarBar: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(moment().format('D'));
  const [currentMonth, setCurrentMonth] = useState<string>(moment().format('MMMM'));
  const currentDayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateDates = () => {
      const daysInMonth = moment().daysInMonth();
      const tempDates = [];
      for (let i = 1; i <= daysInMonth; i++) {
        tempDates.push(moment().date(i).format('D'));
      }
      setDates(tempDates);
    };

    generateDates();
  }, []);

  useEffect(() => {
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [dates]);

  return (
    <div className="calendar-bar">
      <div className="month">{currentMonth}</div>
      <div className="dates-container">
        {dates.map((date, index) => (
          <div
            key={index}
            ref={date === currentDate ? currentDayRef : null}
            className={`calendar-date ${date === currentDate ? 'highlight' : ''}`}
          >
            <div className="day-letter">{moment().date(index + 1).format('dd').charAt(0)}</div>
            <div className="date-number">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBar;
