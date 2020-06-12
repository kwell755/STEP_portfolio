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

window.onload = getMessage;
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
window.onload = createMap;


function createMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.8864, lng: -78.8784 },
    zoom: 30,
    mapTypeId: 'satellite'
  });

  const buffalo = new google.maps.Marker({
    position: { lat: 42.8864, lng: -78.8784 },
    map: map,
    title: 'Where I was born! Buffalo,NY',
  });

  const buffaloWindow = new google.maps.InfoWindow({
    content:
      'This is where I was born and raised. It is a pretty nice city with great scenery but I have to say there is not a lot fun places here other than the mall, Dave and Busters and the park.',
  });
  buffaloWindow.open(map, buffalo);

  const howard = new google.maps.Marker({
    position: { lat: 38.9227, lng: -77.0194 },
    map: map,
    title: 'Where I go to school! Howard University',
  });

  const howardWindow = new google.maps.InfoWindow({
    content:
      'My favorite HBCU, Howard University! This school has opened so many doors for me and allowed me to meet some of the funniest people of in life.',
  });
  howardWindow.open(map, howard);

  const summerProgram = new google.maps.Marker({
    position: { lat: 37.4104, lng: -122.0598 },
    map: map,
    title:
      'My first summer experience out on my own, The UNCF CS Summer Academy at Carnegie Mellon SV ',
  });

  const summerProgramWindow = new google.maps.InfoWindow({
    content:
      'My first time in Californa! This experience is so near and dear to my heart and it lead me to me meet so many friends from different HBCUs',
  });

  

  summerProgramWindow.open(map, summerProgram);

  const futureLocation = new google.maps.Marker({
    position: { lat: 40.7484405, lng:-73.9878531},
    map: map,
    title: ' Where I want To live after I graduate',
  });

  const futureLocationWindow = new google.maps.InfoWindow({
    content:
      'I have always wanted to live in NYC and hopefully after I graduate I will be able to move here.',
  });

  futureLocationWindow.open(map, futureLocation);
}

function changeLocation(updatedLat,updatedLong){

         map.setCenter(new google.maps.LatLng(updatedLat, updatedLong));
}

