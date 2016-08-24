function createDoc(){

	var gerecht = $("#gerecht").val();
	var hoeveelheid = $("#hoeveelheid").val();
	var tafelNr = $("#tafelNr").val();
	var opmerkingen = $("#opmerkingen").val();
	var bestelDatumUur = $("#bestelDatumUur").val();

	var doc = {};

	doc.gerecht = name.replace(/\s+/g, '');
	doc.hoeveelheid = parseInt(hoeveelheid);
	doc.tafelNr = parseInt(tafelNr);
	doc.opmerkingen = opmerkingen;
	doc bestelDatumUur = bestelDatumUur
	var json = JSON.stringify(doc);

	$.ajax({
		type : 'PUT',
		url : '../../' + doc.gerecht + hoeveelheid + tafelNr + opmerkingen + bestelDatumUur,
		
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			buildOutput();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(textStatus);
		}
	});
}

function buildOutput(){

	$('#output').empty();
	var html = '<table class="table table-hover">';
	$.ajax({
		type : 'GET',
		url : '../../_all_docs?include_docs=true',
		async : true,
		success : function(data){
			var arr = JSON.parse(data).rows;

			for(var i = 0; i < arr.length; i++){

				if (arr[i].id.indexOf('_design') == -1){
					var doc = arr[i].doc;
					html += '<tr><td>' + doc.gerecht + '</td><td>' + doc.hoeveelheid
							+ '</td><td>' + doc.tafelNr + '</td><td>' + doc.opmerkingen + '</td><td>' doc.bestelDatumUur + '</td>'
							+ '<td><button type="button" class="btn btn-danger" onClick="deleteDoc(\'' + doc._id + '\',\'' + doc._rev + '\')">X</button></td>'
							+ '<td><button type="button" class="btn btn-success" onClick="editDoc(\'' + doc._id + '\',\'' + doc._rev + '\',\'' + doc.name+ '\',\'' + doc.firstName + '\',\'' + doc.points + '\')">Edit</button></td>';
				}
			}
			html += '</table>';
			$('#output').html(html);
			fillTypeAhead();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}

function deleteDoc(id, rev){
	$.ajax({
		type:	 'DELETE',
		url:	 '../../' + id + '?rev=' + rev,
		success: function(){ 
			buildOutput();
		},
		error:   function(XMLHttpRequest, textStatus, errorThrown) { console.log(errorThrown); }
	});
}



function fillTypeAhead(){
	
	$.ajax({
		type:	'GET',
		url:	'_view/allsegerechten',
	    async: true,
	    success:function(data){ 
	        var rows = JSON.parse(data).rows;
	        var gerechten = [];
	        $.each(rows, function(key, value){
	        gerechten.push(value.key);
	        });
	        
	        $('#gerechten').typeahead({source: gerechten});
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
	});
}


$(document).ready(function(){
	fillTypeAhead();
});