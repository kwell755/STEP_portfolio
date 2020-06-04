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


function KaylaTrivia(){
   const correctAnswers = ['b','a','b','c'] ;
   const questions= ['Which hackathon did my team take home our first win? \n a-Google b-Amazon Games c-Bison Hacks','Where am I from? \n a-Buffalo b-NYC c-LA','Out of these places, which one do I want to travel to the most? \n a-Utah b-Italy c-France','In which one of these orgs do I hold a E-Board position? \n a-Student Council b-NSBE c-ACM'];
   var points = 0;
   var userAns;
    
    for(i=0;i< questions.length;i++){
        user_ans = prompt(questions[i], "???");
        if(userAns==correctAnswers[i]){
            points+=1;
            alert(`Correct! You have a score of ${points} points`);
        }
        else{
             alert(`Incorrect:( You have a score of ${points} points`);
        }
    }

    if(points >=3){
        alert(`Your final score is ${points}  Yay you did great!`);
    }
    else{
         alert(`Your final score is ${points}  Oof maybe try again?`);
    }
}
function getMessage() {
  console.log('Fetching a random quote.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addQuoteToDom);
}

/** Adds a random quote to the DOM. */
function addQuoteToDom(quote) {
  console.log('Adding quote to dom: ' + quote);

  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}


/*function getData() {
  fetch('/data').then(response => response.json()).then((greeting) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content
    const greetingList = document.getElementById('server-stats-container');
    greetingList.innerHTML = '';
    greetingList.appendChild(
        createListElement('Greeting 1: ' + greeting.Greeting1));
    greetngList.appendChild(
        createListElement('Greeting 2: ' + greeting.Greeting2));
    greetingList.appendChild(
        createListElement('Greeting 3: ' + greeting.Greeting3));
  });
}
*/
/** Creates an <li> element containing text. */
/*function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
*/

