var isMobile = function () {
	return /iPad|iPhone|iPod|Android|BlackBerry|WinCE|Pocket/i.test(navigator.platform);
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

	var burgers = document.getElementsByClassName('burger');
	if (burgers && burgers.length) burgers[0].addEventListener(eventName, toggleNavigation);

	var leftPanes = document.getElementsByClassName('left-pane');
	if (leftPanes && leftPanes.length) leftPanes[0].addEventListener(eventName, toggleLeftPane);

	var views = document.getElementsByClassName('view');
	var length;
	if (views && (length = views.length)) {
		for (var i = 0; i < length; i++) views[i].addEventListener(eventName, hideView);

		var contents = document.getElementsByClassName('content');
		if (contents && contents.length) contents[0].addEventListener(eventName, showViews);
	}

	var floatingActions = document.getElementsByClassName('action-floating');
	if (floatingActions && floatingActions.length) floatingActions[0].addEventListener(eventName, toggleFloatingAction);

	alert('Platform: ' + navigator.platform + ', Mobile: ' + isMobile());
};
