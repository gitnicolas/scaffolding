var toggleNavigation = function () {
	var expand = 'expand';
	var pages = document.getElementsByClassName('page');
	if (pages && pages.length) {
		var classes = pages[0].classList;
		if (classes.contains(expand)) classes.remove(expand);
		else classes.add(expand);
	}
};

var init = function () {
	var burgers = document.getElementsByClassName('burger');
	if (burgers && burgers.length) burgers[0].addEventListener('click', toggleNavigation);
};
