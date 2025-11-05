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

      <div className="decorative-stars absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-5 left-5 text-3xl sparkle" style={{ animationDelay: '0.2s' }}>⭐</div>
        <div className="absolute top-12 right-8 text-4xl sparkle" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-24 left-12 text-3xl sparkle" style={{ animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute bottom-5 right-5 text-4xl sparkle" style={{ animationDelay: '0.8s' }}>✨</div>
        <div className="absolute top-40 left-5 text-2xl sparkle" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute top-1/2 right-8 text-3xl sparkle" style={{ animationDelay: '1.3s' }}>⭐</div>
        <div className="absolute bottom-40 right-12 text-2xl sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute top-2/3 left-8 text-3xl sparkle" style={{ animationDelay: '1.7s' }}>⭐</div>
      </div>

      <div className="decorative-smiles absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-16 left-1/4 text-4xl heart-float" style={{ animationDelay: '1s' }}>😊</div>
        <div className="absolute top-1/3 right-1/4 text-5xl heart-float" style={{ animationDelay: '3s' }}>🥰</div>
        <div className="absolute bottom-32 left-1/3 text-4xl heart-float" style={{ animationDelay: '5s' }}>😃</div>
        <div className="absolute bottom-16 right-1/3 text-5xl heart-float" style={{ animationDelay: '7s' }}>💖</div>
        <div className="absolute top-1/2 left-12 text-3xl heart-float" style={{ animationDelay: '2.5s' }}>🌟</div>
        <div className="absolute top-3/4 right-16 text-4xl heart-float" style={{ animationDelay: '4.5s' }}>✨</div>
      </div>
    </>
  );
};

export default FlowerDecoration;