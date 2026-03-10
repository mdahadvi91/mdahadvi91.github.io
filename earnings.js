import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const earningBox = document.getElementById("earningStats");

let totalCoins = 0;
let totalGifts = 0;
let withdrawBalance = 0;


// LOAD EARNINGS

async function loadEarnings(){

if(!earningBox) return;

earningBox.innerHTML="Loading earnings...";

try{

const q = query(
collection(db,"gifts"),
orderBy("time","desc")
);

const snap = await getDocs(q);

totalCoins = 0;
totalGifts = 0;

snap.forEach(doc=>{

const data = doc.data();

totalCoins += data.coins || 0;

totalGifts++;

});

withdrawBalance = totalCoins * 0.01;

showStats();

}catch(e){

console.log("Earnings error:",e);

}

}


// SHOW STATS

function showStats(){

earningBox.innerHTML = `

<div>Total Gifts : ${totalGifts}</div>
<div>Total Coins : ${totalCoins}</div>
<div>Balance : $${withdrawBalance.toFixed(2)}</div>

`;

}


// WITHDRAW SYSTEM

const withdrawBtn = document.getElementById("withdrawBtn");

function withdraw(){

if(withdrawBalance < 10){

alert("Minimum withdraw $10");

return;

}

alert("Withdraw request sent");

withdrawBalance = 0;

showStats();

}


// BUTTON EVENT

withdrawBtn?.addEventListener("click",withdraw);


// DAILY BONUS SYSTEM

let dailyBonus = false;

function claimDaily(){

if(dailyBonus){

alert("Bonus already claimed");

return;

}

totalCoins += 20;

dailyBonus = true;

showStats();

}

const bonusBtn = document.getElementById("dailyBonusBtn");

bonusBtn?.addEventListener("click",claimDaily);


// LOCAL SAVE

function saveEarningLocal(){

localStorage.setItem("earnCoins",totalCoins);

}

function loadEarningLocal(){

const saved = localStorage.getItem("earnCoins");

if(saved){

totalCoins = Number(saved);

}

}

withdrawBtn?.addEventListener("click",saveEarningLocal);

loadEarningLocal();


// ANALYTICS

let withdrawCount=0;

withdrawBtn?.addEventListener("click",()=>{

withdrawCount++;

console.log("Withdraw requests:",withdrawCount);

});


loadEarnings();
