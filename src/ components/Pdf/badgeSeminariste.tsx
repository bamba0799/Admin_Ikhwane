import React from 'react';

const BadgeSeminariste: React.FC = () => {
  return (
    <div className="mx-auto my-10 w-80 bg-white border-l-[20px] border-r-[20px] border-l-red-700 border-r-orange-600 shadow-2xl relative overflow-hidden">
      {/* Motif en arrière-plan */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, row) => (
          [...Array(4)].map((_, col) => (
            <div key={`${row}-${col}`} className="absolute" style={{
              top: `${row * 12 - 5}%`,
              left: `${col * 25 - 10}%`,
            }}>
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                {/* Motif floral/mandala */}
                <g fill="none" stroke="#ffc0cb" strokeWidth="1.5">
                  {/* Pétales externes */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const x1 = 50 + Math.cos(angle) * 20;
                    const y1 = 50 + Math.sin(angle) * 20;
                    const x2 = 50 + Math.cos(angle) * 35;
                    const y2 = 50 + Math.sin(angle) * 35;
                    return (
                      <ellipse 
                        key={i}
                        cx={x2}
                        cy={y2}
                        rx="8"
                        ry="15"
                        transform={`rotate(${i * 45} ${x2} ${y2})`}
                        fill="#ffe0e8"
                        stroke="#ffc0cb"
                      />
                    );
                  })}
                  {/* Cercle central */}
                  <circle cx="50" cy="50" r="20" stroke="#ffc0cb" fill="none" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="15" stroke="#ffc0cb" fill="none" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="8" fill="#ffe0e8" stroke="#ffc0cb" strokeWidth="1"/>
                </g>
              </svg>
            </div>
          ))
        ))}
      </div>
      <div className="p-8 text-center relative z-10">
        {/* Logo ABEMCI */}
        <div className="mx-auto mb-8">
          <div className="mx-auto w-32 h-24 flex items-center justify-center">
            <svg viewBox="0 0 120 80" className="w-full h-full">
              {/* Circle */}
              <circle cx="60" cy="40" r="35" fill="none" stroke="#666" strokeWidth="2"/>
              {/* Minaret/Tower */}
              <rect x="54" y="25" width="12" height="30" fill="#4a7c59"/>
              <rect x="52" y="23" width="16" height="3" fill="#4a7c59"/>
              <circle cx="60" cy="28" r="3" fill="#4a7c59"/>
              {/* Bowl/Base */}
              <ellipse cx="60" cy="52" rx="18" ry="6" fill="#4a7c59"/>
            </svg>
          </div>
          <h2 className="text-gray-700 font-bold text-xl uppercase tracking-wider -mt-2">ABEMCI</h2>
        </div>
        
        <hr className="border-gray-300 mb-8" />
        
        {/* Nom */}
        <h1 className="text-5xl font-black uppercase text-red-900 leading-tight">
          DIARRASSOUBA
        </h1>
        <h1 className="text-5xl font-black uppercase text-red-900 leading-tight mt-1">
          ABDEL-AZIZAH
        </h1>
        
        <hr className="border-gray-300 my-8" />
        
        {/* Niveau */}
        <p className="text-gray-800 font-bold text-2xl uppercase tracking-wide">Niveau</p>
        <p className="text-6xl text-orange-600 font-bold mt-1">##</p>
        
        {/* Dortoir */}
        <p className="mt-6 text-gray-800 font-bold text-2xl uppercase tracking-wide">Dortoir</p>
        <p className="text-4xl text-orange-600 font-bold mt-1 tracking-wider">##########</p>
        
        {/* Séminariste */}
        <div className="mt-8 inline-block bg-orange-600 text-white px-12 py-3 rounded-full font-bold text-xl uppercase shadow-md">
          SÉMINARISTE
        </div>
        
        {/* Footer */}
        <div className="mt-8 flex justify-center items-center gap-2">
          <div className="flex items-baseline">
            <span className="text-orange-500 font-bold text-3xl italic">Ikh</span>
            <span className="text-orange-500 font-bold text-xl italic ml-1">Al</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-orange-500 font-bold text-4xl italic">Wane</span>
          </div>
          <div className="flex items-baseline ml-2">
            <span className="text-green-600 font-bold text-5xl">20</span>
            <span className="text-green-600 font-bold text-3xl">25</span>
          </div>
          <div className="ml-2 bg-red-900 text-white px-3 py-1 rounded font-bold text-sm">
            19 ème<br />édition
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeSeminariste;