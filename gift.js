import { db, auth } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// SEND GIFT FUNCTION
async function sendGift(creatorId, giftType){

const user = auth.currentUser;

if(!user) return;

await addDoc(collection(db,"gifts"),{

from:user.uid,
to:creatorId,
gift:giftType,
time:Date.now()

});

alert("Gift sent 🎁");

}

window.sendGift = sendGift;


// GIFT VALUES
const giftValues = {

coin:1,
rose:5,
diamond:20,
crown:100

};


// CALCULATE EARNINGS
function calculateGiftMoney(gifts){

let total = 0;

gifts.forEach(g=>{

const value = giftValues[g.gift] || 0;

total += value;

});

return total;

}

window.calculateGiftMoney = calculateGiftMoney;
