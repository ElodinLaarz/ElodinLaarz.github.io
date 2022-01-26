// import {five_dict} from "./five_word_dictionary_list.js"
import {five_letter_dic, wordScore, wordSuggestions} from "./helprFunctions.js"
// import {}

let cur_dic = [...five_letter_dic];
let prev_dic = [...five_letter_dic];


const WORD_LENGTH : number = 5;

const root : Element | null = document.querySelector("#app");
if (root){
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
            <table class=game-rows>
                <tbody>
                    <tr class="row">
                        <td class="row-letter" id="r0">L</td>
                        <td class="row-letter" id="r1"></td>
                        <td class="row-letter" id="r2"></td>
                        <td class="row-letter" id="r3"></td>
                        <td class="row-letter" id="r4"></td>
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
            <button id="submit">Submit</button>
        </section>
        <section class="chat-box">
           Please Enter a Wordle Word and Color it.
        </section>
        </div>`;
}
let cur_row : number = 0;
const rows = root?.getElementsByClassName("row");

// Keep track of the color of the letter boxes
let cur_color_indices = new Array(WORD_LENGTH).fill(0);;

let word : string = "";

// Set the on-click event for the letter boxes to change their colors.
for (let i = 0; i < WORD_LENGTH; i++){
    if(rows){
        let letter_boxes = Array.from(rows[cur_row].children);
        letter_boxes.forEach(function(element){
            if (element instanceof HTMLElement){
                element.onclick = function() {colorChange(element.id)};
                // console.log(element);
            }
        })
    }
}

function colorChange(id : string) : void {

    // There are three colors to choose from
    let color_num : number = 3;

    let letter_box : HTMLElement | null = document.getElementById(id);
    let index : number = parseInt(id.slice(id.length-1,id.length));

    if (letter_box){
        let bodyStyles = window.getComputedStyle(document.body);
        if(cur_color_indices[index] == 0){
            letter_box.style.background = bodyStyles.getPropertyValue('--secondary-helpr-color');
        }else if (cur_color_indices[index] == 1){
            letter_box.style.background = bodyStyles.getPropertyValue('--primary-wordl-color');
        }else{
            letter_box.style.background = bodyStyles.getPropertyValue('--empty-letter-box-color');
        }
        cur_color_indices[index] = (cur_color_indices[index] + 1) % color_num;
    }
}

document.addEventListener('keydown',  logKey);
document.addEventListener('keypress', addToWord);

// These two functions keep track of the word that is being typed.
function addToWord(e : KeyboardEvent) : void {

    if (word.length < WORD_LENGTH){
        word += e.key;
    }
    printWord();
}

function logKey(e : KeyboardEvent) : void {
    if (e.key == "Backspace" && word.length > 0){
        word = word.slice(0, word.length -1);
    }
    printWord();
}

function printWord() : void {
    if (rows){
        const row : Element | null = rows[cur_row];
        for (let i = 0 ; i < WORD_LENGTH; i++){
            if (i < word.length){
                row.children[i].innerHTML = word[i].toUpperCase();
            }else{
                row.children[i].innerHTML = '';
            }
        }
    }
}

// console.log(wordSuggestions('words', 'BGBBY'));