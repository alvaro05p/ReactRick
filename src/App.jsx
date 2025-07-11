import Search from './Search.jsx'
import Character from './Character.jsx'
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      setResultados([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
        const data = await response.json();
        setResultados(data.results || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  
  useEffect(() => {
  fetch('https://rickandmortyapi.com/api/character?page=1')
    .then(res => res.json())
    .then(data => {
      setCharacters(data.results);
      setTotalPages(data.info.pages); // <- Aquí guardas total de páginas
    });
  }, []);

  useEffect(() => {
    // Cada vez que cambie currentPage, traer personajes de esa página
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results);
      });
  }, [currentPage]);

  


  if (!characters) return <div>Loading...</div>;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <p className="mt-6 text-lg/8 text-gray-600">Search Characters API</p>
          <img src="/public/images/Rick_and_Morty.webp" alt="Rick and Morty" />
          <img src="/public/images/middleFinger-removebg-preview.png" alt="Rick and Morty" id="corner-image" />

          
        </div>
        {totalPages > 0 && (
          <Search
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            query={query}
            setQuery={setQuery}
          />
        )}
        {(query !== '' ? resultados : characters).map(character => (
          <Character
            key={character.id}
            name={character.name}
            origin={character.origin.name}
            status={character.status}
            imgSrc={character.image}
          />
        ))}
        {loading && <div className="text-center text-gray-500">Loading...</div>}
      </div>
    </div>
  )
}

export default App;
