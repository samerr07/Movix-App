import React, { useEffect, useState } from 'react'
import "./heroBanner.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

const HeroBanner = () => {

    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const {url} = useSelector((state)=>state.home)
    const navigate = useNavigate()

    const {data, loading} = useFetch("/movie/upcoming")
    console.log(url)

    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

        setBackground(bg)
    },[data])
    
    const searchQueryHandler = (e)=>{
        if(e.key === "Enter" && query.length>0){
            navigate(`/search/${query}`)
        } 
    }

  return (
    <div className="heroBanner">

        {
            !loading && (
                <div className="backgroundImg">
                    <Img src={background}/>
                </div>
            )
        }
        <div className="opacityLayer"></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">
                    Millions of movies, TV shows and people to discover.
                    Explore now.
                </span>
                <div className="searchInput">
                    <input type="text"
                    onChange={(e)=>setQuery(e.target.value)}
                        placeholder='Search for a movie or tv show....'
                        onKeyUp={searchQueryHandler}               
                    />
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
            
        
    </div>
  )
}

export default HeroBanner
