import { useState } from 'react';

export default function AISection({ onSummarize, onGenerateQuiz }) {
  const [noteText, setNoteText] = useState('NEP Syllabus includes programming, mathematics, skill enhancement, and practical implementation.');
  const [quizTopic, setQuizTopic] = useState('Data Structures and Algorithms');

  return (
    <section className="panel-grid">
      <article className="card">
        <h3>AI Summarizer</h3>
        <textarea value={noteText} onChange={(event) => setNoteText(event.target.value)} rows={5} />
        <button className="action-btn" onClick={() => onSummarize(noteText)}>Summarize Notes</button>
      </article>

      <article className="card">
        <h3>Auto Quiz Generator</h3>
        <input value={quizTopic} onChange={(event) => setQuizTopic(event.target.value)} />
        <button className="action-btn" onClick={() => onGenerateQuiz(quizTopic)}>Generate Quiz</button>
      </article>
    </section>
  );
}
