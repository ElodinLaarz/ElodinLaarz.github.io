"use strict";
let WORD_LENGTH = 5;
let options_to_print = 5;
// Build an array of the letters of the alphabet.
let alphabet = new Array(26);
for (let i = 0; i < alphabet.length; i++) {
    alphabet[i] = String.fromCharCode(i + 97);
}
function wordScore(word, dic) {
    let letter_score = {};
    // for (let i in alphabet){
    //     letter_score[alphabet[i]] = 0;
    // }
    alphabet.forEach(function (l) {
        letter_score[l] = 0;
    });
    for (let index in dic) {
        // console.log(index);
        let cur_word = dic[index];
        for (let char_index = 0; char_index < cur_word.length; char_index++) {
            // console.log(cur_word[char_index]);
            let cur_char = cur_word[char_index];
            letter_score[cur_char]++;
        }
    }
    let score = 0;
    for (let i = 0; i < word.length; i++) {
        score += letter_score[word[i]];
    }
    return score;
}
// console.log(wordScore('abc', ['abc', 'def']));
//# sourceMappingURL=wordScore.js.map