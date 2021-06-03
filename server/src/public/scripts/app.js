gsap.set(".ticker", { y: 0 });

let boxWidth = 250,
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
	.add(marquee(no01, 30, dirFromLeft), 1)

// =============================
