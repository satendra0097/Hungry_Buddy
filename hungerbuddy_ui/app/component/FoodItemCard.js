'use client'

import styles from './FoodItemCard.module.css'
import { serverURL } from '../services/FatchNodeServices';
export default function FoodItemCard({data}) {
const mycolor=["#ffeaa7","#fabla0","#dff9fb","#686de0","#22a6b3","#78e08f","#fa983a","#6a89cc","#f8c291"]

  // const data = [
  //   { fooditemid: 1, fooditemname: 'Biryani', fooditemtype: 'NonVeg', fooditemtaste: 'Spicy', ingredients: 'Rice,Vegitables', fullprice: 400, halfprice: 270, offerprice: 299, picture: 'biryani.jpg', rating: 5.0, status: 'Available' },
  //   { fooditemid: 2, fooditemname: 'Laddo', fooditemtype: 'Veg', fooditemtaste: '', ingredients: 'Rice,Vegitables', fullprice: 600, halfprice: 300, offerprice: 550, picture: 'laddu.png', rating: 5.0, status: 'Available' },
  //   { fooditemid: 3, fooditemname: 'Veg Maggi', fooditemtype: 'Veg', fooditemtaste: 'Spicy', ingredients: 'Rice,Vegitables', fullprice: 120, halfprice: 70, offerprice: 100, picture: 'maggi.png', rating: 5.0, status: 'Available' },
  //   // { fooditemid: 4, fooditemname: 'Veg Pizza', fooditemtype: 'Veg', fooditemtaste: 'Medium', ingredients: 'Rice,Vegitables', fullprice: 300, halfprice: 0, offerprice: 180, picture: 'pizzaa.png', rating: 5.0, status: 'Available' }
  // ];

  const showFood = () => {
    return data?.map((item) => {
      const percent =
        item.offerprice > 0
          ? ((item.fullprice - item.offerprice) / item.fullprice) * 100
          : 0;

      return (
        <div className={styles.card} key={item.fooditemid}    >
          <div className={styles.imageContainer}style={{ background: mycolor[Math.floor(Math.random() * mycolor.length)]
            }} >
            <div className={styles.imageStyle}>
              <img src={`${serverURL}/images/${item.picture}`}
                alt={item.fooditemname}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {item.offerprice > 0 && (
              <div className={styles.discountBadge}>
                {percent.toFixed(0)}% OFF UPTO ₹{item.fullprice - item.offerprice}
              </div>
            )}
          </div>

          <div className={styles.content}>
            <h3 className={styles.name}>
              {item.fooditemtype === 'veg' ? (
                <img src={`${serverURL}/images/veg.png`} width={30} />
              ) : (
                <img src={`${serverURL}/images/nonveg.png`} width={30} />
              )}
              <span style={{ marginLeft: '8px' }}>{item.fooditemname}</span>

              {item.fooditemtaste === 'spicy' && (
                <img
                  src={`${serverURL}/images/chilli.png`}
                  width={30}
                  style={{ marginLeft: 8 }}
                />
              )}
            </h3>

            <div className={styles.ratingContainer}>
              <img src={`${serverURL}/images/star.png`} width={20} />
              <span className={styles.rating}>{item.rating}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.deliveryTime}>30-35 mins</span>
            </div>

            <p className={styles.location}>
              {item.offerprice === 0 ? (
                <span style={{ fontWeight: 'bold' }}>₹{item.fullprice}</span>
              ) : (
                <>
                  <span style={{ fontWeight: 'bold', marginRight: 6 }}>
                    ₹{item.offerprice}
                  </span>
                  <s>₹{item.fullprice}</s>
                </>
              )}
            </p>

            <p className={styles.cuisine}>North Indian</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: '95%', marginTop: 60 }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          marginLeft: '6%',
          color: 'black'
        }}
      >
        Today's Menu
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {showFood()}
      </div>
    </div>
  );
}
