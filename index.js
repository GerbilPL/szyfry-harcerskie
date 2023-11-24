// Made with love and hate -; Gabriel Pilch, aka GerbilPL 
// Page Version: 1.2
const qS=x=>document.querySelector(x);
const rootStyleSet=(n,v)=>qS(':root').style.setProperty(n,v);
const lS = localStorage;
onload=()=>{
    qS("#dec").addEventListener("click", decrypt);
    qS("#enc").addEventListener("click", encrypt);
    qS("#sCipher").addEventListener("change", setselect);
    qS("#pcolor").addEventListener("click", pageColor);
    pageColor(true);
};
const morsemap = new Map([["A",".-"],["B","-..."],["C","-.-."],["D","-.."],["E","."],["F","..-."],["G","--."],["H","...."],["I",".."],["J",".---"],["K","-.-"],["L",".-.."],["M","--"],["N","-."],["O","---"],["P",".--."],["Q","--.-"],["R",".-."],["S","..."],["T","-"],["U","..-"],["V","...-"],["W",".--"],["X","-..-"],["Y","-.--"],["Z","--.."],["0","-----"],["1",".----"],["2","..---"],["3","...--"],["4","....-"],["5","....."],["6","-...."],["7","--..."],["8","---.."],["9","----."],[".",".-.-.-"],[",","--..--"],["?","..--.."],["\'",".----."],["!","-.-.--"],["/","-..-."],["(","-.--."],[")","-.--.-"],["&",".-..."],[":","---..."],[";","-.-.-."],["=","-...-"],["+",".-.-."],["-","-....-"],["_","..--.-"],["\"",".-..-."],["$","...-..-"],["@",".--.-."],[" "," / "], ["\n","\n"],["","!"]]);
const gapmap=new Map([["G","A"],["D","E"],["R","Y"],["P","O"],["L","U"],["K","I"],["A","G"],["E","D"],["Y","R"],["O","P"],["U","L"],["I","K"]]);
const switchmap = [new Map([["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"]]), new Map([["Q","Ku"],["V","W"],["X","Ks"]]), new Map([["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"],["Q","Ku"],["V","W"],["X","Ks"]])];
const alphabet = [["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","R","S","Ś","T","U","W","Y","Z","Ź","Ż"],["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"],["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","W","Y","Z"]];
let sCiph="gap";
let sAlpha=0;
const isUC=x=>x==x.toUpperCase();
const toLC=(i,x)=>isUC(i) ? x:x.toLowerCase();
const chAlpha=x=>qS("#selAlpha").value=sAlpha=x;

const replaceLetters=inp=>{
    let otp='';
    let inl=inp.length;
    let inUC=inp.toUpperCase();
    switch (sAlpha){
        case 0:
            for(let i=0;i<inl;i++) otp+=switchmap[0].has(inUC[i]) ? toLC(inp[i],switchmap[0].get(inUC[i])): inp[i];
            break;
        case 1:
            for(let i=0;i<inl;i++) otp+=switchmap[1].has(inUC[i]) ? toLC(inp[i],switchmap[1].get(inUC[i])): inp[i];
            break;
        case 3:
            for(let i=0;i<inl;i++) otp+=switchmap[2].has(inUC[i]) ? toLC(inp[i],switchmap[2].get(inUC[i])): inp[i];
            break;
        default:
            return inp;
    }
    return otp;
}

const sw=(cOpt, txt, cM)=>{
    switch (cOpt) {
        case "gap":
            return gap(txt);
        case "cea":
            return caesar(txt,cM);
        case "mor":
            return morse(txt,cM);
        default:
            return txt;
    }
}

const decrypt=()=>{
    sAlpha=parseInt(qS("#selAlpha").value);
    let iTxt=(qS("#outbox").value).toString();
    sCiph=="cho" ? chAlpha(3):(sCiph=="mor") ? chAlpha(0):null;
    qS("#inbox").value=sw(sCiph,iTxt,0);
}

const encrypt=()=>{
    sAlpha=parseInt(qS("#selAlpha").value);
    let iTxt=(qS("#inbox").value).toString();
    sCiph=="cho" ? chAlpha(3):(sCiph=="mor") ? chAlpha(0):null;
    qS("#outbox").value=sw(sCiph,replaceLetters(iTxt),1);
}


const gap=inp=>{
    let otp='';
    let inUC=inp.toUpperCase();
    for(let i=0;i<inp.length;i++) otp+=(gapmap.has(inUC[i]) ? toLC(inp[i],gapmap.get(inUC[i])):inp[i]);
    return otp;
}

const morse=(inp, mode)=>{
    let otp='';
    inp=inp.toUpperCase();
    if(mode==1) for(let i=0;i<inp.length;i++) otp+=(morsemap.has(inp[i]) ? morsemap.get(inp[i])+((i+1==inp.length)? "":' ') : " ! ");
    else inp.split(' ').forEach(char => {
            if(char==="") return;
            if(char==="/") {otp+=' '; return;}
            for (let [key,val] of morsemap.entries()) if(char===val) otp+=key;
        });
    return otp;
}

const caesar=(inp, mode)=>{
    let otp='';
    let inUC=inp.toUpperCase();
    let aLen = alphabet[sAlpha].length;
    let key = parseInt(qS("#ceasarskey").value) % aLen;
    if(mode==0) key*=-1;
    for (let i=0;i<inp.length;i++){
        let x = alphabet[sAlpha].indexOf(inUC[i]);
        if(x==-1) otp+=inp[i];
        else{
            let xk = x+key;
            otp+=toLC(inp[i],alphabet[sAlpha][key>=0 ? xk<=aLen-1 ? xk:xk-aLen:xk>=0 ? xk:xk+aLen]);
        }
    }
    return otp;
}

const setselect=()=>{
    let sel = qS("#sCipher");
    qS("#outbox").style.fontFamily=(sel.value=="cho") ? "Chocolate-Cipher, sans-serif": "Arial, Helvetica, sans-serif";
    qS("#ceasarskeylb").style.display = (sel.value=="cea") ? "" : "none";
    qS("#ceasarskey").style.display = (sel.value=="cea") ? "" : "none";
    sCiph = sel.value.toString();
}

const pageColor=(ldr)=>{
    ldr==true ? (lS.getItem("pcolor")==null||lS.getItem("pcolor")=="black") ? lS.setItem("pcolor","black"):lS.setItem("pcolor","white"):(lS.getItem("pcolor")=="black") ? lS.setItem("pcolor","white"): lS.setItem("pcolor","black");
    if(lS.getItem("pcolor")=="black"){
        rootStyleSet('--main-bg-color','#111');
        rootStyleSet('--sub-bg-color','#44444486');
        rootStyleSet('--main-fg-color','#ddd');
        rootStyleSet('--accent-bg-color','#480');
        rootStyleSet('--accent-hover-bg-color','#590');
        qS('h1').style.textShadow="none";
        qS('#ceasarskeylb').style.textShadow="none";
        qS('h2#h21').style.textShadow="none";
        qS('h2#h22').style.textShadow="none";
        qS('label.select-alphabet-lbl').style.textShadow="none";
    } else {
        rootStyleSet('--main-bg-color','#DDD');
        rootStyleSet('--sub-bg-color','#33333346');
        rootStyleSet('--main-fg-color','#FFF');
        rootStyleSet('--accent-bg-color','#555');
        rootStyleSet('--accent-hover-bg-color','#777');
        qS('h1').style.textShadow="1px 1px 8px black";
        qS('#ceasarskeylb').style.textShadow="1px 1px 5px black";
        qS('h2#h21').style.textShadow="1px 1px 5px black";
        qS('h2#h22').style.textShadow="1px 1px 5px black";
        qS('label.select-alphabet-lbl').style.textShadow="1px 1px 5px black";
    }
}