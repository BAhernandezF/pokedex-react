import React, { useContext } from 'react'
import { PokemonList, FilterBar } from '../components'
import { PokemonContext } from '../context/PokemonContext'

export const HomePage = () => {

	const { onClickLoadMore} = useContext(PokemonContext)

	return (
		<>
			<PokemonList />
			<FilterBar />
			<div className="container-btn-load-more container">
				<button className='btn-load-more' onClick={onClickLoadMore}>
					Cargar Mas
				</button>
			</div>
		</>
	)
}


