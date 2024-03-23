import React, {useState, useEffect} from 'react';

export function  App(props) {
    const[colors, setColors] = useState([]);
    const [newColor, setNewColor] = useState("");

  const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        const response = await fetch(`https://www.csscolorsapi.com/api/colors/${newColor}`);
        const data = await response.json();
        console.log(data);
        setColors([...colors,data.data]);
      }catch(error){
        console.log("Error Fetching data", error);
      }
  }

    async function fetchColors(){
      try{
        const response = await fetch("https://www.csscolorsapi.com/api/colors");
        const data = await response.json();

        //console.log(data.colors);
        setColors(data.colors.slice(0,20));
      }catch(error){
        console.log("Error fetching data", error);
      }
    }


   useEffect(()=>{
    fetchColors();
   },[]);

  return (
     <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" className="text-input" placeholder="Enter Name" value={newColor} onChange={e=>setNewColor(e.target.value)}/>
        <button className="fetch-button">Fetch</button>
      </form>
      <div className="container-flex">
        {colors.map((color) => {
          return <div key={color.name} className="item-box" style={{"backgroundColor":color.name}}>
          </div>
        })}
      </div>   
      <p className="note">This file contains your Color Styles. They are applied to the shapes in the example above. You can use them across all your files.</p>
     </div>
  );
}

export default App;
// Log to console
//console.log('Hello console')