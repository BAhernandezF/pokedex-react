import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"

export const PokemonProvider = ({children}) => {
    //primeros 50 pokemons a la api

    const [offset, setOffset] = useState(0)
    const [todosExistentes, setTodosExistentes] = useState([])
    const [allPokemons, setAllPokemons] = useState([])
    
    //custom hook useForm para extraer
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch:''
    })
    
    //estados para APP simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    //conexion a la  api de pokemon
    const getAllPokemons = async(limit = 50) =>{
        const baseUrl = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();

        const promesa = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promesa)

        setAllPokemons([
            ...allPokemons, ...results
        ])
        setLoading(false)
    }

    //obtiene todos los pokemones
    const traeTodosPokemon = async() =>{
        const baseUrl = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseUrl}pokemon?limit=649&offset=0`)
        const data = await res.json();

        const promesa = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promesa)
        setTodosExistentes(results)
        setLoading(false)
    }

    const traePokemonPorID = async(id) =>{
        const baseUrl = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseUrl}pokemon/${id}`)
        const data = await res.json();
        return data


    }

    //Al usar useEffect, se debe de forma inmediata agregar la depencia en vacio, sino
    //el pc se cnvertira en una patata caliente, dependencia = []
    useEffect(()=>{
        getAllPokemons()

    }, [offset])  

    useEffect(()=>{
        traeTodosPokemon()

    }, [])  

    //Boton cargar mas

    const onClickLoadMore = () =>{
        setOffset(offset + 50)
    }

  return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        todosExistentes,
        traePokemonPorID,
        onClickLoadMore,
        //loeader
        loading,
        setLoading,
        //filter
        active,
        setActive,
        //filter checkbox
    }}>
        {children}
    </PokemonContext.Provider>
  )
}
