// // csv
// function htmlToCSV(html, filename) {
//     const downloadCSVFile = (csv, filename) =>{
//         let csv_file, link;
//         csv_file = new Blob([csv], {type: "text/csv"});
        
//         link = document.createElement("a");
//         link.download = filename;
//         link.href = window.URL.createObjectURL(csv_file);
//         link.style.display = "none";
//         document.body.appendChild(link);
//         link.click();
//     }
// 	let data = [];
// 	let rows = document.querySelectorAll("table tr");
			
// 	for (let i = 0; i < rows.length; i++) {
// 		let row = [], cols = rows[i].querySelectorAll("td, th");
				
// 		for (let j = 0; j < cols.length; j++) {
// 		        row.push(cols[j].innerText);
//         }
		        
// 		data.push(row.join(",")); 		
// 	}

// 	downloadCSVFile(data.join("\n"), filename);
// }

// // open dev tools

// window.dispatchEvent(new KeyboardEvent("keydown", {
//     key: "i",
//     keyCode: 69, // example values.
//     code: "KeyE", // put everything you need in this object.
//     which: 69,
//     shiftKey: true, // you don't need to include values
//     ctrlKey: true,  // if you aren't going to use them.
//     metaKey: false   // these are here for example's sake.
// }));