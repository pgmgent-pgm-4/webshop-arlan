let price = 0;
const loginModal = document.querySelector('.loginModal');
const registerModal = document.querySelector('.registerModal');

const openRegisterModal = () => {
 loginModal.style.display = 'none';
 registerModal.style.display = 'block';
}

const openModal = () => {
 loginModal.style.display = 'block';
}

const closeLogin = () => {
 loginModal.style.display = 'none';
 registerModal.style.display = 'none';
}

const buyClickHandler = (amount) => {
 price += amount;
 document.querySelector('.buyAmount').innerHTML = price;
 document.querySelector('.buyAmount').dataset.id = price;
};

const resetPrice = (amount) => {
 document.querySelector('.buyAmount').innerHTML = 0;
 document.querySelector('.buyAmount').dataset.id = 0;
 price = 0;
};

const makeFavorite = () => {
 console.log('wollah')
}

const pageReady = () => {
 if (localStorage.getItem('UserId')) {
  let userId = localStorage.getItem('UserId');
  let profileIcon = document.getElementById('profileIcon');
  profileIcon.classList.remove('hidden');
  profileIcon.setAttribute('href', `/profile/${userId}`)
  document.getElementById('loginText').classList.add('hidden');
 };
}

document.addEventListener('DOMCContentLoaded', pageReady())

const handleLogin = async () => {
 let username = document.getElementById('username').value;
 let password = document.getElementById('password').value;
 const data = await fetch(`http://localhost:8080/api/login`, {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
   username: username,
   password: password
  })
 });
 const { user } = await data.json();
 localStorage.removeItem('UserId');
 console.log(user);
 localStorage.setItem('UserId', user.id);
 window.location.replace('/');
};

const handleRegister = async () => {
 let username = document.getElementById('registerUsername').value;
 let password = document.getElementById('registerPassword').value;
 let email = document.getElementById('registerEmail').value;
 const data = await fetch(`http://localhost:8080/api/register`, {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
   user: {
    username: username,
    password: password,
    email: email,
   }
  })
 });
 const response = await data.json();
 console.log(response);
}

const handleSubmit = async (currentPrice) => {
 const currentUser = Number(localStorage.getItem('UserId'));
 const data = await fetch(`http://localhost:8080/api/orders`, {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
   date: Date.now(),
   price: price,
   order_value: price / currentPrice,
   status: 'pending',
   UserId: currentUser
  })
 });
 const response = await data.json();
 let existingEntries = JSON.parse(localStorage.getItem('ShoppingCart'));
 if (existingEntries == null) existingEntries = [];
 let entry = response;
 existingEntries.push(entry);
 localStorage.setItem('ShoppingCart', JSON.stringify(existingEntries));
 return false
}


gsap.set(".ticker", { y: 0 });

let boxWidth = 200,
 totalWidth = boxWidth * 30, //  * n of boxes
 no01 = document.querySelectorAll(".ticker__data--item"),
 dirFromLeft = "+=" + totalWidth,
 dirFromRight = "-=" + totalWidth;

const mod = gsap.utils.wrap(0, totalWidth);

const marquee = (which, time, direction) => {
 gsap.set(which, {
  x: function (i) {
   return i * boxWidth;
  }
 });
 let action = gsap.timeline().to(which, {
  x: direction,
  modifiers: {
   x: (x) => mod(parseFloat(x)) + "px"
  },
  duration: time,
  ease: "none",
  repeat: -1
 });
 return action;
};

let master = gsap
 .timeline()
 .add(marquee(no01, 50, dirFromRight), 1)

// =============================

if (window.location.pathname === '/') {
 let next = document.getElementById('slideNext');
 next.onclick = function () {
  var container = document.getElementById('cards__container');
  sideScroll(container, 'right', 30, 400, 50);
 };

 let back = document.getElementById('slideBack');
 back.onclick = function () {
  var container = document.getElementById('cards__container');
  sideScroll(container, 'left', 30, 400, 50);
 };

 function sideScroll(element, direction, speed, distance, step) {
  scrollAmount = 0;
  var slideTimer = setInterval(function () {
   if (direction == 'left') {
    element.scrollLeft -= step;
   } else {
    element.scrollLeft += step;
   }
   scrollAmount += step;
   if (scrollAmount >= distance) {
    window.clearInterval(slideTimer);
   }
  }, speed);
 }
}
