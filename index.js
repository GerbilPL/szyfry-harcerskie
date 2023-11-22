// Made with love and hate -; Gabriel Pilch, aka GerbilPL 
// Page Version: 1.2

const rootStyle = document.querySelector(':root').style;
const lS = localStorage;
window.onload=()=>{
    document.querySelector("#decrypt").addEventListener("click", decrypt);
    document.querySelector("#encrypt").addEventListener("click", encrypt);
    document.querySelector("#selectcipher").addEventListener("change", setselect);
    document.querySelector("#pagecolor").addEventListener("click", changepageclr);
    changepageclr(true);
};
const morsemap = new Map([["A",".-"],["B","-..."],["C","-.-."],["D","-.."],["E","."],["F","..-."],["G","--."],["H","...."],["I",".."],["J",".---"],["K","-.-"],["L",".-.."],["M","--"],["N","-."],["O","---"],["P",".--."],["Q","--.-"],["R",".-."],["S","..."],["T","-"],["U","..-"],["V","...-"],["W",".--"],["X","-..-"],["Y","-.--"],["Z","--.."],["0","-----"],["1",".----"],["2","..---"],["3","...--"],["4","....-"],["5","....."],["6","-...."],["7","--..."],["8","---.."],["9","----."],[".",".-.-.-"],[",","--..--"],["?","..--.."],["\'",".----."],["!","-.-.--"],["/","-..-."],["(","-.--."],[")","-.--.-"],["&",".-..."],[":","---..."],[";","-.-.-."],["=","-...-"],["+",".-.-."],["-","-....-"],["_","..--.-"],["\"",".-..-."],["$","...-..-"],["@",".--.-."],[" "," / "], ["\n","\n"],["","!"]]);
const gaderypolukimap=new Map([["G","A"],["D","E"],["R","Y"],["P","O"],["L","U"],["K","I"],["A","G"],["E","D"],["Y","R"],["O","P"],["U","L"],["I","K"]]);
const switchmap0 = new Map([["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"]]);
const switchmap1 = new Map([["Q","Ku"],["V","W"],["X","Ks"]]);
const switchmap2 = new Map([["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"],["Q","Ku"],["V","W"],["X","Ks"]]);
const alphabet = [["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","R","S","Ś","T","U","W","Y","Z","Ź","Ż"],["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"],["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","W","Y","Z"]];
let sCipher="gaderypoluki";
let sAlphabet=0;

const isUC=x=>x==x.toUpperCase();

const replaceLetters=inp=>{
    let otp='';
    let inl=inp.length;
    let iUC=inp.toUpperCase();
    switch (sAlphabet){
        case 0:
            for(let i=0;i<inl;i++) otp+=switchmap0.has(iUC[i]) ? (isUC(inp[i]) ? switchmap0.get(iUC[i]): switchmap0.get(iUC[i]).toLowerCase()): inp[i];
            break;
        case 1:
            for(let i=0;i<inl;i++) otp+=switchmap1.has(iUC[i]) ? (isUC(inp[i]) ? switchmap1.get(iUC[i]): switchmap1.get(iUC[i]).toLowerCase()): inp[i];
            break;
        case 3:
            for(let i=0;i<inl;i++) otp+=switchmap2.has(iUC[i]) ? (isUC(inp[i]) ? switchmap2.get(iUC[i]): switchmap2.get(iUC[i]).toLowerCase()): inp[i];
            break;
        default:
            return inp;
    }
    return otp;
}

const changeAlphabet=x=>document.querySelector("#selectalphabet").value=sAlphabet=x;

const sw=(cOpt, txt, cM)=>{
    switch (cOpt) {
        case "gaderypoluki":
            return gaderypoluki(txt);
        case "cezara":
            return caesar(txt,cM);
        case "morsa":
            return morse(txt,cM);
        default:
            return txt;
    }
}

const decrypt=()=>{
    sAlphabet=parseInt(document.querySelector("#selectalphabet").value);
    let iTxt=(document.querySelector("#outputbox").value).toString();
    sCipher=="czekoladka" ? changeAlphabet(3):(sCipher=="morsa") ? changeAlphabet(0):null;
    document.querySelector("#inputbox").value=sw(sCipher,iTxt,0);
}

const encrypt=()=>{
    sAlphabet=parseInt(document.querySelector("#selectalphabet").value)
    let iTxt=(document.querySelector("#inputbox").value).toString();
    sCipher=="czekoladka" ? changeAlphabet(3):(sCipher=="morsa") ? changeAlphabet(0):null;
    document.querySelector("#outputbox").value=sw(sCipher,replaceLetters(iTxt),1);
}


const gaderypoluki=inp=>{
    let otp='';
    let iUC=inp.toUpperCase();
    for(let i=0;i<inp.length;i++) otp+=(gaderypolukimap.has(iUC[i]) ? (isUC(inp[i]) ? gaderypolukimap.get(iUC[i]): gaderypolukimap.get(iUC[i]).toLowerCase()):inp[i]);
    return otp;
}

const morse=(inp, mode)=>{
    let otp='';
    inp=inp.toUpperCase();
    if(mode==1) for(let i=0;i<inp.length;i++) otp+=(morsemap.has(inp[i]) ? morsemap.get(inp[i])+((i+1==inp.length)? "":' ') : " ! ");
    else inp.split(' ').forEach(element => {
            if(element==="") return;
            if(element==="/") {otp+=' '; return;}
            for (let [key,value] of morsemap.entries()) if(element===value) otp+=key;
        });
    return otp;
}

const caesar=(inp, mode)=>{
    let otp='';
    let iUC=inp.toUpperCase();
    let aLen = alphabet[sAlphabet].length-1;
    let key = parseInt(document.querySelector("#ceasarskey").value) % (aLen+1);
    if(mode==0) key*=-1;
    for (let i=0;i<inp.length;i++){
        let tmp = iUC[i];
        let x = alphabet[sAlphabet].indexOf(tmp);
        if(x==-1) otp+=inp[i];
        else{
            let y = '';
            key>=0 ? (y=alphabet[sAlphabet][(alphabet[sAlphabet].indexOf(tmp)+key<=aLen ? alphabet[sAlphabet].indexOf(tmp)+key:alphabet[sAlphabet].indexOf(tmp)+key-aLen-1)]):(y=alphabet[sAlphabet][(alphabet[sAlphabet].indexOf(tmp)+key>=0 ? alphabet[sAlphabet].indexOf(tmp)+key:alphabet[sAlphabet].indexOf(tmp)+key+aLen+1)]);
            otp+=isUC(inp[i]) ? y:y.toLowerCase();
        }
    }
    return otp;
}

const setselect=()=>{
    let sel = document.querySelector("#selectcipher");
    document.querySelector("#outputbox").style.fontFamily=(sel.value=="czekoladka") ? "Chocolate-Cipher": "Arial, Helvetica, sans-serif";
    document.querySelector("#ceasarskeylbl").style.display = (sel.value=="cezara") ? "" : "none";
    document.querySelector("#ceasarskey").style.display = (sel.value=="cezara") ? "" : "none";
    sCipher = sel.value.toString();
}

const changepageclr=onload=>{
    onload==true ? (lS.getItem("pagecolor")==null||lS.getItem("pagecolor")=="black") ? lS.setItem("pagecolor","black"):lS.setItem("pagecolor","white"):(lS.getItem("pagecolor")=="black") ? lS.setItem("pagecolor","white"): lS.setItem("pagecolor","black");
    if(lS.getItem("pagecolor")=="black"){
        rootStyle.setProperty('--main-bg-color','#111');
        rootStyle.setProperty('--sub-bg-color','#44444486');
        rootStyle.setProperty('--main-fg-color','#ddd');
        rootStyle.setProperty('--accent-bg-color','#480');
        rootStyle.setProperty('--accent-hover-bg-color','#590');
        document.querySelector('h1').style.textShadow="none";
        document.querySelector('#ceasarskeylbl').style.textShadow="none";
        document.querySelector('h2#h21').style.textShadow="none";
        document.querySelector('h2#h22').style.textShadow="none";
        document.querySelector('label.select-alphabet-lbl').style.textShadow="none";
    } else {
        rootStyle.setProperty('--main-bg-color','#DDD');
        rootStyle.setProperty('--sub-bg-color','#33333346');
        rootStyle.setProperty('--main-fg-color','#FFF');
        rootStyle.setProperty('--accent-bg-color','#555');
        rootStyle.setProperty('--accent-hover-bg-color','#777');
        document.querySelector('h1').style.textShadow="1px 1px 8px black";
        document.querySelector('#ceasarskeylbl').style.textShadow="1px 1px 5px black";
        document.querySelector('h2#h21').style.textShadow="1px 1px 5px black";
        document.querySelector('h2#h22').style.textShadow="1px 1px 5px black";
        document.querySelector('label.select-alphabet-lbl').style.textShadow="1px 1px 5px black";
    }
}