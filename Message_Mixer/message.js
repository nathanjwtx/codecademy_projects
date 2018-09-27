// let MessageMixer = require("./messageMixer.js");
import { countCharacter, capitalizeFirstCharacterOfWords, reverseWord,
    reverseAllWords, replaceAllOccurrences, replaceFirstOccurence,
    encode, palindrome, pigLatin } from "./messageMixer.js";

function displayMessage() {
    console.log(countCharacter("What is the color of the sky?", "t"));
    console.log(capitalizeFirstCharacterOfWords("What is the color of the sky?"));
    console.log(reverseWord("What is the color of the sky?"));
    console.log(reverseAllWords("What is the color of the sky?"));
    console.log(replaceFirstOccurence("What is the color of the sky?", "sky", "water"));
    console.log(encode("What is the color of the sky?"));
    console.log(palindrome("Hello World"));
    console.log(pigLatin("Not sure why this is pig latin", "$"));
}

displayMessage();