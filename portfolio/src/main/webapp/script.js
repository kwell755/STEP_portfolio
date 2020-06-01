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
   const correct_answers = ['b','a','b','c'] ;
   const questions= ['Which hackathon did my team take home our first win? \n a-Google b-Amazon Games c-Bison Hacks','Where am I from? \n a-Buffalo b-NYC c-LA','Out of these places, which one do I want to travel to the most? \n a-Utah b-Italy c-France','In which one of these orgs do I hold a E-Board position? \n a-Student Council b-NSBE c-ACM'];
   var points = 0;
   var user_ans;
    
    for(i=0;i< questions.length;i++){
        user_ans = prompt(questions[i], "???");
        if(user_ans==correct_answers[i]){
            points+=1;
            alert('Correct! You have a score of '+points+' points');
        }
        else{
             alert('Incorrect:( You have a score of '+points+' points');
        }
    }

    if(points >=3){
        alert('Your final score is ' + points + ' Yay you did great!');
    }
    else{
         alert('Your final score is ' + points + ' Oof maybe try again?');
    }
}