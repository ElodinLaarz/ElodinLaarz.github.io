// import {five_dict} from "./five_word_dictionary_list.js"
import { five_letter_dic, wordSuggestions } from "./helprFunctions.js";
// import {}
let cur_dic = [...five_letter_dic];
let prev_dic = [];
const WORD_LENGTH = 5;
const root = document.querySelector("#app");
if (root) {
    root.innerHTML = `<div class="navbar">
        <div class="container">
            <a class="helprLogo" href="wordlHelpr.html">Wordl<span>Helpr</span></a>

            <nav>
                <ul class="primary-nav">
                    <li><a class="helpr" href="wordlHelpr.html">Wordl<span>Helpr</span></a></li>
                    <li><a class="battl" href="wordlBattl.html">Wordl<span>Battl</span></a></li>
                </ul>
                <ul class="secondary-nav">
                    <li><a class="home" href="index.html">Main Site</a></li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="game">
        <section class="player-board">
            <h2>Your Board</h2>
            <table>
                <tbody class=game-rows>
                    <tr class="cur-row">
                        <td class="row-letter" id="0">T</td>
                        <td class="row-letter" id="1">Y</td>
                        <td class="row-letter" id="2">P</td>
                        <td class="row-letter" id="3">E</td>
                        <td class="row-letter" id="4">!</td>
                    </tr>
                    <tr class="row">
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                    </tr>
                    <tr class="row">
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                    </tr>
                    <tr class="row">
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                    </tr>
                    <tr class="row">
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                    </tr>
                    <tr class="row">
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                        <td class="row-letter"></td>
                    </tr>
                </tbody>
            </table>
            <p role="alert">&nbsp;</p>
            <button id="submit" onclick="wordSubmit()">Submit</button>
        </section>
        <section class="chat-box">
           Please enter the word that you guessed, and the click on the individual letters to change their color. As a reminder,
           GREEN means right letter in the right place; YELLOW means right letter in the wrong place; and GRAY means this letter isn't 
           in the word.

           Once you've entered your word and the colors, press submit!
        </section>
        </div>`;
}
let cur_row_index = 0;
let cur_row = root === null || root === void 0 ? void 0 : root.getElementsByClassName("cur-row")[0];
const rows = root === null || root === void 0 ? void 0 : root.getElementsByClassName("row");
const submit_button = document.getElementById("submit");
// console.log(submit_button);
// SUBMIT IS NOT WORKING :'(
// console.log('run?');
if (submit_button) {
    console.log('submit!');
    submit_button.onclick = wordSubmit;
}
// Keep track of the color of the letter boxes
let cur_color_indices = new Array(WORD_LENGTH).fill(0);
;
let word = "";
resetAll();
function resetAll(reset_dic = false) {
    if (reset_dic) {
        cur_dic = five_letter_dic;
    }
    word = "";
    cur_row = document.getElementsByClassName("cur-row")[0];
    // Set the on-click event for the letter boxes to change their colors.
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (cur_row) {
            let letter_boxes = Array.from(cur_row.children);
            letter_boxes.forEach(function (element) {
                if (element instanceof HTMLElement) {
                    element.onclick = function () { colorChange(element.id); };
                    // console.log(element);
                }
            });
        }
    }
}
function colorChange(id) {
    // There are three colors to choose from
    let color_num = 3;
    let letter_box = document.getElementById(id);
    let index = parseInt(id);
    if (letter_box) {
        let bodyStyles = window.getComputedStyle(document.body);
        if (cur_color_indices[index] == 0) {
            letter_box.style.background = bodyStyles.getPropertyValue('--secondary-helpr-color');
        }
        else if (cur_color_indices[index] == 1) {
            letter_box.style.background = bodyStyles.getPropertyValue('--primary-wordl-color');
        }
        else {
            letter_box.style.background = bodyStyles.getPropertyValue('--empty-letter-box-color');
        }
        cur_color_indices[index] = (cur_color_indices[index] + 1) % color_num;
    }
}
document.addEventListener('keydown', logKey);
document.addEventListener('keypress', addToWord);
// These two functions keep track of the word that is being typed.
function addToWord(e) {
    if (word.length < WORD_LENGTH) {
        word += e.key;
    }
    printWord();
}
function logKey(e) {
    if (e.key == "Backspace" && word.length > 0) {
        word = word.slice(0, word.length - 1);
    }
    printWord();
}
function printWord() {
    if (cur_row) {
        const row = cur_row;
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (i < word.length) {
                row.children[i].innerHTML = word[i].toUpperCase();
            }
            else {
                row.children[i].innerHTML = '';
            }
        }
    }
}
function wordSubmit() {
    // This is terrible, I know, but... Just gonna hard-code in the rgb
    // values for the three colors we have...
    // rgb(120, 125, 122) -- Gray
    // rgb(199, 199, 6) -- Yellow
    // rgb(7, 183, 59) -- Green
    prev_dic = [...cur_dic];
    let colors = '';
    if (cur_row) {
        let letter_boxes = Array.from(cur_row.children);
        letter_boxes.forEach(function (element) {
            if (element instanceof HTMLElement) {
                let s = getComputedStyle(element);
                if (s.background == "rgb(7, 183, 59) none repeat scroll 0% 0% / auto padding-box border-box") {
                    // Green
                    colors += 'G';
                }
                else if (s.background == "rgb(199, 199, 6) none repeat scroll 0% 0% / auto padding-box border-box") {
                    // Yellow
                    colors += 'Y';
                }
                else {
                    // "Black" (Gray)
                    colors += 'B';
                }
            }
        });
    }
    cur_dic = wordSuggestions(word, colors, cur_dic);
    let chat_box = document.getElementsByClassName("chat-box")[0];
    chat_box.innerHTML = "";
    cur_dic.forEach(function (entry) {
        if (chat_box) {
            chat_box.innerHTML += entry + ", ";
        }
    });
    console.log(cur_dic);
    let game_rows = document.getElementsByClassName("game-rows")[0];
    if (game_rows) {
        if (cur_row) {
            console.log(cur_row.children);
        }
        let prev_row = game_rows.children[cur_row_index];
        // This is bad and is going to go out of bounds please fix later I'm sleepy
        let new_row = game_rows.children[cur_row_index + 1];
        prev_row.classList.add("row");
        prev_row.classList.remove("cur-row");
        new_row.classList.remove("row");
        new_row.classList.add("cur-row");
        for (let i = 0; i < WORD_LENGTH; i++) {
            prev_row.children[i].removeAttribute('id');
            new_row.children[i].setAttribute('id', String(i));
        }
        cur_row_index++;
        resetAll();
    }
}
//# sourceMappingURL=wordlHelpr.js.map