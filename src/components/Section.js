export default class Section {
	constructor({ renderer }, containerSelector) {
		// this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	renderItems(items) {
		// render the items on the page
		items.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(element) {
		this._container.prepend(element);
	}

	addCard(element) {
		this._container.append(element);
	}

	removeCard(element) {
		element.remove();
	}
}