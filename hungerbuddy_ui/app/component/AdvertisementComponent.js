


// export default function AdvertisementComponent() {
//     const serverUrl=process.env.serverUrl

//     return (
//         <div style={{width:'96%', height:470, display:'flex', marginTop:30, background:'#f1f0e4', display:'flex', }}>
//             <div style={{width:'50%', height:'100%',}}>
//                 <img src={`${serverUrl}/images/student.avif`} style={{width:'100%', height:'100%', padding:0}} />
//             </div>
//             <div style={{width:'50%', height:'100%',display:'flex' }}>
//                 <div style={{padding:100, }}>
//                 <div style={{fontSize:'2rem', color:'#32472f', fontWeight:'500', display:'flex', justifyContent:'center', marginBottom:'1rem'}}>Our gift to you</div>
//                 <div style={{fontSize:'1.4rem', color:'#444a2f', lineHeight:1.7,}}>Make the season merrier with a 
//                     <b> free handcrafted drink with purchase.</b>It’s our treat during your first week as a 
//                    Starbucks® Rewards member.*</div>
//                 <div>
//                     <button style={{padding:'10px 20px 10px 20px', background:'#334b43', color:'#fff', borderRadius:25, border:'1px solid #334b43', fontSize:'1.3rem'}}>Join Now</button>
//                 </div>
//                 </div>
//             </div>
//             </div>
//     )
// }





import style from "./AdvertisementComponent.module.css";

export default function AdvertisementComponent() {
  const serverUrl = process.env.serverUrl;

  return (
    <div className={style.adparent}>
      <div className={style.adleft}>
        <img
          src={`${serverUrl}/images/student.avif`}
          className={style.adimage}
        />
      </div>

      <div className={style.adright}>
        <div className={style.adcontent}>
          <div className={style.adheading}>Our gift to you</div>

          <div className={style.addesc}>
            Make the season merrier with a 
            <b> free handcrafted drink with purchase.</b>
            It’s our treat during your first week as a 
            Starbucks® Rewards member.*
          </div>

          <div>
            <button className={style.adbtn}>Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
