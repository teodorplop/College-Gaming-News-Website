var Games = function() {
	this.table = document.getElementById("games_table");
	
	this.loadTable = function() {
		var tableData = JSON.parse(window["MyData"][this.table.id]);
		if (tableData.length == 0)
			return;
		
		// Header
		var row = this.table.insertRow();
		for (var i = 0; i < tableData[0].row.length; ++i) {
			var th = document.createElement("TH");
			th.innerHTML = tableData[0].row[i];
			row.appendChild(th);
		}
		// Content
		for (var i = 1; i < tableData.length; ++i) {
			var row = this.table.insertRow();
			for (var j = 0; j < tableData[i].row.length; ++j)
				row.insertCell().innerHTML = tableData[i].row[j];
		}
	}
}

var instance = null;
Games.start = function() {
	instance = new Games();
	instance.loadTable();
}