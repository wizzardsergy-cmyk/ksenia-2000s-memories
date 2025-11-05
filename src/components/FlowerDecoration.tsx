const FlowerDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute top-10 left-10 text-6xl sparkle">🌸</div>
      <div className="absolute top-20 right-20 text-5xl sparkle" style={{ animationDelay: '0.5s' }}>💐</div>
      <div className="absolute bottom-20 left-20 text-4xl sparkle" style={{ animationDelay: '1s' }}>🌺</div>
      <div className="absolute bottom-10 right-10 text-6xl sparkle" style={{ animationDelay: '1.5s' }}>🌷</div>
      <div className="absolute top-1/2 left-1/4 text-5xl sparkle" style={{ animationDelay: '0.7s' }}>🌹</div>
      <div className="absolute top-1/3 right-1/3 text-4xl sparkle" style={{ animationDelay: '1.2s' }}>🌼</div>
    </div>
  );
};

export default FlowerDecoration;