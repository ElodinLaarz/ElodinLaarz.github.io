// // import {five_dict} from "./five_word_dictionary_list.js"
// import { sign } from "crypto";
// import { cp } from "fs";
// import { start } from "repl";
import { five_letter_dic, wordSuggestions, alphabet } from "./helprFunctions.js";
// import {}
let cur_dic = [...five_letter_dic];
// let prev_dic : string[] = [];
const WORD_LENGTH = 5;
const root = document.querySelector("#app");
if (root) {
    root.innerHTML = `<div class="navbar">
        <div class="container">
            <a class="battlLogo" href="wordlBattl.html">Wordl<span>Battl</span></a>

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
            <div class="container boards">
                <section class="player-board container">
                    <h2 id="player-score">Your Board</h2>
                    <table>
                        <tbody class=game-rows>
                        </tbody>
                    </table>
                    <div class="container" id="buttons">
                        <button id="submit">Submit</button>
                        <button id="reset">Give Up</button>
                    </div>
                </section>

                <section class="chat-box">
                    <section class="scroll">
                    </section>
                    <button id="start">Start!</button>
                </section>
                
                <section class="computer-board container">
                    <h2 id="computer-score">Computer Board</h2>
                    <table>
                        <tbody class=game-rows>
                        </tbody>
                    </table>
                    <p role="alert">&nbsp;</p>
                </section>
            </div>
        </div>`;
}
let num_rows = 6;
let player_cur_row_index = 0;
let cpu_cur_row_index = 0;
let word = "";
let computer_word = "";
let secret_word;
let chat_box = document.getElementsByClassName("scroll")[0];
let player_score = document.getElementById("player-score");
let player_score_value = 0;
let computer_score = document.getElementById("computer-score");
let computer_score_value = 0;
let cpu_difficulty = 0;
const start_button = document.getElementById("start");
const submit_button = document.getElementById("submit");
const reset_button = document.getElementById("reset");
let player_cur_row;
let computer_cur_row;
resetAll();
function resetAll(reset_dic = false) {
    if (reset_dic) {
        if (start_button) {
            start_button.style.display = "inline";
        }
        if (reset_button) {
            reset_button.style.display = "inline";
            reset_button.onclick = function () {
                endGame(true);
                // resetAll();
            };
        }
        if (submit_button) {
            submit_button.onclick = function () {
                if (wordSubmit(word) != "") {
                    computerGuess();
                }
            };
            submit_button.style.display = "inline";
        }
        chat_box.innerHTML = `Play Wordl against a computer opponent!<br><br>
        Guess a secret 5-letter word by typing a guess and then pressing submit!<br>
        If your guess has a correct letter in the right place, it will be higlighted in green;
        if instead you guess a correct letter but it's in the wrong place, it will be highlighted in yellow.
        If the letter background turns black, then that letter is not in the word!<br><br>
        
        See if you can guess the word before the computer does!`;
        reset_dic = false;
        player_cur_row_index = 0;
        cpu_cur_row_index = 0;
        cur_dic = five_letter_dic;
        let player_game_rows = document.getElementsByClassName('game-rows')[0];
        if (player_game_rows) {
            player_game_rows.innerHTML = `<tr class="player-cur-row">
                <td class="row-letter">T</td>
                <td class="row-letter">Y</td>
                <td class="row-letter">P</td>
                <td class="row-letter">E</td>
                <td class="row-letter">!</td>
            </tr>`;
            for (let i = 0; i < num_rows - 1; i++) {
                player_game_rows.innerHTML += `<tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>`;
            }
        }
        let computer_game_rows = document.getElementsByClassName('game-rows')[1];
        if (computer_game_rows) {
            computer_game_rows.innerHTML = `<tr class="computer-cur-row">
                <td class="row-letter"></td>
                <td class="row-letter"></td>
                <td class="row-letter"></td>
                <td class="row-letter"></td>
                <td class="row-letter"></td>
            </tr>`;
            for (let i = 0; i < num_rows - 1; i++) {
                computer_game_rows.innerHTML += `<tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>`;
            }
        }
        player_cur_row = document.getElementsByClassName("player-cur-row")[0];
        computer_cur_row = document.getElementsByClassName("computer-cur-row")[0];
    }
    else {
        if (start_button) {
            start_button.style.display = "inline";
        }
        if (reset_button) {
            reset_button.style.display = "none";
        }
        if (submit_button) {
            submit_button.style.display = "none";
        }
        chat_box.innerHTML = `Play Wordl against a computer opponent!<br><br>
        Guess a secret 5-letter word by typing a guess and then pressing submit!<br>
        If your guess has a correct letter in the right place, it will be higlighted in green;
        if instead you guess a correct letter but it's in the wrong place, it will be highlighted in yellow.
        If the letter background turns black, then that letter is not in the word!<br><br>
        
        See if you can guess the word before the computer does!`;
        let player_game_rows = document.getElementsByClassName('game-rows')[0];
        if (player_game_rows) {
            player_game_rows.innerHTML = ``;
            for (let i = 0; i < num_rows; i++) {
                player_game_rows.innerHTML += `<tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>`;
            }
        }
        let computer_game_rows = document.getElementsByClassName('game-rows')[1];
        if (computer_game_rows) {
            computer_game_rows.innerHTML = `<tr class="computer-cur-row">
                <td class="row-letter" id="0"></td>
                <td class="row-letter" id="1"></td>
                <td class="row-letter" id="2"></td>
                <td class="row-letter" id="3"></td>
                <td class="row-letter" id="4"></td>
            </tr>`;
            for (let i = 0; i < num_rows - 1; i++) {
                computer_game_rows.innerHTML += `<tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>`;
            }
        }
    }
    word = "";
}
// const rows = root?.getElementsByClassName("row");
if (start_button) {
    start_button.onclick = startGame;
}
function startGame() {
    resetAll(true);
    document.addEventListener('keydown', logKey);
    document.addEventListener('keypress', addToWord);
    secret_word = five_letter_dic[Math.floor(Math.random() * five_letter_dic.length)];
    console.log(secret_word);
    if (start_button) {
        start_button.style.display = "none";
    }
    if (chat_box) {
        chat_box.innerHTML = "The game has begun! It's your turn to guess-- start typing!";
    }
    updateScore();
}
// These two functions keep track of the word that is being typed.
function addToWord(e) {
    if (word.length < WORD_LENGTH && (/[a-zA-Z]/).test(e.key) && e.key.length == 1) {
        word += e.key;
    }
    printWord();
}
function logKey(e) {
    // console.log(e);
    // console.log(word);
    if (e.key == "Backspace" && word.length > 0) {
        word = word.slice(0, word.length - 1);
    }
    else if (word.length == WORD_LENGTH && e.key == "Enter") {
        submit_button === null || submit_button === void 0 ? void 0 : submit_button.click();
    }
    printWord();
}
function printWord() {
    if (player_cur_row) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (i < word.length) {
                player_cur_row.children[i].innerHTML = word[i].toUpperCase();
            }
            else {
                player_cur_row.children[i].innerHTML = '';
            }
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function flash() {
    if (player_cur_row) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            colorBox(i, "red");
            sleep(50).then(() => {
                colorBox(i, "#787D7A");
            });
        }
    }
}
function colorBox(index, color, is_cpu = false) {
    let letter_box;
    if (!is_cpu) {
        letter_box = player_cur_row.children[index];
    }
    else {
        letter_box = computer_cur_row.children[index];
    }
    if (letter_box instanceof HTMLElement) {
        letter_box.style.background = color;
    }
}
function replaceAt(s, index, character) {
    return s.substring(0, index) + character + s.substring(index + 1);
}
function wordSubmit(word_to_check, is_cpu = false) {
    let colors = "";
    if (!is_cpu) {
        if (word_to_check.length < WORD_LENGTH) {
            flash();
            if (chat_box) {
                chat_box.innerHTML = "Whoops! Finish entering a word, first!";
            }
        }
        else if (!five_letter_dic.includes(word_to_check)) {
            flash();
            if (chat_box) {
                chat_box.innerHTML = "Hmmm... I don't think that \"" + word.toUpperCase() +
                    "\" is a word... So, it can't be the secret word!";
            }
        }
        else {
            colors = "BBBBB";
            // note the number of occurences of each letter in the word
            // used to tell if a letter should be black/yellow if it has
            // already been seen
            let secret_dic_count = {};
            alphabet.forEach(function (elem) {
                secret_dic_count[elem] = 0;
            });
            for (let i = 0; i < secret_word.length; i++) {
                secret_dic_count[secret_word[i]]++;
                if (word_to_check[i] == secret_word[i]) {
                    // make it green
                    secret_dic_count[secret_word[i]]--;
                    colorBox(i, "#07B73B");
                    replaceAt(colors, i, 'G');
                }
            }
            let guess_is_correct = true;
            for (let i = 0; i < secret_word.length; i++) {
                if (word_to_check[i] == secret_word[i]) {
                    // make it green
                    // colorBox(i, "#07B73B");
                }
                else if (secret_word.includes(word_to_check[i]) && --secret_dic_count[word_to_check[i]] >= 0) {
                    // make it yellow
                    guess_is_correct = false;
                    colorBox(i, "#C7C706");
                    replaceAt(colors, i, 'Y');
                }
                else {
                    // make it black
                    guess_is_correct = false;
                    colorBox(i, "black");
                }
            }
            if (guess_is_correct) {
                endGame();
                // Empty return stops computer from going after you.
                return "";
            }
            let game_rows = document.getElementsByClassName("game-rows")[0];
            if (game_rows) {
                let prev_row = game_rows.children[player_cur_row_index];
                prev_row.classList.add("row");
                prev_row.classList.remove("player-cur-row");
                for (let i = 0; i < WORD_LENGTH; i++) {
                    prev_row.children[i].removeAttribute('id');
                }
                if (player_cur_row_index + 1 < num_rows) {
                    let new_row = game_rows.children[player_cur_row_index + 1];
                    player_cur_row = new_row;
                    new_row.classList.remove("row");
                    new_row.classList.add("player-cur-row");
                    for (let i = 0; i < WORD_LENGTH; i++) {
                        new_row.children[i].setAttribute('id', String(i));
                    }
                }
                else {
                    endGame();
                    // return "end";
                }
                player_cur_row_index++;
                word = "";
                // resetAll();
            }
        }
    }
    else {
        // console.log("the computer guessed " + word_to_check);
        colors = "BBBBB";
        // note the number of occurences of each letter in the word
        // used to tell if a letter should be black/yellow if it has
        // already been seen
        let secret_dic_count = {};
        alphabet.forEach(function (elem) {
            secret_dic_count[elem] = 0;
        });
        for (let i = 0; i < secret_word.length; i++) {
            secret_dic_count[secret_word[i]]++;
            if (word_to_check[i] == secret_word[i]) {
                // make it green
                secret_dic_count[secret_word[i]]--;
                colors = replaceAt(colors, i, 'G');
            }
        }
        let guess_is_correct = true;
        for (let i = 0; i < secret_word.length; i++) {
            if (word_to_check[i] == secret_word[i]) {
                replaceAt(colors, i, 'G');
                colorBox(i, "#07B73B", true);
            }
            else if (secret_word.includes(word_to_check[i]) && --secret_dic_count[word_to_check[i]] >= 0) {
                // make it yellow
                guess_is_correct = false;
                colors = replaceAt(colors, i, 'Y');
                colorBox(i, "#C7C706", true);
            }
            else {
                // make it black
                guess_is_correct = false;
                colorBox(i, "black", true);
            }
        }
        if (guess_is_correct) {
            endGame();
        }
        // computer update
        let game_rows = document.getElementsByClassName("game-rows")[1];
        if (game_rows) {
            let prev_row = game_rows.children[cpu_cur_row_index];
            for (let i = 0; i < prev_row.children.length; i++) {
                prev_row.children[i].innerHTML = word_to_check[i].toUpperCase();
            }
            prev_row.classList.add("row");
            prev_row.classList.remove("computer-cur-row");
            if (cpu_cur_row_index + 1 < num_rows) {
                let new_row = game_rows.children[cpu_cur_row_index + 1];
                computer_cur_row = new_row;
                new_row.classList.remove("row");
                new_row.classList.add("computer-cur-row");
            }
            else {
                endGame();
            }
            cpu_cur_row_index++;
            // word = "";
            // resetAll();
        }
    }
    return colors;
}
function computerGuess() {
    computer_word = cur_dic[Math.floor(Math.random() * cur_dic.length)];
    cur_dic = wordSuggestions(computer_word, wordSubmit(computer_word, true), cur_dic);
}
function updateScore() {
    if (player_score) {
        player_score.innerHTML = "Your Board - Score " + player_score_value;
    }
    if (computer_score) {
        computer_score.innerHTML = "Computer Board - Score " + computer_score_value;
    }
}
function endGame(give_up = false) {
    document.removeEventListener('keydown', logKey);
    document.removeEventListener('keypress', addToWord);
    if (reset_button) {
        reset_button.onclick = function () { };
    }
    if (submit_button) {
        submit_button.onclick = function () { };
    }
    if (word == secret_word) {
        player_score_value++;
        updateScore();
        if (chat_box) {
            chat_box.innerHTML = "That's right! You got the point!";
        }
    }
    else if (computer_word == secret_word || give_up) {
        computer_score_value++;
        updateScore();
        if (chat_box) {
            chat_box.innerHTML = "Oh, tough luck. Guessing \"" + secret_word.toUpperCase() + "\" was difficult!<br><br>" +
                "The computer gets the point this time!";
        }
    }
    else {
        if (chat_box) {
            chat_box.innerHTML = "Woah! That was a toughie. I'll let you in on the secret. The word was \"" + secret_word + "\"!";
        }
    }
    if (start_button) {
        start_button.style.display = "inline";
        start_button.innerHTML = "Next Word!";
    }
}
//# sourceMappingURL=wordlBattl.js.map