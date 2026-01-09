import style from "./Footer.module.css";
import Link from "next/link";


export default function FooterComponent() {
    return (
        <div className={style.mainbox}>
            <div className={style.box}>
                <div className={style.leftone}>
                    Hungerbuddy
                </div>
                <div className={style.leftsecond}>
                    <div className={style.heading}>Company</div>
                    <div className={style.text}>
                        <Link href="#">About Us</Link>
                        <Link href="#">Hungerbuddy Corporate</Link>
                        <Link href="#">Careers</Link>
                        <Link className={style.text} href="#">Team</Link>
                        <Link href="#">Hungerbuddy One</Link>
                        <Link href="#">Hungerbuddy Instamart</Link>
                        <Link className={style.text} href="#">Hungerbuddy Dineout</Link>
                        <Link href="#">Minis</Link>
                        <Link href="#">Pyng</Link>
                    </div>

                </div>
                <div className={style.leftthree}>
                    <div className={style.heading}>Contact us</div>
                    <div className={style.text}>
                        <Link className={style.text} href="#">Help & Support</Link>
                        <Link className={style.text} href="#">Partner With Us</Link>
                        <Link className={style.text} href="#">Ride With Us</Link>

                        <div className={style.heading}>Legal</div>

                        <Link className={style.text} href="#">Terms & Conditions</Link>
                        <Link className={style.text} href="#">Cookie Policy</Link>
                        <Link className={style.text} href="#">Privacy Policy</Link>
                    </div>
                </div>
                <div className={style.leftfour}>
                    <div className={style.heading}>Availble in:</div>
                    <div className={style.text}>
                        <Link className={style.text} href="#">Bangalore</Link>
                        <Link className={style.text} href="#">Gurgaon</Link>
                        <Link className={style.text} href="#">Hyderabad</Link>
                        <Link className={style.text} href="#">Delhi</Link>
                        <Link className={style.text} href="#">Mumbai</Link>
                        <Link className={style.text} href="#">Pune</Link>
                    </div>
                </div>
                <div className={style.leftfive}>
                    <div className={style.heading}>Life at Hungerbuddy</div>
                    <div className={style.text}>
                        <Link className={style.text} href="#">Explore with Hungerbuddy</Link>
                        <Link className={style.text} href="#">Hungerbuddy News</Link>
                        <Link className={style.text} href="#">Snackables</Link>

                    </div>
                     <div className={style.heading}>Social Links</div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img className={style.image} src={'/images/linkedin-sign.png'} />
                        <img className={style.image} src={'/images/social.png'}  />
                        <img className={style.image} src={'/images/facebook.png'} />
                        <img className={style.image} src={'/images/instagram.png'}  />
                        <img className={style.image} src={'/images/pinterest-logo.png'}  />
                    </div>
                </div>
            </div>
            <div className={style.last}>
            <div className={style.lasttext}>For better experience, download the Hungerbuddy app now</div>
            <div><button className={style.btn}>App Store</button></div>
            <div><button className={style.btn}>Google Play</button></div>
            </div>
        </div>
    )
}