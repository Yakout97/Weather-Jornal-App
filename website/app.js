/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '78a3277964c0170aecc11c4f679e0c05&units=imperial';

const zipCode = document.getElementById('zip');
const btnGenerate = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//Add Generate btn
btnGenerate.addEventListener('click', ()=>{
    const fellingBox = document.getElementById('feelings');
    getData(baseURL,zipCode,apiKey)
    .then(function(data) {
        // console.log(data.main.temp + " " + fellingBox.value + " " + newDate)
        // console.log(data)
        postData('/addData',{temp:data.main.temp ,textFeel: fellingBox.value, newDate:newDate
        })
    })
    .then(function () {
        updateUI();
    })
})

//GetData from OpenWeather API
const getData = async (baseURL, zipCode, apiKey) =>{
    const request = await fetch(baseURL+zipCode.value+"&APPID="+apiKey);
try {
  const result = await request.json();
  return result;
} catch (error) {
    console.log(error);
}};

//PostData
const postData = async(url='', data={})=>{
    const response  = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
       const newData = await response.json();
            return newData;
    } catch (error) {
        console.log("error",error);
    }
};

//UpdateUi 
const updateUI = async ()=>{
    const req = await fetch("/getData")
    try {
        const result = await req.json()
        date.innerHTML = "📅"+result.newDate
        temp.innerHTML = "🌡️"+result.temp
        content.innerHTML = "🤔"+result.textFeel
    } catch (error) {
        console.log(error);
    }
}