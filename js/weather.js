<<<<<<< HEAD
// 환경 변수 사용을 위해 dotenv 패키지 로드
import dotenv from 'dotenv';
dotenv.config();

const weatherContainer = document.getElementById('weather');
const weatherSpan = weatherContainer.querySelector('span:last-child');

// API 키를 환경 변수에서 가져옴
const serviceKey = process.env.WEATHER_API_KEY;

function fetchWeather(nx, ny) {
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = ('0' + now.getHours()).slice(-2) + '00';

    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response.body.items.item) {
                const items = data.response.body.items.item;
                const temperatureItem = items.find(item => item.category === 'T1H');
                const weatherItem = items.find(item => item.category === 'PTY');

                if (temperatureItem && weatherItem) {
                    const temperature = temperatureItem.obsrValue;
                    const weatherCode = weatherItem.obsrValue;
                    let weatherEmoji = '';
                    switch (weatherCode) {
                        case '0': // 맑음
                            weatherEmoji = '🌞';
                            break;
                        case '1': // 비
                            weatherEmoji = '🌧';
                            break;
                        case '2': // 비/눈
                        case '3': // 눈
                            weatherEmoji = '❄️';
                            break;
                        case '4': // 소나기
                            weatherEmoji = '🌦';
                            break;
                        default: // 흐림 등 기타
                            weatherEmoji = '⛅';
                            break;
                    }
                    weatherSpan.textContent = `${temperature}°C ${weatherEmoji}`;
                }
            } else {
                console.error('지정된 좌표에 대한 날씨 정보를 찾을 수 없습니다.');
            }
        })
        .catch(error => console.error('날씨 정보를 가져오는 중 오류가 발생했습니다:', error));
}

function toGridCoordinates(lat, lon) {
    const RE = 6371.00877;
    const GRID = 5.0;
    const SLAT1 = 30.0;
    const SLAT2 = 60.0;
    const OLON = 126.0;
    const OLAT = 38.0;
    const XO = 43;
    const YO = 136;

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const ro = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);

    const ra = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5), sn);
    const theta = lon * DEGRAD - olon;
    const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    return { nx, ny };
}

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const { nx, ny } = toGridCoordinates(lat, lon);
            fetchWeather(nx, ny);
        }, error => {
            alert('위치 정보를 가져오는 중 오류가 발생했습니다:');
        });
    } else {
        console.error('이 브라우저는 지오로케이션을 지원하지 않습니다.');
    }
}

getLocationAndWeather();
=======
const weatherContainer = document.getElementById('weather');
const weatherSpan = weatherContainer.querySelector('span:last-child');
const serviceKey = decodeURIComponent('ZbTDPHaoJJmi%2Fth1y95CmPQJ6mOBUs4cC6LaceANsGR8dC2KWHG9X60JdH%2FOi98UEDe4wJpDztC4quM5EURH0g%3D%3D');

function fetchWeather(nx, ny) {
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const hours = now.getHours();
    const minutes = now.getMinutes();
    let baseTime;

    if (minutes < 30) {
        baseTime = ('0' + (hours - 1)).slice(-2) + '30';
    } else {
        baseTime = ('0' + hours).slice(-2) + '30';
    }

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response.body.items.item) {
                const items = data.response.body.items.item;
                const temperatureItem = items.find(item => item.category === 'T1H');
                const weatherItem = items.find(item => item.category === 'PTY');

                if (temperatureItem && weatherItem) {
                    const temperature = temperatureItem.obsrValue;
                    const weatherCode = weatherItem.obsrValue;
                    let weatherEmoji = '';
                    switch (weatherCode) {
                        case '0': // 맑음
                            weatherEmoji = '🌞';
                            break;
                        case '1': // 비
                            weatherEmoji = '🌧';
                            break;
                        case '2': // 비/눈
                        case '3': // 눈
                            weatherEmoji = '❄️';
                            break;
                        case '4': // 소나기
                            weatherEmoji = '🌦';
                            break;
                        default: // 흐림 등 기타
                            weatherEmoji = '⛅';
                            break;
                    }
                    weatherSpan.textContent = `${temperature}°C ${weatherEmoji}`;
                }
            } else {
                console.error('지정된 좌표에 대한 날씨 정보를 찾을 수 없습니다.');
            }
        })
        .catch(error => console.error('날씨 정보를 가져오는 중 오류가 발생했습니다:', error));
}

function toGridCoordinates(lat, lon) {
    const RE = 6371.00877;
    const GRID = 5.0;
    const SLAT1 = 30.0;
    const SLAT2 = 60.0;
    const OLON = 126.0;
    const OLAT = 38.0;
    const XO = 43;
    const YO = 136;

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const ro = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);

    const ra = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5), sn);
    const theta = lon * DEGRAD - olon;
    const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    return { nx, ny };
}

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const { nx, ny } = toGridCoordinates(lat, lon);
            fetchWeather(nx, ny);
        }, error => {
            alert('위치 정보를 가져오는 중 오류가 발생했습니다:');
        });
    } else {
        console.error('이 브라우저는 지오로케이션을 지원하지 않습니다.');
    }
}

getLocationAndWeather();
>>>>>>> 8801b12bb5296acae16b62357b16eff1519123ad
