document.addEventListener("DOMContentLoaded",()=>{
    let btn=document.querySelector('button');
    let output=document.querySelector('#output');
    async function get_weather(lat,long,city) {
        let api_weather=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
        let res= await fetch(api_weather);
        let data=await res.json();
        console.log(data.current_weather);
        let temp=data.current_weather.temperature;
        let windspeed=data.current_weather.windspeed;
        let isday=data.current_weather.is_day;
        let day=(isday==1) ? "Day" : "Night";
        output.innerHTML=`
            <h1> City : ${city} </h1>
            <h1> Temperature : ${temp} C </h1>
            <h1> Wind Speed : ${windspeed} </h1>
            <h1>  ${day} </h1>
        `
    }
    async function get_coord(url,city) {
        let res=await fetch(url);
        let data=await res.json();
        console.log(data);
        try{
            let lat=data.results[0].latitude;
            let long=data.results[0].longitude;
            await get_weather(lat,long,city);
        }
        catch{
            alert("data not found , Please enter valid City !!!!!");
        }
    }
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        let city=document.querySelector('input').value;
        if (city==""){
            alert("Please Enter city First !!!!");
        }
        else{
            let api_coord=`https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
            get_coord(api_coord,city);
        }
    })
})