import {generateRandomUserData} from './data.js';
import {drawElement} from './draw-pictures.js';

const photoContainer = document.querySelector('.pictures');
const photo = generateRandomUserData();

drawElement(photo, photoContainer);
