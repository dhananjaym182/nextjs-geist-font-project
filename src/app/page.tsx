'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary('Error generating summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Text Summarizer</h1>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Enter text to summarize:</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
              placeholder="Paste your text here..."
            />
          </div>
          
          <button
            onClick={handleSummarize}
            disabled={isLoading || !inputText.trim()}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Summarizing...' : 'Summarize Text'}
          </button>
          
          {summary && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Summary:</h2>
              <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                <p className="text-gray-300">{summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
