Array.prototype.shuffle = function() {
	var myArray = this;
	
	for (var i = myArray.length - 1; i >= 0; --i) {
		var randomIndex = Math.floor(Math.random() * (i + 1));
		var randomItem = myArray[randomIndex];
		myArray[randomIndex] = myArray[i];
		myArray[i] = randomItem;
	}
}