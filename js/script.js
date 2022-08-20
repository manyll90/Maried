window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', getWeather);
window.addEventListener('load', getQuotes);
/*window.addEventListener('load',placeholderTranslate);*/
window.addEventListener('load',StartSettingLanguge);
/*window.addEventListener('load',changeSettingLanguage);*/

let lang = 'ru-Ru';


//    Start time and date function

const time = document.querySelector('.time');
const dateNow = document.querySelector('.date');

function showNowTime() {
    setTimeout(showNowTime, 1000);
    const date = new Date();
    const currentTime = date.toLocaleTimeString('ru-Ru');
    time.textContent = currentTime;
    showNowDate();
    getTimeOfDay();
	getFolder();  
}

function showNowDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(lang, options);
    dateNow.textContent = currentDate;
}

//    End time and date function

//    Start greeting function

const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDayNow = '';
	if (hours === 0 || hours < 6) {
		timeOfDayNow = 'й ночи Любимая';
	} else if (hours >= 6 && hours < 12) {
		timeOfDayNow = 'е утро Любимая';
	} else if (hours >= 12 && hours < 18) {
		timeOfDayNow = 'го дня Любимая';
	} else {
		timeOfDayNow = 'го вечера Любимая';
	}
	greeting.textContent = `Добро${timeOfDayNow}`;
    return timeOfDayNow;
}


function getFolder() {
    const date = new Date();
    const hours = date.getHours();
	let timeOfDayFolder = '';
	if (hours === 0 || hours < 6) {
		timeOfDayFolder = 'night';
	} else if (hours >= 6 && hours < 12) {
		timeOfDayFolder = 'morning';
	} else if (hours >= 12 && hours < 18) {
		timeOfDayFolder = 'afternoon';
	} else {
		timeOfDayFolder = 'evening';
	}
	return timeOfDayFolder;
}

showNowTime();

function setLocalStorage() {
    localStorage.setItem('city', city.value);
  }

function getLocalStorage() {
    if (localStorage.getItem('city') === undefined || localStorage.getItem('city') === '' || localStorage.getItem('city') === null) {
        city.value = 'Витебск';
		city.textContent = 'Витебск';
		localStorage.setItem('city', city.value);
		getWeather();
    } else {
        city.value = localStorage.getItem('city');
    }
}

//    End greeting function
/*localStorage.clear();*/

//    Start slider function

let body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const sliderNext = document.querySelector('.slide-next');
let randomNum = getRandomNum(1, 20);
let bgNum = String(randomNum);

const fotoMorning = document.querySelector('.foto-morning');
const fotoAfternoon = document.querySelector('.foto-afternoon');
const fotoEvening = document.querySelector('.foto-evening');
const fotoNight = document.querySelector('.foto-night');
let folderFoto = getFolder();


fotoMorning.addEventListener('click', activeFotoMorning);
fotoAfternoon.addEventListener('click', activeFotoAfternoon);
fotoEvening.addEventListener('click', activeFotoEvening);
fotoNight.addEventListener('click', activeFotoNight);

function activeFotoMorning() {
	fotoMorning.classList.toggle('active');
	fotoAfternoon.classList.remove('active');
	fotoEvening.classList.remove('active');
	fotoNight.classList.remove('active');
	changeFotoFolder()
	setBg()
}

function activeFotoAfternoon() {
	fotoAfternoon.classList.toggle('active');
	fotoMorning.classList.remove('active');
	fotoEvening.classList.remove('active');
	fotoNight.classList.remove('active');
	changeFotoFolder()
	setBg()
}


function activeFotoEvening() {
	fotoEvening.classList.toggle('active');
	fotoAfternoon.classList.remove('active');
	fotoMorning.classList.remove('active');
	fotoNight.classList.remove('active');
	changeFotoFolder()
	setBg()
}


function activeFotoNight() {
	fotoNight.classList.toggle('active');
	fotoAfternoon.classList.remove('active');
	fotoEvening.classList.remove('active');
	fotoMorning.classList.remove('active');
	changeFotoFolder()
	setBg()
}


function changeFotoFolder() {
	if (fotoMorning.classList.contains('active')) {
		return folderFoto = 'morning';
	}
	if (fotoAfternoon.classList.contains('active')) {
		return folderFoto = 'afternoon';
	}
	if (fotoEvening.classList.contains('active')) {
		return folderFoto = 'evening';
	}
	if (fotoNight.classList.contains('active')) {
		return folderFoto = 'night';
	}
}




function getRandomNum(min, max) {
	return (min + Math.floor(Math.random() * (max)))
}

function setBg() {
	const img = new Image();
	/*img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getFolder()}/${bgNum.padStart(2,0)}.jpg`*/
	img.src = `../assets/img/${folderFoto}/${bgNum.padStart(2,0)}.jpg`;
	img.onload = () => {
		/*body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getFolder()}/${bgNum.padStart(2,0)}.jpg')`;*/
		body.style.backgroundImage = `url('../assets/img/${folderFoto}/${bgNum.padStart(2,0)}.jpg')`;
	}
	sliderNext.addEventListener('click', getSliderNext);
	slidePrev.addEventListener('click', getSlidePrev);
}

function getSliderNext() {
	sliderNext.removeEventListener('click', getSliderNext);
	if (randomNum < 20) {
        bgNum = String(++randomNum);
    } else {
        randomNum = 1;
        bgNum = String(randomNum);
    }
	setTimeout(setBg, 500)
}

function getSlidePrev() {
	slidePrev.removeEventListener('click', getSlidePrev);
    if (randomNum > 1) {
        bgNum = String(--randomNum);
    } else {
        randomNum = 20;
        bgNum = String(randomNum);
    }
	setTimeout(setBg, 500)
}

setBg()

//    End slider function


//   Start weater function

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const tempereture = document.querySelector('.temperature');
const weatherDiscription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherError = document.querySelector('.weather-error');

city.addEventListener('change', getWeather);

async function getWeather() {
	try {
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=f83a26f8a527a8e847e4f568ec0f383d&units=metric`;
		let res = await fetch(url);
		let data = await res.json();
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		tempereture.textContent = `${Math.floor(data.main.temp)}°C`;
		weatherDiscription.textContent = data.weather[0].description;
		wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
		humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%`;
		weatherError.textContent = '';
		city.addEventListener('change', getWeather);
	} catch {
		tempereture.textContent = '';
		weatherDiscription.textContent = '';
		wind.textContent = '';
		humidity.textContent = '';
		if (city.value) {
			weatherError.textContent = `Ошибка! Город ${city.value} не найден!`;
		} else {
			weatherError.textContent = `Ошибка! Введите город!`;
		}
	}
}

//   End weather function

//   Start quotes function

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
let randomQuotes = getRandomNum(0, 10);

const quotesMorning = document.querySelector('.quotes-morning');
const quotesAfternoon = document.querySelector('.quotes-afternoon');
const quotesEvening = document.querySelector('.quotes-evening');
const quotesNight = document.querySelector('.quotes-night');
let folderQuotes = getFolder();


quotesMorning.addEventListener('click', activeQuotesMorning);
quotesAfternoon.addEventListener('click', activeQuotesAfternoon);
quotesEvening.addEventListener('click', activeQuotesEvening);
quotesNight.addEventListener('click', activeQuotesNight);

function activeQuotesMorning() {
	quotesMorning.classList.toggle('active');
	quotesAfternoon.classList.remove('active');
	quotesEvening.classList.remove('active');
	quotesNight.classList.remove('active');
	changeQuotesFolder()
	getQuotes()
}

function activeQuotesAfternoon() {
	quotesAfternoon.classList.toggle('active');
	quotesMorning.classList.remove('active');
	quotesEvening.classList.remove('active');
	quotesNight.classList.remove('active');
	changeQuotesFolder()
	getQuotes()
}

function activeQuotesEvening() {
	quotesEvening.classList.toggle('active');
	quotesAfternoon.classList.remove('active');
	quotesMorning.classList.remove('active');
	quotesNight.classList.remove('active');
	changeQuotesFolder()
	getQuotes()
}

function activeQuotesNight() {
	quotesNight.classList.toggle('active');
	quotesAfternoon.classList.remove('active');
	quotesEvening.classList.remove('active');
	quotesMorning.classList.remove('active');
	changeQuotesFolder()
	getQuotes()
}

function changeQuotesFolder() {
	if (quotesMorning.classList.contains('active')) {
		return folderQuotes = 'morning';
	}
	if (quotesAfternoon.classList.contains('active')) {
		return folderQuotes = 'afternoon';
	}
	if (quotesEvening.classList.contains('active')) {
		return folderQuotes = 'evening';
	}
	if (quotesNight.classList.contains('active')) {
		return folderQuotes = 'night';
	}
}

async function getQuotes() {
	let quotes = `${folderQuotes}.json`;
	const res = await fetch(quotes);
	const data = await res.json();
	quote.textContent = (data[randomQuotes].text);
	quoteButton.addEventListener('click', changeQuote);
}

function changeQuote() {
	quoteButton.removeEventListener('click', changeQuote)
	if (randomQuotes === 10) {
        randomQuotes = 0;
    } else {
        randomQuotes++;
    }
	setTimeout(getQuotes, 500)
}

//   Start player function

const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const playList = document.querySelector('.play-list');
const play = document.querySelector('.play');
const audio = new Audio();
let isPlay = false;
let playNow = 0;

const trackMorning = document.querySelector('.track-morning');
const trackAfternoon = document.querySelector('.track-afternoon');
const trackEvening = document.querySelector('.track-evening');
const trackNight = document.querySelector('.track-night');

const trackListMorning = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];
const trackListAfternoon = ['Ryugan - Black Out Days Sped Up', 'ACDC - Highwayn to Hell', 'Bruno Mars - Locked Out Of Heaven', 'Marmozets - Major System Error'];
const trackListEvening = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];
const trackListNight = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];
let trackList = [];
let folderTrack = getFolder();
let sound = document.querySelectorAll('.sound');

trackMorning.addEventListener('click', activeTrackMorning);
trackAfternoon.addEventListener('click', activeTrackAfternoon);
trackEvening.addEventListener('click', activeTrackEvening);
trackNight.addEventListener('click', activeTrackNight);


if (getFolder() === 'morning' ) {
	trackList = trackListMorning;
} else if (getFolder() === 'afternoon' ) {
	trackList = trackListAfternoon;
} else if (getFolder() === 'evening' ) {
	trackList = trackListEvening;
} else {
	trackList = trackListNight;
}

function activeTrackMorning() {
	trackMorning.classList.toggle('active');
	trackAfternoon.classList.remove('active');
	trackEvening.classList.remove('active');
	trackNight.classList.remove('active');
	changeFolder()
	changeTrackList();
	playNow = 0;
	playAudio()
	removeTrackList()
	addTrackList()
	sound = document.querySelectorAll('.sound');
	isPlay = false;
	play.classList.remove('pause');
	playNow = 0;
	
}

function activeTrackAfternoon() {
	trackAfternoon.classList.toggle('active');
	trackMorning.classList.remove('active');
	trackEvening.classList.remove('active');
	trackNight.classList.remove('active');
	changeFolder()
	changeTrackList();
	playNow = 0;
	playAudio()
	removeTrackList()
	addTrackList()
	sound = document.querySelectorAll('.sound');
	isPlay = false;
	play.classList.remove('pause');
	
}

function activeTrackEvening() {
	trackEvening.classList.toggle('active');
	trackMorning.classList.remove('active');
	trackAfternoon.classList.remove('active');
	trackNight.classList.remove('active');
	changeFolder()
	changeTrackList();
	playNow = 0;
	playAudio()
	removeTrackList()
	addTrackList()
	sound = document.querySelectorAll('.sound');
	isPlay = false;
	play.classList.remove('pause');
	
	
}

function activeTrackNight() {
	trackNight.classList.toggle('active');
	trackMorning.classList.remove('active');
	trackAfternoon.classList.remove('active');
	trackEvening.classList.remove('active');
	changeFolder()
	changeTrackList();
	playNow = 0;
	playAudio()
	removeTrackList()
	addTrackList()
	sound = document.querySelectorAll('.sound');
	isPlay = false;
	play.classList.remove('pause');
	
	
}

function changeTrackList() {
	if (trackMorning.classList.contains('active')) {
		return trackList = trackListMorning;
	}
	if (trackAfternoon.classList.contains('active')) {
		return trackList = trackListAfternoon;
	}
	if (trackEvening.classList.contains('active')) {
		return trackList = trackListEvening;
	}
	if (trackNight.classList.contains('active')) {
		return trackList = trackListNight;
	}
}

function changeFolder() {
	if (trackMorning.classList.contains('active')) {
		return folderTrack = 'morning';
	}
	if (trackAfternoon.classList.contains('active')) {
		return folderTrack = 'afternoon';
	}
	if (trackEvening.classList.contains('active')) {
		return folderTrack = 'evening';
	}
	if (trackNight.classList.contains('active')) {
		return folderTrack = 'night';
	}
}

function addTrackList() {
	for(let i = 0; i < trackList.length; i++) {
		const li = document.createElement('li');
		li.classList.add('sound');
		li.textContent = trackList[i];
		playList.append(li);
	}
}

addTrackList()

function removeTrackList() {
	for(let i = 0; i < trackList.length; i++) {
		const li = document.querySelector('.sound');
		/*li.remove();*/
		li.parentNode.removeChild(li);
		/*const li = document.removeChild('li');
		li.classList.remove('sound');
		li.textContent = trackList[i];
		playList.append(li);*/
	}
}



sound = document.querySelectorAll('.sound');

function playAudio() {
	/*audio.src = `../assets/sounds/${trackList[playNow]}.mp3`;*/
	audio.src = `../assets/sounds/${folderTrack}/${trackList[playNow]}.mp3`;
	audio.currentTime = 0;
}

playAudio()

function starStopPlayer() {
	if (!isPlay) {
		audio.play();
		isPlay = true;
		sound[playNow].classList.add('sound-active');
		play.classList.toggle('pause');
	} else {
		audio.pause();
		isPlay = false;
		play.classList.toggle('pause');
	};
}

function letsPlayNext() {
	sound[playNow].classList.remove('sound-active');
	if (playNow < trackList.length - 1) {
		playNow++;
	} else {
		playNow = 0;
	}
	sound[playNow].classList.toggle('sound-active');
	playAudio();
	if (isPlay == true) {
		audio.play();
	}
}

function letsPlayPrev() {
	sound[playNow].classList.remove('sound-active');
	if (playNow > 0) {
		playNow--;
	} else {
		playNow = trackList.length - 1;
	}
	sound[playNow].classList.toggle('sound-active');
	playAudio();
	if (isPlay == true) {
		audio.play();
	}
}

/*trackMorning.addEventListener('click', activeTrackMorning);
trackAfternoon.addEventListener('click', activeTrackAfternoon);
trackEvening.addEventListener('click', activeTrackEvening);
trackNight.addEventListener('click', activeTrackNight);*/

play.addEventListener('click', starStopPlayer)
playNext.addEventListener('click', letsPlayNext)
playPrev.addEventListener('click', letsPlayPrev)
audio.addEventListener('ended', letsPlayNext)



//   End  player function

//   Start settings

const settings = document.querySelector('.settings-button');
const setingsInner = document.querySelector('.settings-inner');
const setingTime = document.querySelector('.button-time');
const setingDate = document.querySelector('.button-date');
const greetingContainer = document.querySelector('.greeting-container');
const setingGreeting = document.querySelector('.button-greeting');
const weather = document.querySelector('.weather');
const setingWeather = document.querySelector('.button-weather');
const player = document.querySelector('.player');
const setingPlayer = document.querySelector('.button-player');
const setingQuotes = document.querySelector('.button-quotes');
const footer = document.querySelector('.footer');

function openSettings() {
	setingsInner.classList.toggle('open');
	settings.classList.toggle('open');
}

function changeSettingTime() {
	time.classList.toggle('close');
	setingTime.classList.toggle('close');
	checkOptions (setingTime)
}

function changeSettingDate() {
	dateNow.classList.toggle('close');
	setingDate.classList.toggle('close');
	checkOptions (setingDate)
}

function changeSettingGreeting() {
	greetingContainer.classList.toggle('close');
	setingGreeting.classList.toggle('close');
	checkOptions (setingGreeting)
}

function changeSettingWeather() {
	weather.classList.toggle('close');
	setingWeather.classList.toggle('close');
	checkOptions (setingWeather)
}

function changeSettingPlayer() {
	player.classList.toggle('close');
	setingPlayer.classList.toggle('close');
	checkOptions (setingPlayer)
}

function changeSettingQuotes() {
	footer.classList.toggle('close');
	setingQuotes.classList.toggle('close');
	checkOptions (setingQuotes)
}

function checkOptions (value) {
		if (value.classList.contains('close')) {
			value.textContent = 'Включить';
		} else if (value.textContent === 'Выключить') {
			value.textContent = 'Включить';
		} else {
			value.textContent = 'Выключить';
		}
}


async function StartSettingLanguge() {
	checkOptions (setingTime)
	checkOptions (setingDate)
	checkOptions (setingGreeting)
	checkOptions (setingWeather)
	checkOptions (setingPlayer)
	checkOptions (setingQuotes)
}


settings.addEventListener('click', openSettings);
setingTime.addEventListener('click', changeSettingTime);
setingDate.addEventListener('click', changeSettingDate);
setingGreeting.addEventListener('click', changeSettingGreeting);
setingWeather.addEventListener('click', changeSettingWeather);
setingPlayer.addEventListener('click', changeSettingPlayer);
setingQuotes.addEventListener('click', changeSettingQuotes);
/*language.addEventListener('click', changeSettingLanguage)*/