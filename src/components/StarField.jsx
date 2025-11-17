import { useState, useEffect } from 'react';

const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.9 + 0.1,
          animationDelay: Math.random() * 5,
          animationDuration: Math.random() * 6 + 2,
          color: ['cyan', 'purple', 'blue', 'green', 'pink'][Math.floor(Math.random() * 5)]
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => {
        const colorClasses = {
          cyan: 'from-cyan-400 to-cyan-600',
          purple: 'from-purple-400 to-purple-600',
          blue: 'from-blue-400 to-blue-600',
          green: 'from-green-400 to-green-600',
          pink: 'from-pink-400 to-pink-600'
        };
        
        return (
          <div
            key={star.id}
            className={`absolute rounded-full bg-gradient-to-r ${colorClasses[star.color]} animate-pulse tech-glow`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        );
      })}
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const shapes = ['rounded-full', 'rounded-sm rotate-45', 'rounded-lg'];
          const colors = ['from-cyan-400 to-blue-400', 'from-purple-400 to-pink-400', 'from-green-400 to-emerald-400'];
          return (
            <div
              key={`particle-${i}`}
              className={`absolute w-2 h-2 bg-gradient-to-r ${colors[i % 3]} ${shapes[i % 3]} animate-bounce opacity-60`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10" />
    </div>
  );
};

export default StarField;