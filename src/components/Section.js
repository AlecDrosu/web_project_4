export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	// render the items in the section
	// renderItems() {
	// 	this._items.forEach((item) => {
	// 		this._renderer(item);
	// 	});
	// }

	addItem(element) {
		this._container.append(element);
	}
}

