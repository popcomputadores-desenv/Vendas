var mapbox;
var mapbox_marker = [];
var mapbox_bounds = [];

get_mapbox_token = function(){
	mapbox_token = getStorage("mapbox_token");
	if(!empty(mapbox_token)){
		return mapbox_token;
	}
	return false;
};

centerMapbox = function(){
	mapbox.fitBounds(mapbox_bounds, {padding: [30, 30]}); 
};

toIcon = function(link){
	return default_icon = L.icon({
		iconUrl: link,	    	   
	});
};

mapbox_initMap = function( div, lat, lng, info ){
	
	try {
		
		if(empty(lat) && empty(lng)){
		   toastMsg( getTrans("Missing Coordinates","missing_coordinates") );	
		   return;
		}
		
		if (mapbox != undefined) {		
		   mapbox.remove();
	    }	 
		
		mapbox = L.map(div,{ 
		   scrollWheelZoom:true,
		   zoomControl:false,
	    }).setView([lat,lng], 5 );
		
	     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+ get_mapbox_token(), {		    
		    maxZoom: 18,
		    id: 'mapbox.streets',		    
		}).addTo(mapbox);
		
		latlng = [lat,lng];
		mapbox_bounds.push( latlng );
		
		info_html ='<p>'+ info +'</p>';
		
		mapbox_marker = L.marker([ lat , lng ], { draggable : false } ).addTo(mapbox);  
		mapbox_marker.bindPopup(info_html);
		mapbox_marker.openPopup();
		
		centerMapbox();
	    
	} catch(err) {				
	    toastMsg(err.message);
	}  
};


mapbox_initTrackmap = function(page){
	
	try {
		
		mapbox_marker = [];
		mapbox_bounds = [];
		
		title  = page.options.title;
		$(".map_title").html( title );
		
		lat  = page.options.lat;
		lng  = page.options.lng;
		delivery_address = page.options.delivery_address;
		
		driver_lat  = page.options.driver_lat;
		driver_lng  = page.options.driver_lng;
		driver_address  = page.options.driver_address;
		
		icon_location = page.options.icon_location;
		icon_driver = page.options.icon_driver;
		icon_dropoff = page.options.icon_dropoff;
		
		driver_id = page.options.driver_id;
		driver_avatar = page.options.driver_avatar;
		driver_phone = page.options.driver_phone;
		driver_name = page.options.driver_name;
		
		drop_address = page.options.drop_address;
		dropoff_lat = page.options.dropoff_lat;
		dropoff_lng = page.options.dropoff_lng;
			
		
		if(empty(icon_location)){
			icon_location = 'http://maps.gstatic.com/mapfiles/markers2/marker.png';
		}		
		if(empty(icon_driver)){
			icon_driver = 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png';
		}			
		if(empty(icon_dropoff)){
		   icon_dropoff = 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png';
		}		
		
		$(".driver_profile_pic").attr("src", driver_avatar);
			
		if(!empty(driver_name)){
		   $(".driver_display_name").html(driver_name);
		} else {
		   $(".driver_display_name").html('');
		}
		
		if(!empty(driver_phone)){
		  $(".driver_contact").attr("href", "tel:"+ driver_phone);
		} else {
		  $(".driver_contact").hide();
		}
		
		if (empty(lat) && empty(lng) ){
			toastMsg( getTrans("Invalid coordinates",'invalid_coordinates') );
			return;
		}
		
		if (mapbox != undefined) {		
		   mapbox.remove();
	    }	 
		
	    mapbox = L.map('track_map',{ 
		   scrollWheelZoom:true,
		   zoomControl:false,
	    }).setView([lat,lng], 5 );
		
	     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+ get_mapbox_token(), {		    
		    maxZoom: 18,
		    id: 'mapbox.streets',		    
		}).addTo(mapbox);
		
		latlng = [lat,lng];
		mapbox_bounds.push( latlng );
	
		
		info_html = '<p>'+delivery_address+"</b>";
			
		/*TASK*/
		mapbox_marker[0] = L.marker([ lat , lng ], { icon : toIcon(icon_location) } ).addTo(mapbox);  
		mapbox_marker[0].bindPopup(info_html);
		//mapbox_marker[0].openPopup();
		
		
		/*PLOT DROP OFF ADDRESS*/
		if (!empty(dropoff_lat) && !empty(dropoff_lng) ){
			info_html = '<p>'+drop_address+"</b>";		
			mapbox_marker[1] = L.marker([ dropoff_lat , dropoff_lng ], { icon : toIcon(icon_dropoff) } ).addTo(mapbox);  
		    mapbox_marker[1].bindPopup(info_html);	    			    
		    mapbox_bounds.push( [dropoff_lat,dropoff_lng] );
		}
		
		/*PLOT DRIVER*/
		if (!empty(driver_lat) && !empty(driver_lng) ){
			info_html = '<p>'+driver_address+"</b>";
			mapbox_marker[2] = L.marker([ driver_lat , driver_lng ], { icon : toIcon(icon_driver) } ).addTo(mapbox);  
		    mapbox_marker[2].bindPopup(info_html);	  		       	   
		    mapbox_bounds.push( [driver_lat,driver_lng] );
		    
		    track_order_map_interval = setInterval(function(){runTrackMap(driver_id)}, 10000);
		}
		
		centerMapbox();
	
	} catch(err) {
       toastMsg(err.message);
    } 
};

mapbox_trackdriver = function(data){
	
	try {
		dump("mapbox_trackdriver");
		dump(data);
		lat  = data.location_lat;
		lng = data.location_lng;
			
		if(empty(mapbox_marker)){             	
	        mapbox_marker[2] = L.marker([ lat , lng ], { draggable : false } ).addTo(mapbox);  
	     } else {             	 
	     	var newLatLng = new L.LatLng(lat, lng);
	     	mapbox_marker[2].setLatLng(newLatLng); 
	     }	
		
		centerMapbox();
		
		track_order_map_interval = setInterval(function(){runTrackMap(data.driver_id)}, 10000);
	} catch(err) {
		stopTrackMapInterval();
        toastMsg(err.message);
    } 
};