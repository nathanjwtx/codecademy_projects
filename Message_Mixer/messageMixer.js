const MessageMixer = {};

let countCharacter = function(inputString, inputCharacter) {
    let count = 0;
    let string = inputString.toLowerCase();
    let character = inputCharacter.toLowerCase();
    for (let i = 0; i < string.length; i++) {
        if (string[i] === character) {
            count++;
        }
    }
    return count; 
}
  
let capitalizeFirstCharacterOfWords = (string) => {
    let arr = string.split(" ");
    for (let i = 0; i < arr.length; i++) {  
        let word = arr[i];
        arr[i] = word[0].toUpperCase() + word.substring(1); 
    }
    return arr.join(" "); 
}

let reverseWord = (word) => {
    return word.split("").reverse().join("");
};

let reverseAllWords = (sentence) => {
    let words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = reverseWord(words[i]);
    }
    return words.join(" ");
};


let replaceFirstOccurence = (string, toBeReplaced, replaceWith) => {
    return string.replace(toBeReplaced, replaceWith);
};


let replaceAllOccurrences = (string, toBeReplaced, replaceWith) => {
    return string.split(toBeReplaced).join(replaceWith);
};

let encode = (string) => {
    let replacementObject = { "a": "@", "s": "$", "i": "!", "o":"0" };
    for (let key in replacementObject) {
        string = replaceAllOccurrences(string, key, replacementObject[key]); 
    }	
    return string;
};

let palindrome = (str) => {
    return `${str} ${reverseWord(str)}`;
};

let pigLatin = (sentence, character) => {
    return `${sentence.split(" ").join(character + " ")}`;
}
// module.exports = MessageMixer;
// export default MessageMixer;
export { countCharacter, capitalizeFirstCharacterOfWords, reverseWord, 
    reverseAllWords, replaceFirstOccurence, replaceAllOccurrences, encode,
    palindrome, pigLatin };

// console.log(MessageMixer.pigLatin("nathan waterman", "#"));

