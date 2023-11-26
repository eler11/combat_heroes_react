import React, { useEffect, useState } from 'react';
import './App.css';
import HeroModal from './HeroModal';
import Typography from '@mui/material/Typography';


const App = () => {
  const [heroes, setHeroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [chosenHero, setChosenHero] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHeroIds, setSelectedHeroIds] = useState([]);

  const handleClick = (clickedHeroId) => {
    const clickedHero = heroes.find((hero) => hero.id === clickedHeroId);

    // Verifica se o herói já foi selecionado e exibe um alerta.
    if (selectedHeroIds.includes(clickedHeroId)) {
      alert('Você não pode selecionar o mesmo herói novamente.');
      return;
    }

    if (!chosenHero) {
      setChosenHero(clickedHero);
    } else if (clickedHeroId !== chosenHero.id) {
      console.log('Primeiro herói escolhido:', chosenHero);
      console.log('Segundo herói escolhido:', clickedHero);


      setSelectedHeroes([chosenHero, clickedHero]);
      setChosenHero(null);

      // Atualiza a lista de IDs dos heróis selecionados
      setSelectedHeroIds([...selectedHeroIds, clickedHeroId]);
    }
  };

  const url = 'http://homologacao3.azapfy.com.br/api/ps/metahumans';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setHeroes(data);
      } catch (error) {
        console.error('Erro na requisição', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      <Typography variant="h4" component="h1" className="titulo-principal">
        Por favor, selecione duas cartas.
      </Typography>
      <div>
        <input
          type="text"
          placeholder="Buscar herói..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className='heroesList'>
        {heroes
          .filter(hero => hero.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(hero => (
            <li key={hero.id}>
              <div className={`hero-card ${selectedHeroIds.includes(hero.id) ? 'selected' : ''}`}>
                {hero.images && hero.images.sm && (
                  <img
                    className="heroesLogo"
                    src={hero.images.sm}
                    alt={hero.name}
                    onClick={() => handleClick(hero.id)}
                  />
                )}
                <p className='nameHero'>{hero.name}</p>
                {selectedHeroIds.includes(hero.id)}
              </div>
            </li>
          ))}
      </ul>

      {selectedHeroes.length === 2 && (
        <HeroModal heroes={selectedHeroes} animationType='slide' />
      )}
    </div>
  );
}

export default App;
