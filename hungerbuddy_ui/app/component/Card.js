import styles from "./Card.module.css"

export default function OfferCards() {
  const offers = [
    {
      title: "FOOD",
      discount: "70%",
      subtitle: "Winter Specials",
      img: "/images/thali.png", 
    },
    {
      title: "SAMOSA",
      discount: "55%",
      subtitle: "Self Care & More",
      img: "/images/samosa.png",
    },
    {
      title: "JALEBI",
      discount: "35%",
      subtitle: "Kitchen Essentials",
      img: "/images/jalbi.png",
    },
  ];

  return (
    <div className={styles.container}>
      {offers.map((offer, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.title}>{offer.title}</h3>
          <p className={styles.discount}>
            UP TO <span>{offer.discount}</span> OFF
          </p>
          <img src={offer.img} alt={offer.title} className={styles.image} />
          <p className={styles.subtitle}>{offer.subtitle}</p>
        </div>
      ))}
    </div>
  );
}