// let amount = parseInt(document.querySelector('.buyAmount').innerHTML);
// console.log(typeof amount);

// document.getElementById('buyOne').addEventListener('click', () => {
// 	amount += 100;
// 	document.querySelector('.buyAmount').innerHTML = amount;
// });

let price = 0;

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
    sideScroll(container,'right',30,400,50);
};

let back = document.getElementById('slideBack');
back.onclick = function () {
    var container = document.getElementById('cards__container');
    sideScroll(container,'left',30,400,50);
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
