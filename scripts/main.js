var getParentByClassName = function (element, className) {
	while (!element.classList.contains(className)) element = element.parentElement;
	return element;
};

var toggleStyle = function (element, style) {
	event.stopPropagation();
	var elements = document.getElementsByClassName(element);
	var length;
	if (elements && (length = elements.length)) {
		for (var i = 0; i < length; i++) {
			var classes = elements[i].classList;
			if (classes.contains(style)) classes.remove(style);
			else classes.add(style);
		}
	}
};

var toggleNavigation = function () {
	toggleStyle('page', 'expand');
};

var toggleLeftPane = function () {
	toggleStyle('left-pane', 'collapse');
};

var hideView = function (event) {
	event.stopPropagation();
	var style = 'hidden';
	var classes = getParentByClassName(event.target, 'view').classList;
	if (!classes.contains(style)) classes.add(style);
};

var showViews = function () {
	toggleStyle('view', 'hidden');
};

var init = function () {
	var burgers = document.getElementsByClassName('burger');
	if (burgers && burgers.length) burgers[0].addEventListener('click', toggleNavigation);

	var leftPanes = document.getElementsByClassName('left-pane');
	if (leftPanes && leftPanes.length) leftPanes[0].addEventListener('click', toggleLeftPane);

	var views = document.getElementsByClassName('view');
	var length;
	if (views && (length = views.length)) {
		for (var i = 0; i < length; i++) views[i].addEventListener('click', hideView);

		var contents = document.getElementsByClassName('content');
		if (contents && contents.length) contents[0].addEventListener('click', showViews);
	}
};
