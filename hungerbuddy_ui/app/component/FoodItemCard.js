'use client'

import styles from './FoodItemCard.module.css'
import { serverURL } from '../services/FetchNodeServices';
import { useRouter } from 'next/navigation';
import { memo, useMemo, useCallback } from 'react';

const COLORS = ["#ffeaa7", "#fab1a0", "#dff9fb", "#686de0", "#22a6b3", "#78e08f", "#fa983a", "#6a89cc", "#f8c291"];

const FoodItemCard = memo(function FoodItemCard({ data, searchQuery }) {
  const navigate = useRouter();

  const handleCardClick = useCallback((id) => {
    navigate.push(`/productdetailcomponent/${id}`);
  }, [navigate]);

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
        Today&apos;s Menu
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {data?.length === 0 && searchQuery ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666', fontSize: 16, width: '100%' }}>
            No food items found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          data?.map((item) => {
            const bgColor = COLORS[item.fooditemid % COLORS.length];
            const offerprice = Number(item.offerprice) || 0;
            const fullprice = Number(item.fullprice) || 0;
            const percent = fullprice > 0 && offerprice > 0 ? ((fullprice - offerprice) / fullprice * 100) : 0;

            return (
              <div key={item.fooditemid} className={styles.card} onClick={() => handleCardClick(item.fooditemid)}>
                <div className={styles.imageContainer} style={{ background: bgColor }}>
                  <div className={styles.imageStyle}>
                    <img loading="lazy" src={`${serverURL}/images/${item.picture}`}
                      alt={item.fooditemname}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>

                  {offerprice > 0 && (
                    <div className={styles.discountBadge}>
                      {percent > 0 && <>{percent.toFixed(0)}% OFF UPTO ₹{fullprice - offerprice}</>}
                    </div>
                  )}
                </div>

                <div className={styles.content}>
                  <h3 className={styles.name}>
                    <img src={`${serverURL}/images/${item.fooditemtype === 'veg' ? 'veg' : 'nonveg'}.png`} width={30} />
                    <span style={{ marginLeft: '8px' }}>{item.fooditemname}</span>

                    {item.fooditemtaste === 'spicy' && (
                      <img src={`${serverURL}/images/chilli.png`} width={30} style={{ marginLeft: 8 }} />
                    )}
                  </h3>

                  <div className={styles.ratingContainer}>
                    <img src={`${serverURL}/images/star.png`} width={20} />
                    <span className={styles.rating}>{item.rating}</span>
                    <span className={styles.separator}>•</span>
                    <span className={styles.deliveryTime}>30-35 mins</span>
                  </div>

                  <p className={styles.cuisine}>
                    {offerprice > 0 ? (
                      <>
                        <span style={{ fontWeight: 'bold', marginRight: '2%', color: '#000' }}>₹{offerprice}</span>
                        <s>₹{fullprice}</s>
                      </>
                    ) : (
                      <span style={{ fontWeight: 'bold', color: '#000' }}>₹{fullprice}</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

export default FoodItemCard;
