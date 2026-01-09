"use client"

import AdvertisementComponent from "../component/AdvertisementComponent"
import CategoryComponent from "../component/CategoryComponent"
import DrinksComponent from "../component/DrinksComponent"
import FoodItemCard from "../component/FoodItemCard"
import FooterComponent from "../component/FooterComponent"
import Header from "../component/Header"
import { useState, useEffect } from "react"
import SnacksComponent from "../component/SnacksComponent"
import { postData,getData } from "../services/FatchNodeServices"

export default function HomePage() {

  const [snacksList, setSnacksList] = useState([])
  const [drinkList, setDrinkList] = useState([])
const [foodList, setFoodList] = useState([])

  
  const fetchAllFood = async (categoryName) => {
    try {
      const response = await postData(
        "users/fetch_all_fooditems_by_category", { categoryname: categoryName }
      )

      if (response?.status) {

        if (categoryName === 'Snacks') setSnacksList(response.data || [])
        else if (categoryName === 'Drinks') setDrinkList(response.data || [])
      }
    } catch (error) {
      console.error("Error fetching food items:", error)
    }
  }



  const fetchAllFoodItems = async (cid) => {
   
      var response = await getData("users/fetch_all_fooditems");

  setFoodList(response.data);
   
  }



  useEffect(() => {
    fetchAllFood('Snacks')
    fetchAllFood('Drinks')
    fetchAllFoodItems()
  }, [])

  return (
    <div>
      <Header />

      <div style={{ width: '100%', background: '#f1eeeeff' }}>
        <SnacksComponent data={snacksList} />
      </div>

      <div style={{ width: '100%', background: '#f1eeeeff' }}>
        <DrinksComponent data={drinkList} />
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FoodItemCard data={foodList} />
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AdvertisementComponent />
      </div>

      <FooterComponent />
    </div>
  )
}
