//export function that gets the index page for routes
module.exports.indexView = function(req, res) {
	res.render('index', {
		"title": "Michael Dobachesky - Lab 4",
		"paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque velit in blandit laoreet. Nunc euismod dictum nunc, sed hendrerit tellus dictum ac. Donec egestas vitae nibh vel tincidunt. Etiam tincidunt aliquam augue. Donec tellus lorem, cursus et vestibulum sed, consectetur non nisl. Duis semper laoreet neque, eu euismod metus efficitur non. Mauris iaculis, diam quis fringilla tempor, erat enim condimentum metus, ut cursus purus tellus eu eros. Pellentesque tellus justo, tristique a facilisis quis, pharetra nec urna. Curabitur ac odio eget tortor rutrum gravida nec ac libero. Nam et risus ac erat semper pellentesque. Sed sit amet lobortis dolor. Cras pretium elit quis vestibulum aliquam. Duis maximus sed velit quis scelerisque."
	});
};