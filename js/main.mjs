import quotes from './quotes.mjs';
console.log(quotes)

// Global variable declaration
// let body = document.querySelector('body');
// let weather = document.querySelector('.weather');
const ulElement = document.getElementById('to-do-list');
const addButton = document.getElementById('add');
const inputToDo = document.getElementById('input-todo');
const seconds = document.getElementById('second');
const minutes = document.getElementById('minute');
const hours = document.getElementById('hour');
const message = document.querySelector('.message');
const quote = document.querySelector('.quotes');
const author = document.querySelector('.author');
const userName = document.querySelector('.user-name');
// const settingIcon = document.querySelector('.setting');
// const location = document.querySelector('.changeLocation');
// const settingOptionList = document.querySelector('.setting-option');
const toDoArray = JSON.parse(localStorage.getItem('toDo')) || [];
const name = localStorage.getItem('userName') || '';

// // declaration & call setBackground function for change background
// function setBackground() {
//   let clientId = '04baca264584816f0ef1b146f6e1a989861fab654fc4ddc5d2474eea214ad614';
//   fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}`)
//   .then(data =>  data.json()).then(image => {
//   body.style.background = `url(${image.urls.regular}) no-repeat`;
//   body.style.backgroundSize = 'cover';
// })
// }
// setBackground();

// // function for show weather
// function showWeather() {
//   // let cityName = prompt('Where are you');
//   let apiKey = 'b20156877d92ec0e892a415edb752569';
//   fetch(`http://api.openweathermap.org/data/2.5/weather?q=rakkar&appid=${apiKey}`)
//   .then(data => data.json()).then(object => {
//     let tempKelvin = object.main.temp;
//     let tempCel = tempKelvin - 273.15;
//     let icon = object.weather[0].icon;
//     weather.innerHTML =
//       `${object.name}, ${object.weather[0].description}<img class='weather-icon' src='http://openweathermap.org/img/w/${icon}.png'>${parseInt(tempCel)}&#176 C`;
//   })
// }
// showWeather();

// Declaration currentTime function
function currentTime() {
  const now = new Date();

  return {
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours()
  }
}

// declaration twoDigitTime function for change time one digit to two digit e.g. 2:00 to 02:00
function twoDigitTime(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return time;
}

// Declaration setTime function for show time
function setTime() {
  seconds.innerHTML = twoDigitTime(currentTime().second);
  minutes.innerHTML = twoDigitTime(currentTime().minute);
  hours.innerHTML = twoDigitTime(currentTime().hour);
}
setTime();                   // call setTime function
setInterval(setTime,1000);   // time interval for setTimefunction


// condition for user name exist or not
if(name) {
  message.innerHTML = displayMessage(currentTime().hour) + name;
}

// action function declaration
function action(e) {
  if (e.code === 'Enter') {
    localStorage.setItem('userName', userName.value);
    message.innerHTML = displayMessage(currentTime().hour) + userName.value;
  } else {
    return;
  }
}

// displayMessage function  declaration
function displayMessage(time) {
  if(time < 15) {
    return 'Good Morning ';
  } 
    return 'Good Evening ';
}

// addList function to add todo list and call displayList function
function addList() {
  let objList = {
  	name : '',
  	done : false
  };
	objList.name = inputToDo.value;
	toDoArray.push(objList);
	inputToDo.value = '';
  localStorage.setItem('toDo',JSON.stringify(toDoArray));
	displayList(toDoArray);
}

// displayList function  declaration
function displayList(toDoList) {
  ulElement.innerHTML = toDoList.map((toDo, i) => {
    return (
      `<li>
          <input type='checkbox' class='toggle' data-id=${i} ${toDo.done ? 'checked' : ''}>
          <label for='toggle' class='list-item' data-id=${i}>${toDo.name}</label>
          <span class='edit' data-id=${i}>✍️</span>
          <span class='delete' data-id=${i}>x</span>
        </li>`
    )
  }).join(''); 
}


// checkBox function declaration
function checkBox(e) {
	let checkedBox = e.target.className;
	if(checkedBox !== 'toggle')
    return;
	let id = e.target.dataset.id;
	toDoArray[id].done = !toDoArray[id].done;
	localStorage.setItem('toDo', JSON.stringify(toDoArray));
} 


// deleteToDo function declaration
function deleteToDo(e){
	let deleteToDo = e.target.className;
	if(deleteToDo == 'delete') {
	 let id = e.target.dataset.id;
	 toDoArray.splice(id, 1);
  } else {
    return;
  }
	localStorage.setItem('toDo', JSON.stringify(toDoArray));
	displayList(toDoArray);
}


// editToDo function declaration
function editToDo(e) {
  let editToDo = e.target.className;
  let id = e.target.dataset.id;
  let editName = toDoArray[id].name;
  console.log(ulElement); 

}

// function settingOption() {
//   settingOptionList.innerHTML = `<ul><li class='changeLocation'>Change Your Location</li></ul>`
// }


// call displayList function for display toDoArray default
displayList(toDoArray);

// set keypress event for get username and call action function
userName.addEventListener('keypress', action);

// set click event on addButton and call addList function
addButton.addEventListener('click', addList);

//  set click event on ulElement and call checkBox function
ulElement.addEventListener('click', checkBox);

//  set click event on ulElement and call deleteToDo function
ulElement.addEventListener('click', deleteToDo);

//  set click event on ulElement and call editToDo function
ulElement.addEventListener('click', editToDo);

// set click event on settingIcon and call settingOption function
// settingIcon.addEventListener('click', settingOption);

function showQuotes() {
  let index = Math.floor(Math.random()*102);
  quote.innerHTML = `' ${quotes[index].quote} '`;
  author.innerHTML = quotes[index].author;
}

showQuotes();
setInterval(showQuotes, 50000);