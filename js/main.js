function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}

var myEfficientCheckScrollReveal = debounce(function() {
	checkScrollReveal(window.scrollY);
}, 10);

window.addEventListener('scroll', myEfficientCheckScrollReveal);

var whenScrolledTo = [];

whenScrolledTo.push({
	el: document.querySelector('.promises'),
	cb: function(el){
		el.classList = "promises active";
	},
	tr: 200
});
whenScrolledTo.push({
	el: document.querySelector('.skills-area'),
	cb: function(el){
		el.classList = "skills-area active";
	},
	tr: 300
});
whenScrolledTo.push({
	el: document.querySelector('.showcase'),
	cb: function(el){
		el.classList = "showcase active";
	},
	tr: 300
});

function checkScrollReveal(y){
	for(var i = 0; i < whenScrolledTo.length; i++){
		var el = whenScrolledTo[i].el;
		var tolerance = whenScrolledTo[i].tr || 0;
		if((y + window.innerHeight - tolerance) > el.offsetTop){
			whenScrolledTo[i].cb(el);
			whenScrolledTo.splice(i, 1);
			if(whenScrolledTo.length < 1){
				window.removeEventListener('scroll');
			}
		}
	}
}

var modal = document.querySelector('.modal');
var modalImg = document.querySelector('.modalimg');
function mod(i){
	modal.classList = "modal active";
	modalImg.src = "img/projects/" + i + ".jpg";
}
modal.onclick = function(){
	this.classList = "modal";
}