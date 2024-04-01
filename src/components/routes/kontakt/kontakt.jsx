import React, { useState, useRef } from 'react';
import './kontakt.scss';

const Kontakt = () => {
  const [issue, setIssue] = useState('general');
  const [description, setDescription] = useState('');
  const descriptionRef = useRef(null);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const textArea = descriptionRef.current;
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the email sending logic here
    console.log(`Issue: ${issue}`);
    console.log(`Description: ${description}`);
    // Reset form after submit or handle next steps (e.g., showing a success message)
  };

  return (
    <div className="contact-container">
      <h1>Imate li pitanja za nas?</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="issue-select">Izaberite problem:</label>
        <select id="issue-select" value={issue} onChange={(e) => setIssue(e.target.value)}>
          <option value="general">Opšta pitanja</option>
          <option value="billing">Problemi sa plaćanjem</option>
          <option value="technical">Tehnički problemi</option>
          <option value="other">Drugo</option>
        </select>

        <label htmlFor="description">Opišite vaš problem:</label>
        <textarea
          id="description"
          ref={descriptionRef}
          value={description}
          onChange={handleDescriptionChange}
          required
        />

        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
};

export default Kontakt;
