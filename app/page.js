// app/page.js
"use client";
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // API එකට යවන Function එක
  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setOutput(data.legacy);
    } catch (error) {
      alert("Error converting text");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      
      <h1 className="text-4xl font-bold mb-8 text-green-400">
        Sinhala Unicode Converter
      </h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Box (Unicode) */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-400">Unicode (Type Here)</label>
          <textarea
            className="w-full h-64 p-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 outline-none text-lg"
            placeholder="මෙතන සිංහලෙන් ටයිප් කරන්න..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Box (Legacy) */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-400">Legacy Output (FM Abhaya)</label>
          <textarea
            className="w-full h-64 p-4 bg-gray-800 rounded-lg border border-gray-700 text-lg font-mono text-yellow-300"
            placeholder="Output එක මෙතන එයි..."
            value={output}
            readOnly
          />
        </div>

      </div>

      <button
        onClick={handleConvert}
        disabled={loading}
        className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full font-bold transition-all transform hover:scale-105"
      >
        {loading ? 'Converting...' : 'Convert to Legacy'}
      </button>

      <p className="mt-4 text-gray-500 text-sm">
        API Endpoint: /api/convert (POST)
      </p>

    </main>
  );
}
