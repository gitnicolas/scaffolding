var isMobile = function () {
	return /iPad|iPhone|iPod|Android|Linux arm|BlackBerry|WinCE|Pocket/i.test(navigator.platform);
};

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
	toggleStyle('page', 'expanded');
};

var toggleMenu = function () {
	toggleStyle('menu', 'hidden');
};

var toggleLeftPane = function () {
	toggleStyle('left-pane', 'collapsed');
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

var toggleFloatingAction = function () {
	toggleStyle('action-floating', 'pressed');
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
	if (floatingAction) floatingAction.addEventListener('click', toggleFloatingAction);
};
