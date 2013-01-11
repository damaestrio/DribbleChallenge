var index = []
index['everyone']=1
index['popular']=1
index['debuts']=1
var selectedType = 'everyone'

var callAPI = function(type)
{		
	$.ajax({		
		//Must be a JSONP request
		url: "http://api.dribbble.com/shots/" + type + "?callback=?",
		crossDomain: true,
		type:"GET",		
		dataType:"json",
		data: { 
			"page": index[type],
			"pages": 1,
			"per_page": 9,
			"total": 9
		}
		}).done(function(html){
			//alert("Got data for everyone");
			displayImages(html);
		})
}

//displays the images we have just received
var displayImages = function(data)
{
	//Creates a new element to place images in. Create a new element for every row.
	var newRow = $('<div style="padding-bottom:40px; height:140px; width:750px; margin:auto;"/>')
	
	//iterate through shots
	for (i = 0; i < data.shots.length; i++)
	{
		var thisShot = data.shots[i]
		
		var info
		
		//Pic info - includes logic for grammatical stuff
		if (thisShot.likes_count == 1)
		{
			info = thisShot.likes_count + " LIKE, "
		}
		else
		{
			info = thisShot.likes_count + " LIKES, "
		}
		
		if (thisShot.comments_count == 1)
		{
			info += thisShot.comments_count + " COMMENT"
		}
		else
		{
			info += thisShot.comments_count + " COMMENTS"
		}		
		
		newRow.append('<div style="background-color:#24577B; float:left; padding:20px;"><img src="' + thisShot.image_teaser_url + '"/><div style="font-size:11px; font-weight:bold; padding-top:8px;">' + info + '</div></div>');
		
		//when we complete a row, add it to the gallery
		if (i > 0 && ((i + 1) % 3 == 0))
		{
			$('#gallery').append(newRow);
			newRow = $('<div style="padding:40px; height:140px; width:750px; margin:auto;"/>');
		}
	}	
}

//more button
var moreImages = function()
{
	//Remove current images from gallery
	$('#gallery').empty();
	
	index[selectedType]++;
	callAPI(selectedType);
}

//change the type that we are looking at
var changeType = function(type, button)
{		
	resetButtons();
	
	//highlight the new button
	$('#' + button).css('color', '#FFCE40')
			
	selectedType = type;
	
	//Remove current images from gallery
	$('#gallery').empty();	
	
	callAPI(selectedType);
}

//reset button highlights
var resetButtons = function()
{
	$('#everyoneButton').css('color', '#ffffff')
	$('#popularButton').css('color', '#ffffff')
	$('#debutButton').css('color', '#ffffff')
}
