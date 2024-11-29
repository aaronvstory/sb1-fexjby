import React, { useState } from 'react';
import { FileText, Upload, AlertCircle, Code, FunctionSquare, Box, Copy, GitBranch } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

SyntaxHighlighter.registerLanguage('python', python);

function App() {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        analyzeCode(content);
      };
      reader.readAsText(file);
    }
  };

  const analyzeCode = (content: string) => {
    // Mock analysis for demo
    setAnalysis({
      loc: content.split('\n').length,
      functions: (content.match(/def /g) || []).length,
      classes: (content.match(/class /g) || []).length,
      comments: (content.match(/#/g) || []).length,
      complexity: Math.floor(Math.random() * 10) + 1,
      issues: Math.floor(Math.random() * 5),
      duplications: Math.floor(Math.random() * 3),
    });
  };

  const complexityData = {
    labels: ['A (1-5)', 'B (6-10)', 'C (11-20)', 'D (21-30)', 'E (31+)'],
    datasets: [{
      data: [4, 3, 2, 1, 0],
      backgroundColor: ['#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#f44336'],
    }],
  };

  const issuesData = {
    labels: ['Errors', 'Warnings', 'Info'],
    datasets: [{
      data: [1, 2, 2],
      backgroundColor: ['#f44336', '#ffc107', '#2196f3'],
    }],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code size={24} className="text-blue-400" />
              <h1 className="text-xl font-bold">Python Script Analyzer</h1>
            </div>
            <label className="flex items-center px-4 py-2 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
              <Upload size={20} className="mr-2" />
              <span>Upload Script</span>
              <input type="file" accept=".py" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!code && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <FileText size={48} className="mb-4" />
            <p className="text-xl">Upload a Python script to begin analysis</p>
          </div>
        )}

        {code && analysis && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Lines of Code</p>
                    <p className="text-2xl font-bold">{analysis.loc}</p>
                  </div>
                  <FileText size={24} className="text-blue-400" />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Functions</p>
                    <p className="text-2xl font-bold">{analysis.functions}</p>
                  </div>
                  <FunctionSquare size={24} className="text-green-400" />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Classes</p>
                    <p className="text-2xl font-bold">{analysis.classes}</p>
                  </div>
                  <Box size={24} className="text-yellow-400" />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Complexity</p>
                    <p className="text-2xl font-bold">{analysis.complexity}</p>
                  </div>
                  <GitBranch size={24} className="text-purple-400" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Complexity Distribution</h2>
                <Bar 
                  data={complexityData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: { color: '#fff' }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: { color: '#fff' }
                      }
                    }
                  }}
                />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Issues Distribution</h2>
                <Pie 
                  data={issuesData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { color: '#fff' }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Code Preview */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Source Code</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{analysis.loc} lines</span>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Copy size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai}
                  customStyle={{
                    background: 'transparent',
                    padding: '1rem',
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Issues */}
            {analysis.issues > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Issues Found</h2>
                <div className="space-y-4">
                  {[...Array(analysis.issues)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3 text-yellow-400">
                      <AlertCircle size={20} />
                      <div>
                        <p className="font-semibold">Potential Issue #{i + 1}</p>
                        <p className="text-gray-400">Consider reviewing this section for improvements</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;