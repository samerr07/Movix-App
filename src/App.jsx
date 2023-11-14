import { useState,useEffect } from 'react'
import {fetchDataFromApi} from "./utils/api"
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguraion, getGenres } from './store/homeSlice'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {

  const dispatch = useDispatch()
  const url = useSelector((state)=>state.home.url)

  console.log(url)
  

  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
    console.log(res)
    const url = {
      backdrop : res.images.secure_base_url + "original",
      poster : res.images.secure_base_url + "original",
      profile : res.images.secure_base_url + "original",
    }
    dispatch(getApiConfiguraion(url))
    }
    )
  }

  const genresCall = async()=>{
    let promise = [];
    let endPoints = ["tv","movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promise.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promise)

    // console.log(data)
    data.map(({genres})=>{
      return genres.map((item) => (allGenres[item.id]) = item)
    })

    dispatch(getGenres(allGenres))
  }
  useEffect(()=>{
    fetchApiConfig()
    genresCall()
  },[])

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
