import React, { useState } from 'react';

const moods = ['Happy', 'Sad', 'Excited', 'Relaxed', 'Angry'];

const MoodSelector = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState('');

  const handleChange = (e) => {
    setSelectedMood(e.target.value);
    onSelectMood(e.target.value);
  };

  return (
    <div className="mood-selector">
      <label htmlFor="mood">Select your mood: </label>
      <select id="mood" value={selectedMood} onChange={handleChange}>
        <option value="" disabled>Select mood</option>
        {moods.map((mood) => (
          <option key={mood} value={mood}>
            {mood}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoodSelector;
