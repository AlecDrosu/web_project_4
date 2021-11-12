export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	renderer() {
		// this._items.forEach((item) => {
		// 	const itemElement = this._renderer(item);
		// 	this._container.append(itemElement);
		// });
		this._items.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(element) {
		this._container.append(element);
	}
}
