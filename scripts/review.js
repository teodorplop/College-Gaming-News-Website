var Review = function() {
	this.selectData = JSON.parse(MyData.genre_select);
	this.usedImagesArray = JSON.parse(MyData.review_images_src);
	this.freeImagesArray = null;
	this.images = new Array();
	
	this.loadGenreSelect = function() {
		var genreSelect = document.getElementById("genre_select");
		for (var i = 0; i < this.selectData.length; ++i) {
			var option = document.createElement("option");
			option.innerHTML = this.selectData[i].genre;
			genreSelect.appendChild(option);
		}
	
		this.onGenreChange();
	}
	this.onGenreChange = function() {
		var genreSelect = document.getElementById("genre_select");
		var selectedGenre = genreSelect.options[genreSelect.selectedIndex].value;
	
		var gamesSelect = document.getElementById("games_select");
		gamesSelect.options.length = 0;
	
		var gamesArray = this.getArrayByGenre(selectedGenre);
		for (var i = 0; i < gamesArray.length; ++i) {
			var option = document.createElement("option");
			option.innerHTML = gamesArray[i];
			gamesSelect.appendChild(option);
		}
	}
	this.getArrayByGenre = function(selectedGenre) {
		for (var i = 0; i < this.selectData.length; ++i)
			if (this.selectData[i].genre == selectedGenre)
				return this.selectData[i].games;
	}
	
	this.loadRandomImages = function() {
		this.usedImagesArray.shuffle();
		this.freeImagesArray = this.usedImagesArray.splice(14, this.usedImagesArray.length - 14);
	
		var floatLeft = document.getElementById("float_left");
		for (var i = 0; i < 7; ++i) {
			this.addImage(floatLeft, "resources/review/" + this.usedImagesArray[i]);
		}
		var floatRight = document.getElementById("float_right");
		for (var i = 7; i < 14; ++i) {
			this.addImage(floatRight, "resources/review/" + this.usedImagesArray[i]);
		}
	}
	this.addImage = function(parent, imageSRC) {
		var div = document.createElement("div");
		div.style.position = "relative";
		div.style.height = "7em";
		div.style.margin = "2%";
	
		var image = document.createElement("img");
		image.src = imageSRC;
		image.className = "picture_float";
	
		parent.appendChild(div);
		div.appendChild(image);
		this.images.push(image);
	}
	this.changeRandomImages = function() {
		var indexArray = new Array();
		var imageIndex = Math.floor(Math.random() * this.images.length);
		while (imageIndex < this.images.length) {
			indexArray.push(imageIndex);
			imageIndex = imageIndex + 1 + Math.floor(Math.random() * (this.images.length - imageIndex - 1));
		}
		
		for (var i = 0; i < indexArray.length; ++i) {
			imageIndex = indexArray[i];
			var image = this.images[imageIndex];
	
			var auxImage = document.createElement("img");
			auxImage.src = image.src;
			auxImage.className = "picture_float";
			auxImage.style.zIndex = "100";
			image.parentNode.appendChild(auxImage);
		
			var newImageIndex = Math.floor(Math.random() * this.freeImagesArray.length);
			image.src = "resources/review/" + this.freeImagesArray[newImageIndex];
		
			var aux = this.usedImagesArray[imageIndex];
			this.usedImagesArray[imageIndex] = this.freeImagesArray[newImageIndex];
			this.freeImagesArray[newImageIndex] = aux;
	
			jQuery(function() {
				function fadeOut() {
					$(auxImage).fadeOut(1000, deleteImage);
				}
				function deleteImage() {
					auxImage.remove();
				}
				fadeOut();
			});
		}
	}
}

var instance = null;
Review.start = function() {
	instance = new Review();
	instance.loadGenreSelect();
	instance.loadRandomImages();
	
	setInterval(function() {instance.changeRandomImages()}, 2000);
};
Review.onGenreChange = function() {
	instance.onGenreChange();
};