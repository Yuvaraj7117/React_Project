import { useState } from 'react';
import './App.css'


function App() {
 
  const [img,setImg]=useState("");
  const [loading,setLoading]=useState(false);
  const [qrdata,setqrData]=useState("joes");
  const [qrsize,setqrSize]=useState(150);
  async function generateQR(){
    setLoading(true);
    try {
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);

    } catch (error) {
      console.error("Error Generating QR Code:",error);
    }
    finally{
      setLoading(false);
    }
  }
  
  function downloadQR(){
   fetch(img)
   .then((response)=>response.blob())
   .then((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   }).catch((err)=>{
    console.log("Error in Downloading the QR code:",err);
   })
  }
  return (
    <>
      <div className="qr-container">
        {/* use encodeURIComponent() for special letters present in the links */}
        <h3>QR CODE GENERATOR</h3>
        {loading && <p style={{textAlign:"center",fontFamily:"Arial"}}>Please wait.........</p>}
        <div className="qr-code">
           {img && <img src={img} alt='qr-code-image'/>}
        </div>
        <label htmlFor="qrText">Data for QR code</label>
        <input type="text" id='qrText' placeholder='Enter the Text' value={qrdata} onChange={(e)=>setqrData(e.target.value)}/>
        <label htmlFor="qrText1">Image size(e.g,150)</label>
        <input type="text" id='qrText1' placeholder='Enter the size of qr code' value={qrsize} onChange={(e)=>setqrSize(e.target.value)}/>
        <button className="generateQr" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="downloadQr" onClick={downloadQR}>Download QR Code</button>
      </div>
    </>
  )
}

export default App;
