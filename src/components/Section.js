export default class Section {
	constructor({ renderer }, containerSelector) {
		// this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	renderItems(items) {
		// render the items on the page
		items.slice().reverse().forEach((item) => {
			this._renderer(item);
		});
	}

	addCard(element) {
		this._container.prepend(element);
	}

	removeCard(element) {
		element.remove();
	}
}