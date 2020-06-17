// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */

window.kaylaTrivia = kaylaTrivia;

function kaylaTrivia() {
  const correctAnswers = ['b', 'a', 'b', 'c'];
  const questions = [
    'Which hackathon did my team take home our first win? \n a-Google b-Amazon Games c-Bison Hacks',
    'Where am I from? \n a-Buffalo b-NYC c-LA',
    'Out of these places, which one do I want to travel to the most? \n a-Utah b-Italy c-France',
    'In which one of these orgs do I hold a E-Board position? \n a-Student Council b-NSBE c-ACM',
  ];
  let points = 0;
  let userAns;
  for (let i = 0; i < questions.length; i++) {
    userAns = prompt(questions[i], '???');
    if (userAns == correctAnswers[i]) {
      points += 1;
      alert(`Correct! You have a score of ${points} points`);
    } else {
      alert(`Incorrect:( You have a score of ${points} points`);
    }
  }

  if (points >= 3) {
    alert(`Your final score is ${points}  Yay you did great!`);
  } else {
    alert(`Your final score is ${points}  Oof maybe try again?`);
  }
}

window.onload = function () {
  getMessage();
  createMap();
  createMarkers();
};

function getMessage() {
  // eslint-disable-line
  /** The fetch() function returns a Promise because the request is asynchronous. */
  const responsePromise = fetch('/data');

  /**  When the request is complete, pass the response into handleResponse(). */
  responsePromise.then(handleResponse);
}

function handleResponse(response) {
  /** response.text() returns a Promise, because the response is a stream of
   * content and not a simple variable.
   */
  const textPromise = response.text();

  /** When the response is converted to text, pass the result into the
   * addQuoteToDom() function.
   */
  textPromise.then(addQuoteToDom);
}

/** Passing quote to function so that it can be given to the DOM
 * @param {string} quote string
 */

function addQuoteToDom(quote) {
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

const google = window.google;
let map;
const markerLocations = {
  buffalo: [
    42.8864,
    -78.8784,
    'This is where I was born and raised. It is a pretty nice city with great scenery but I have to say there is not a lot fun places here other than the mall, Dave and Busters and the park.',
  ],
  howard: [
    38.9227,
    -77.0194,
    'My favorite HBCU, Howard University! This school has opened so many doors for me and allowed me to meet some of the funniest people in my life.',
  ],

  summerProgram: [
    37.4104,
    -122.0598,
    'My first summer experience out on my own, The UNCF CS Summer Academy at Carnegie Mellon SV ',
  ],

  futureLocation: [
    40.7484405,
    -73.9878531,
    'I have always wanted to live in NYC and hopefully after I graduate I will be able to move here.',
  ],
};

function createMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.8864, lng: -78.8784 },
    zoom: 20,
    mapTypeId: 'satellite',
  });
}

function createMarkers() {
  for (const key in markerLocations) {
    if (key) {
      const marker = new google.maps.Marker({
        position: {
          lat: markerLocations[key][0],
          lng: markerLocations[key][1],
        },
        map: map,
      });
      createInfoWindows(marker, key);
    }
  }
}

function createInfoWindows(marker, key) {
  const infoWindow = new google.maps.InfoWindow({
    content: markerLocations[key][2],
  });
  infoWindow.open(map, marker);
}

function changeLocation(updatedLat, updatedLong) {
  map.setCenter(new google.maps.LatLng(updatedLat, updatedLong));
}

document.getElementById('cali').addEventListener('click', function () {
  changeLocation(37.4104, -122.0598);
});

document.getElementById('howard').addEventListener('click', function () {
  changeLocation(38.9227, -77.0194);
});

document.getElementById('buff').addEventListener('click', function () {
  changeLocation(42.8864, -78.8784);
});

document.getElementById('nyc').addEventListener('click', function () {
  changeLocation(40.7484405, -73.9878531);
});
