//function that exports the about page for the routes
module.exports.aboutView = function(req, res) {
	res.render('about', {
		"title": "About",
		"picture": "images/fox.jpg",
		"paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut est vitae dui ultricies placerat ac porttitor leo. In vel leo ac dui laoreet lacinia vitae id mi. Cras egestas arcu non euismod accumsan. Integer imperdiet, dui eu imperdiet tincidunt, arcu risus vulputate sem, non maximus magna orci vel mi. Aenean laoreet id nunc quis dignissim. Praesent elementum enim ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In molestie condimentum leo at volutpat. In velit augue, molestie sed interdum eleifend, ultrices a sapien."
	});
};