let price = 0;
const loginModal = document.querySelector('.loginModal');
const registerModal = document.querySelector('.registerModal');
let shoppingCart = document.querySelector('.shoppingCart');

const capitalizeFirstLetter = (string) => {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

const openCart = () => {
 fillShoppingCartItems();
 shoppingCart.classList.remove('hidden');
 shoppingCart.classList.add('block');
}

const closeCart = () => {
 console.log(shoppingCart);
 shoppingCart.classList.remove('block')
 shoppingCart.classList.add('hidden');
}

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

const resetPrice = () => {
 document.querySelector('.buyAmount').innerHTML = 0;
 document.querySelector('.buyAmount').dataset.id = 0;
 price = 0;
};

const fillShoppingCartItems = () => {
 let shoppingCart = document.getElementById('shoppingCartList');
 let shoppingOrder = JSON.parse(localStorage.getItem('ShoppingCart'));
 let shoppingCartTotalElem = document.getElementById('ShoppingCartTotal');
 let shoppingCartTotal = 0;
 if (shoppingOrder && shoppingOrder.length) {
  let content = shoppingOrder.map(order => {
   shoppingCartTotal += order.price;
   return `<li class="flex items-center py-2 border-b-2 border-gray-400">
   <div class="flex justify-between w-full items-center">
    <div class="flex items-center">
     <div class="w-8 flex items-center">
      <img src="${order.image}" alt="${order.id}"/>
     </div>
     <div>
      <h3 class=" ml-2 text-l">${capitalizeFirstLetter(order.name.toLowerCase())}</h3>
     </div>
    </div>
    <div class="text-right pr-2">
     <h4>€${order.price}</h4>
     <p>${order.order_value.toFixed(6)}</p>
    </div>
   </div>
  </li>`
  }).join('');
  shoppingCart.innerHTML = content;
  shoppingCartTotalElem.innerHTML = `€${shoppingCartTotal}`;
 }
}

const makeFavorite = async (ProductId) => {
 const UserId = Number(localStorage.getItem('UserId'));
 ProductId = ProductId.toUpperCase();
 const response = await fetch('http://localhost:8080/api/favorites', {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
   createdAt: Date.now(),
   updatedAt: Date.now(),
   UserId: UserId,
   ProductId: ProductId,
  })
 });
}

const pageReady = () => {
 if (localStorage.getItem('UserId')) {
  let userId = localStorage.getItem('UserId');
  let profileIcon = document.getElementById('profileIcon');
  profileIcon.classList.remove('hidden');
  profileIcon.setAttribute('href', `/profile/${userId}`)
  document.getElementById('loginText').classList.add('hidden');
 };
};
document.addEventListener('DOMCContentLoaded', pageReady());

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
}

const handleSubmit = async (currentPrice, productName, productImage) => {
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
 entry.name = productName.toUpperCase();
 entry.image = productImage;
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
