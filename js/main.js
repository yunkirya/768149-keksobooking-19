'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_OFFERS = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var getFeatures = function () {
  var features = [];
  for (i = 0; i < getRandomInt(0, FEATURES.length); i++) {
    features.push(FEATURES[getRandomInt(0, FEATURES.length)]);
  }
  return features;
};

var getPhotos = function () {
  var features = [];
  for (i = 0; i < getRandomInt(0, PHOTOS.length); i++) {
    features.push(PHOTOS[getRandomInt(0, PHOTOS.length)]);
  }
  return features;
};

var getOffers = function (numberOfOffers) {
  var offer = [];
  for (var i = 0; i < numberOfOffers; i++) {
    offer.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: '600, 350',
        price: getRandomInt(50, 351),
        type: TYPES[getRandomInt(0, TYPES.length)],
        rooms: getRandomInt(1, 7),
        guests: getRandomInt(1, 13),
        checkin: CHECKINS[getRandomInt(0, CHECKINS.length)],
        checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length)],
        features: getFeatures(getRandomInt(0, FEATURES.length)),
        description: 'Описание',
        photos: getPhotos(getRandomInt(0, PHOTOS.length))
      },
      location: {
        x: getRandomInt(0, 1201),
        y: getRandomInt(130, 631)
      }
    });
  }
  return offer;
};

var offer = getOffers(NUMBER_OF_OFFERS);

var similarPinList = document.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (offer) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinAvatar = pinElement.querySelector('img');
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.title;
  pinElement.style.left = offer.location.x - 25 + 'px';

  pinElement.style.top = offer.location.y - 70 + 'px';
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < offer.length; i++) {
  fragment.appendChild(renderPin(offer[i]));
}
similarPinList.appendChild(fragment);
