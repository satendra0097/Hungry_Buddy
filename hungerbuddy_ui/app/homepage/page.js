"use client"

import AdvertisementComponent from "../component/AdvertisementComponent"
import CategoryComponent from "../component/CategoryComponent"
import DrinksComponent from "../component/DrinksComponent"
import FoodItemCard from "../component/FoodItemCard"
import FooterComponent from "../component/FooterComponent"
import Header from "../component/Header"
import { useState, useEffect, useRef } from "react"
import SnacksComponent from "../component/SnacksComponent"
import { getData } from "../services/FetchNodeServices"
import { useReducer } from "react"
import { navigate } from "next/dist/client/components/segment-cache/navigation"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const aboutRef = useRef(null);
  const [snacksList, setSnacksList] = useState([])
  const [drinkList, setDrinkList] = useState([])
  const [foodList, setFoodList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  
// var navigate=useRouter()

//   useEffect(() => {
//     navigate.reffresh();
//   },[]);

  const fetchHomepageData = async () => {
    try {
      const response = await getData("users/homepage_data")
      if (response?.status) {
        setSnacksList(response.snacks || [])
        setDrinkList(response.drinks || [])
        setFoodList(response.allItems || [])
      }
    } catch (error) {
      console.error("Error fetching homepage data:", error)
    }
  }

  useEffect(() => {
    queueMicrotask(() => fetchHomepageData());
  }, [])

  const filteredFoodList = searchQuery.trim()
    ? foodList.filter((item) =>
        item.fooditemname.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : foodList;

  return (
    <div>
      <Header dataRef={aboutRef} foodList={foodList} setFoodList={setFoodList} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div style={{ width: '100%', background: '#f1eeeeff' }}>
        <SnacksComponent data={snacksList} />
      </div>

      <div style={{ width: '100%', background: '#f1eeeeff' }}>
        <DrinksComponent data={drinkList} />
      </div>

      <div ref={aboutRef} >
        <FoodItemCard data={filteredFoodList} searchQuery={searchQuery} />
      </div>


      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AdvertisementComponent />
      </div>

      <FooterComponent />
    </div>
  )
}
