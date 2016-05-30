var isMobile = function () {
	return /iPad|iPhone|iPod|Android|Linux arm|BlackBerry|WinCE|Pocket/i.test(navigator.platform);
};

var getParentByClassName = function (element, className) {
	while (element && !element.classList.contains(className)) element = element.parentElement;
	return element;
};

var toggleStyle = function (element, style, event) {
	if (event) event.stopPropagation();
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

var toggleNavigation = function (event) {
	toggleStyle('page', 'expanded', event);
};

var toggleMenu = function (event) {
	toggleStyle('menu', 'hidden', event);
};

var toggleLeftPane = function (event) {
	toggleStyle('left-pane', 'collapsed', event);
};

var hideView = function (event) {
	event.stopPropagation();
	var style = 'hidden';
	var classes = getParentByClassName(event.target, 'view').classList;
	if (!classes.contains(style)) classes.add(style);
};

var showViews = function (event) {
	toggleStyle('view', 'hidden', event);
};

var toggleFloatingAction = function (event) {
	if (document.getElementById('action-floating').classList.contains('pressed')) {
		toggleStyle('action-floating', 'pressed', event);
		setTimeout(function () {
			var elements = document.getElementById('action-floating').children;
			var length = elements.length;
			for (var i = 0; i < length; i++) elements[i].classList.add('hidden');
		}, 150);
	} else {
		var elements = document.getElementById('action-floating').children;
		var length = elements.length;
		for (var i = 0; i < length; i++) elements[i].classList.remove('hidden');
		setTimeout(function () {
			toggleStyle('action-floating', 'pressed');
		}, 0);
	}
};

var init = function () {
	var eventName = isMobile() ? 'touchstart' : 'click';

	var burger = document.getElementById('burger');
	if (burger) burger.addEventListener(eventName, toggleNavigation);

	var action = document.getElementById('action');
	if (action) action.addEventListener(eventName, toggleMenu);

	var leftPane = document.getElementById('left-pane');
	if (leftPane) leftPane.addEventListener(eventName, toggleLeftPane);

	var views = document.getElementsByClassName('view');
	var length;
	if (views && (length = views.length)) {
		for (var i = 0; i < length; i++) views[i].addEventListener(eventName, hideView);
		var content = document.getElementById('content');
		if (content) content.addEventListener(eventName, showViews);
	}

	var floatingAction = document.getElementById('action-floating');
	if (floatingAction) floatingAction.addEventListener(eventName, toggleFloatingAction);
};
