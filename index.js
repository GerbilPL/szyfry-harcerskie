// Made with love and hate -; Gabriel Pilch, aka GerbilPL 
// Page Version: 1.1
window.onload=function(){
    document.querySelector("#decrypt").addEventListener("click", decrypt);
    document.querySelector("#encrypt").addEventListener("click", encrypt);
    document.querySelector("#selectcipher").addEventListener("change", setselect);
};

var selectedCipher="gaderypoluki";
var selectedAlphabet=0;

const alphabet = [["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","R","S","Ś","T","U","W","Y","Z","Ź","Ż"],
["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"],
["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","W","Y","Z"]];

const isUC=(x)=>{
    return x==x.toUpperCase();
}

const toUC=(input)=>{
    let out="";
    for(let i=0; i<input.length;i++) {
        out+=input[i].toUpperCase();
    }
    return out;
}

const replaceLetters=(input)=>{
    var output="";
    const switchmap0 = new Map([
        ["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"]
    ]);
    const switchmap1 = new Map([
        ["Q","Ku"],["V","W"],["X","Ks"]
    ]);
    const switchmap2 = new Map([
        ["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"],["Q","Ku"],["V","W"],["X","Ks"]
    ]);
    switch (selectedAlphabet){
        case 0:
            for(let i=0;i<input.length;i++){
                switchmap0.has(input[i].toUpperCase()) ? (output+= isUC(input[i]) ? switchmap0.get(input[i].toUpperCase()): switchmap0.get(input[i].toUpperCase()).toLowerCase()): output+=input[i];
            }
            break;
            
        case 1:
            for(let i=0;i<input.length;i++){
                switchmap1.has(input[i].toUpperCase()) ? (output+= isUC(input[i]) ? switchmap1.get(input[i].toUpperCase()): switchmap1.get(input[i].toUpperCase()).toLowerCase()): output+=input[i];
            }
            break;
            
        case 2:
            for(let i=0;i<input.length;i++){
                output+=input[i];
            }
            break;
            
        case 3:
            for(let i=0;i<input.length;i++){
                switchmap2.has(input[i].toUpperCase()) ? (output+= isUC(input[i]) ? switchmap2.get(input[i].toUpperCase()): switchmap2.get(input[i].toUpperCase()).toLowerCase()): output+=input[i];
            }
            break;

        default:
            for(let i=0;i<input.length;i++){
                output+=input[i];
            }
            break;
    }
    return output;
}

const changeAlphabet=(x)=>{
    selectedAlphabet=x;
    document.querySelector("#selectalphabet").value=x;
}

const decrypt=()=>{
    selectedAlphabet=parseInt(document.querySelector("#selectalphabet").value);
    const inputText=(document.querySelector("#outputbox").value).toString();
    var output="";
    if(selectedCipher=="czekoladka") changeAlphabet(3);
    if(selectedCipher=="morsa") changeAlphabet(0);
    switch (selectedCipher) {
        case "gaderypoluki":
            output=gaderypoluki(inputText);
            break;
                
        case "cezara":
            output=caesar(inputText,0);
                break;
                
        case "morsa":
            output=morse(inputText,0);
                break;
        default:
            output=inputText;
            break;
    }
    document.querySelector("#inputbox").value=output;
}

const encrypt=()=>{
    selectedAlphabet=parseInt(document.querySelector("#selectalphabet").value)
    const inputText=(document.querySelector("#inputbox").value).toString();
    var output="";
    if(selectedCipher=="czekoladka") changeAlphabet(3);
    if(selectedCipher=="morsa") changeAlphabet(0);
    output=replaceLetters(inputText);
    switch (selectedCipher) {
        case "gaderypoluki":
            output=gaderypoluki(output);
            break;
                
        case "cezara":
            output=caesar(output,1);
                break;
                
        case "morsa":
            output=morse(output,1);
                break;
        default:
            break;
    }
    document.querySelector("#outputbox").value=output;
}


const gaderypoluki=(input)=>{
    let output="";
    const gaderypolukimap=new Map([
        ["G","A"],["D","E"],["R","Y"],["P","O"],["L","U"],["K","I"],
        ["A","G"],["E","D"],["Y","R"],["O","P"],["U","L"],["I","K"]
    ]);
    for(let i=0;i<input.length;i++){
        output+=(gaderypolukimap.has(input[i].toUpperCase()) ? (isUC(input[i]) ? gaderypolukimap.get(input[i].toUpperCase()): gaderypolukimap.get(input[i].toUpperCase()).toLowerCase()):input[i])
    }
    return output;
}

const morse=(input,mode)=>{
    let output="";
    input=input.toUpperCase();
    const morsemap = new Map([
        ["A",".-"],["B","-..."],["C","-.-."],["D","-.."],["E","."],["F","..-."],["G","--."],["H","...."],["I",".."],["J",".---"],["K","-.-"],["L",".-.."],["M","--"],["N","-."],["O","---"],["P",".--."],["Q","--.-"],["R",".-."],["S","..."],["T","-"],["U","..-"],["V","...-"],["W",".--"],["X","-..-"],["Y","-.--"],["Z","--.."],
        ["0","-----"],["1",".----"],["2","..---"],["3","...--"],["4","....-"],["5","....."],["6","-...."],["7","--..."],["8","---.."],["9","----."],
        [".",".-.-.-"],[",","--..--"],["?","..--.."],["\'",".----."],["!","-.-.--"],["/","-..-."],["(","-.--."],[")","-.--.-"],["&",".-..."],[":","---..."],[";","-.-.-."],["=","-...-"],["+",".-.-."],["-","-....-"],["_","..--.-"],["\"",".-..-."],["$","...-..-"],["@",".--.-."],[" "," / "], ["\n","\n"],["","!"]
    ]);
    if(mode==1){
        for(let i=0;i<input.length;i++){
            output+=(morsemap.has(input[i]) ? morsemap.get(input[i])+((i+1==input.length)? "":" ") : " ! ")
        }
    }
    else{
        input.split(' ').forEach(element => {
            if(element==="") return;
            if(element==="/") {output+=" "; return;};
            for (let [key,value] of morsemap.entries()) {
                if(element===value) output+=key;
            }
        });
    }
    return output;
}

const caesar=(input, mode)=>{
    var output='';
    alphabet_lenght = alphabet[selectedAlphabet].length-1;
    var key = parseInt(document.querySelector("#ceasarskey").value) % (alphabet_lenght+1);
    if(mode==0) key*=-1;
    for (let i=0;i<input.length;i++){
        let tmp = input[i].toUpperCase();
        let x = alphabet[selectedAlphabet].indexOf(tmp);
        if(x==-1){
            output+=input[i];
        }
        else{
            let y = '';
            key>=0 ? (y=alphabet[selectedAlphabet][(alphabet[selectedAlphabet].indexOf(tmp)+key<=alphabet_lenght ? alphabet[selectedAlphabet].indexOf(tmp)+key:alphabet[selectedAlphabet].indexOf(tmp)+key-alphabet_lenght-1)]):(y=alphabet[selectedAlphabet][(alphabet[selectedAlphabet].indexOf(tmp)+key>=0 ? alphabet[selectedAlphabet].indexOf(tmp)+key:alphabet[selectedAlphabet].indexOf(tmp)+key+alphabet_lenght+1)]);
            output+= isUC(input[i]) ? y:y.toLowerCase();
        }
    }
    return output;
}

const setselect=()=>{
    const selector = document.querySelector("#selectcipher");
    document.querySelector("#outputbox").style.fontFamily=(selector.value=="czekoladka") ? "Chocolate-Cipher": "Arial, Helvetica, sans-serif";
    document.querySelector("#ceasarskeylbl").style.display = (selector.value=="cezara") ? "" : "none";
    document.querySelector("#ceasarskey").style.display = (selector.value=="cezara") ? "" : "none";
    selectedCipher = selector.value.toString();
}