'use client';

import { useState } from 'react';

interface MatrixInputProps {
  onFactorize: (matrix: number[][]) => void;
  loading: boolean;
}

export default function MatrixInput({ onFactorize, loading }: MatrixInputProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(3).fill(0).map(() => Array(3).fill(0))
  );

  const handleSizeChange = (r: number, c: number) => {
    const newRows = Math.max(1, Math.min(6, r));
    const newCols = Math.max(1, Math.min(6, c));
    setRows(newRows);
    setCols(newCols);
    
    const newMatrix = Array(newRows).fill(0).map((_, rowIndex) => 
      Array(newCols).fill(0).map((_, colIndex) => 
        (matrix[rowIndex] && matrix[rowIndex][colIndex]) || 0
      )
    );
    setMatrix(newMatrix);
  };

  const handleValueChange = (r: number, c: number, val: string) => {
    const newMatrix = [...matrix];
    newMatrix[r][c] = parseFloat(val) || 0;
    setMatrix(newMatrix);
  };

  const fillRandom = () => {
    const newMatrix = matrix.map(row => row.map(() => Math.floor(Math.random() * 20) - 10));
    setMatrix(newMatrix);
  };

  return (
    <div className="p-6 glass rounded-2xl border border-white/10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Entrada de Matriz</h3>
          <p className="text-sm text-zinc-400">Define las dimensiones y los valores</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            <input 
              type="number" 
              value={rows} 
              onChange={(e) => handleSizeChange(parseInt(e.target.value), cols)}
              className="w-12 bg-transparent text-center text-white text-sm focus:outline-none"
              min="1" max="6"
            />
            <span className="text-zinc-500 text-xs">×</span>
            <input 
              type="number" 
              value={cols} 
              onChange={(e) => handleSizeChange(rows, parseInt(e.target.value))}
              className="w-12 bg-transparent text-center text-white text-sm focus:outline-none"
              min="1" max="6"
            />
          </div>
          <button 
            onClick={fillRandom}
            className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
          >
            Aleatorio
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div 
          className="grid gap-2 inline-grid"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(64px, 1fr))` }}
        >
          {matrix.map((row, rIndex) => 
            row.map((val, cIndex) => (
              <input
                key={`${rIndex}-${cIndex}`}
                type="number"
                value={val}
                onChange={(e) => handleValueChange(rIndex, cIndex, e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => onFactorize(matrix)}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
            Calculando Factorización...
          </>
        ) : (
          'Ejecutar Factorización QR'
        )}
      </button>
    </div>
  );
}
