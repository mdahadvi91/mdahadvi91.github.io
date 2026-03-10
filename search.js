import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const searchInput = document.getElementById("searchInput");
const userList = document.getElementById("userList");

let users = [];


// LOAD USERS
async function loadUsers(){

const snapshot = await getDocs(collection(db,"users"));

users = [];

snapshot.forEach((doc)=>{

users.push(doc.data());

});

showUsers(users);

}

loadUsers();


// SHOW USERS
function showUsers(list){

userList.innerHTML = "";

list.forEach((user)=>{

const div = document.createElement("div");

div.className = "user-item";

div.innerText = user.name || user.email;

div.onclick = function(){

alert("Open profile feature ready");

};

userList.appendChild(div);

});

}


// SEARCH FILTER
searchInput.oninput = function(){

const text = searchInput.value.toLowerCase();

const filtered = users.filter(u =>

(u.name && u.name.toLowerCase().includes(text)) ||

(u.email && u.email.toLowerCase().includes(text))

);

showUsers(filtered);

};
