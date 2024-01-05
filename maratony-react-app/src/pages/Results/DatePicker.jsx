// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const DateRangePicker = ({ onSelectDateRange }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleSelectDateRange = () => {
//     if (startDate && endDate) {
//       onSelectDateRange(startDate, endDate);
//     } else {
//       // Obsługa błędu, np. wyświetlenie komunikatu
//     }
//   };

//   return (
//     <div>
//       <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
//       <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
//       <button onClick={handleSelectDateRange}>Select Date Range</button>
//     </div>
//   );
// };

// export default DateRangePicker;
