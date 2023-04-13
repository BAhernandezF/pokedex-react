import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useLocation } from 'react-router-dom'
import { CardPokemon } from '../components'

export const SearchPage = () => {

  const location = useLocation()


  const {todosExistentes} = useContext(PokemonContext)

  const pokemonesFiltrados = todosExistentes.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()))




  return (
    <div className='container'>
      <p className='p-search'>
        se encontraron <span>{pokemonesFiltrados.length}</span> resultados
      </p>
      <div className="card-list-pokemon container">
        {pokemonesFiltrados.map(pokemon => (
          <CardPokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  )
}
