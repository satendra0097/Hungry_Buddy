"use client"

import { useState,useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import SearchBar from "./SearchBar";
import CategoryComponent from "./CategoryComponent";
import {getData} from "../services/FetchNodeServices"

export default function Header() {
  const [categoryList,setCategoryList]=useState([])
  const fetchAllcategory = async () => {
    var response = await getData('users/fetch_all_category');
    setCategoryList(response.data);
  }

  useEffect(function () {
    fetchAllcategory();
  }, []);
  
  return (
    <div className={styles.maincontainer}>
      <div className={styles.stylebar}>
        <div className={styles.styletext}>
          <div>
            <div className={styles.styleone}>
              HungerBuddy in
            </div>
            <div className={styles.styletwo}>
              20 minutes
            </div>
            <div>
              <span className={styles.stylethree}> Home </span>-<span className={styles.stylename}>JackieThomas</span>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignContent: 'cneter', alignItems: 'center', marginLeft: '3px', top: 40, left: 3, justifyContent: 'center', position: 'absolute', width: 45, height: 15, background: '#273c75', border: '0.7 solid #fff', borderRadius: 10 }}> <span style={{ color: '#fff', fontSize: 9, fontWeight: 'bold' }}>&#8377;20</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, background: 'black' }}>
              <img src="/images/wallet.png" width={45} height={45} background="green" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, background: 'black', marginLeft: 3 }}>
              <img src="/images/user.png" width={45} height={45} background="green" />
            </div>

          </div>
        </div>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', marginBottom: '40' }} >
        <SearchBar />
      </div>
      <div style={{ width: '100%', background: '#f1eeeeff', justifyContent: 'center', alignItems: 'center' }}>
        <CategoryComponent data={categoryList} />
      </div>
    </div>
  );
}
