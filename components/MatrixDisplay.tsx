'use client';

interface MatrixDisplayProps {
  title: string;
  matrix: number[][];
  color: 'primary' | 'accent';
}

export default function MatrixDisplay({ title, matrix, color }: MatrixDisplayProps) {
  const colorClass = color === 'primary' ? 'text-primary border-primary/20' : 'text-accent border-accent/20';
  const bgClass = color === 'primary' ? 'bg-primary/5' : 'bg-accent/5';

  return (
    <div className={`p-5 glass rounded-2xl border border-white/10 ${bgClass}`}>
      <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${color === 'primary' ? 'text-primary' : 'text-accent'}`}>
        <span className={`w-2 h-2 rounded-full ${color === 'primary' ? 'bg-primary' : 'bg-accent'}`}></span>
        Matriz {title}
      </h4>
      <div className="relative">
        <div className="absolute -left-2 top-0 bottom-0 w-1 border-y-2 border-l-2 border-white/20 rounded-l-md"></div>
        <div className="absolute -right-2 top-0 bottom-0 w-1 border-y-2 border-r-2 border-white/20 rounded-r-md"></div>
        <div className="overflow-x-auto px-2">
          <table className="min-w-full">
            <tbody>
              {matrix.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((val, cIndex) => (
                    <td key={cIndex} className="px-3 py-2 text-center text-sm font-mono text-zinc-300">
                      {val.toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
