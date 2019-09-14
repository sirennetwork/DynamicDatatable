String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex; 
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};

var dataTable_url = $('.commonDataTable').attr('data-url');
	
	var obj = [
		{ mData: null,
		  "bSortable":false,
          render: function(data, type, full, meta){
          	return meta.row + meta.settings._iDisplayStart + 1;
          }
        }
	];

	$('.commonDataTable th').each(function(){
		var sortable = ($(this).attr('data-sortable') == 'false')?false:true;
		if ($(this).attr('id') != false && $(this).attr('id') != undefined && ($(this).attr('data-manipulate_json') == undefined || $(this).attr('data-manipulate_json') == '')) {
			obj.push({mData:$(this).attr('id'),"bSortable":sortable});
		}

		if ($(this).attr('data-manipulate_json') != undefined && $(this).attr('data-manipulate_json') != '') {
			var manipulate_json = $.parseJSON($(this).attr('data-manipulate_json'));
			obj.push({mData:$(this).attr('id'),"bSortable":sortable,
				render: function(data, type, full, meta){
					if (data in manipulate_json) {
						var manipulated_json_value = Object.keys(manipulate_json).map(function (key, value) { 
							return manipulate_json[data].html;
						});

						return manipulated_json_value[0];

					}else{
						return data;
					}
				}
			});
		}

		if ($(this).attr('data-render') == "true") {
			var render_html = $(this).attr('data-render_html');
			var replacer = render_html.match(/[^{\}]+(?=})/g);
			var element = render_html.match(/{([^}]+)}/g);
			obj.push({mData:null,
						"bSortable":sortable,
						render: function(data, type, full, meta){
						// console.log(data);
							if (replacer != null) {
								var replacer_value = Object.keys(data).map(function (key, value) { 
									return data[replacer[value]]; 
								});
								replacer_value = replacer_value.filter(function( element ) {
								   return element !== undefined;
								});
								return render_html.replaceArray(element,replacer_value).replace(/[{}]/g, "");
							} else{
								return render_html;
							}							
						}
					});
		}

		if ($(this).attr('data-condition_render') != undefined) {
			var condition_render = $(this).attr('data-condition_render');
			var condition_render_json = $.parseJSON(condition_render);
			var str = '';
			var conditional_cases = Array();

			var condition_key = Object.keys(condition_render_json).map(function (key, value) { 
								return key; 
							});
			
			obj.push({mData:null,
					  "bSortable":sortable,
					  render: function(data, type, full, meta){
					  	for (var i = 0; i < condition_key.length; i++) {
							conditional_cases = Object.keys(condition_render_json[condition_key[i]]).map(function (key, value) { 
											return key; 
										});
						}
						if (conditional_cases.includes(data[condition_key]) == true) {
							var condition_html = condition_render_json[condition_key][data[condition_key]]['html'];
						} else{
							var condition_html = condition_render_json[condition_key]['default']['html'];
						}

						var replacer = condition_html.match(/[^{\}]+(?=})/g);
						var element = condition_html.match(/{([^}]+)}/g);

						if (replacer != null) {
							var replacer_value = Object.keys(data).map(function (key, value) { 
								return data[replacer[value]]; 
							});
							replacer_value = replacer_value.filter(function( element ) {
							   return element !== undefined;
							});

							return condition_html.replaceArray(element,replacer_value).replace(/[{}]/g, "");
						} else{
							return condition_html;
						}	
					  }
					});
			

		}
	});



	if (obj.length > 1) {
		$('.commonDataTable').DataTable({
			 mark: true,
			"bProcessing": true,
	        "bServerSide": true,
	        "sAjaxSource": dataTable_url,
	        "sServerMethod": "POST",
	        "aoColumns": obj
		});
	}
