const FlowerDecoration = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute top-10 left-10 text-7xl sparkle">🌸</div>
        <div className="absolute top-20 right-20 text-6xl sparkle" style={{ animationDelay: '0.5s' }}>💐</div>
        <div className="absolute bottom-20 left-20 text-5xl sparkle" style={{ animationDelay: '1s' }}>🌺</div>
        <div className="absolute bottom-10 right-10 text-7xl sparkle" style={{ animationDelay: '1.5s' }}>🌷</div>
        <div className="absolute top-1/2 left-1/4 text-6xl sparkle" style={{ animationDelay: '0.7s' }}>🌹</div>
        <div className="absolute top-1/3 right-1/3 text-5xl sparkle" style={{ animationDelay: '1.2s' }}>🌼</div>
        <div className="absolute top-2/3 left-1/2 text-4xl sparkle" style={{ animationDelay: '0.3s' }}>🌻</div>
        <div className="absolute top-1/4 right-1/4 text-5xl sparkle" style={{ animationDelay: '1.8s' }}>💮</div>
      </div>
      
      <div className="decorative-hearts">
        <div className="heart-float" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>💕</div>
        <div className="heart-float" style={{ top: '25%', right: '15%', animationDelay: '2s' }}>💖</div>
        <div className="heart-float" style={{ top: '45%', left: '20%', animationDelay: '4s' }}>💝</div>
        <div className="heart-float" style={{ top: '60%', right: '25%', animationDelay: '6s' }}>💗</div>
        <div className="heart-float" style={{ top: '75%', left: '30%', animationDelay: '8s' }}>💓</div>
        <div className="heart-float" style={{ top: '35%', right: '10%', animationDelay: '3s' }}>💞</div>
      </div>
    </>
  );
};

export default FlowerDecoration;