const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
var data_hide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ''){
        city_name.innerText = `Input Field is Empty`;
        data_hide.classList.add('data_hide');
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=40656318e1d9a646fa4d06c3cc37235e`;
            const response = await fetch(url);   
            const data = await response.json();
            console.log(data);
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            const k_c = arrData[0].main.temp;
            temp.innerText = (parseFloat(k_c)-273.15).toFixed(2);
//            console.log((parseFloat(k_c)-273.15).toFixed(2));

            const tempStatus = arrData[0].weather[0].main;

            if(tempStatus == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
            }
            else if(tempStatus == "Clouds"){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #dfe4ea'></i>"
            }
            else if(tempStatus == "Rainy"){
                temp_status.innerHTML = "<i class='fas fa-cloud-rainy' style='color: #a4b0be'></i>"
            }
            else{
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #44c3de'></i>"
            }
    
            data_hide.classList.remove('data_hide');

        }catch{
            city_name.innerText = `Please Enter Correct City Name`;
            data_hide.classList.add('data_hide');
        }
    }

}

submitBtn.addEventListener('click', getInfo);