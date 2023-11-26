import React from 'react';

const HeroModal = ({ heroes }) => {
  var totalPrimaryHero = 0;
  var totalSecondHero = 0;

  for (const key of Object.keys(heroes[0].powerstats)) {
    totalPrimaryHero += Number(heroes[0].powerstats[key]);
  }

  for (const key of Object.keys(heroes[1].powerstats)) {
    totalSecondHero += Number(heroes[1].powerstats[key]);
  }

  // Determina o herói vencedor
  let winnerName = '';
  if (totalPrimaryHero > totalSecondHero) {
    winnerName = heroes[0].name;
  } else if (totalSecondHero > totalPrimaryHero) {
    winnerName = heroes[1].name;
  } else {
    winnerName = "It's a tie!";
  }

  return (
    <div className="hero-modal">
      <p className='winner-hero'>Winner: {winnerName}</p>
      <div className="modal-content">
        {heroes.map(hero => (
          <div key={hero.id} className="container-hero">
            <div className="modal-hero">
              <div>
                <img src={hero.images.sm} alt={hero.name} />
              </div>
              <div>
                <p className='nameHeroModal'>{hero.name}</p>
              </div>
            </div>
            <div className='card'>
              <p>Intelligence: {hero.powerstats.intelligence}</p>
              <p>Strength: {hero.powerstats.strength}</p>
              <p>Speed: {hero.powerstats.speed}</p>
              <p>Durability: {hero.powerstats.durability}</p>
              <p>Power: {hero.powerstats.power}</p>
              <p>Combat: {hero.powerstats.combat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroModal;
