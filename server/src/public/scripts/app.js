let price = 0;
const modal = document.querySelector('.modal');

const openModal = () => {
    modal.style.display = 'block';
}

const closeLogin = () => {
    modal.style.display = 'none';
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

const handleLogin = async () => {
 let email = document.getElementById('email-address'); 
 console.log(email.value)
}

const handleSubmit = async (currentPrice) => {
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
   UserId: 5
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

function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}
