/**
Karenderia Order Taking App
Version 3.0
*/

/**
Default variable declarations 
*/
var ajax_url= krms_config.ApiUrl ;
var dialog_title_default= krms_config.DialogDefaultTitle;
var search_address;
var ajax_request;
var networkState;

var translator;
var dictionary;

var map;
var map_marker;

var push;

var alert_handle;
var alert_delayed = 15000;
var total_order=0;
var timer = null;
var SunmiInnerPrinter;

var app_version = "2.5";
var map_style = [ {stylers: [ { "saturation":-100 }, { "lightness": 0 }, { "gamma": 1 } ]}];
var driver_marker;
var map_bounds;
var track_order_map_interval;
var marker_dropoff;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {    
	    		
	try {
		
		navigator.splashscreen.hide();
		
		if(!isDebug()){		
	 	   getLanguageSettings();
		}	
		
				var data = new Date();
		// Guarda cada pedaço em uma variável
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth();          // 0-11 (zero=janeiro)
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
		var min     = data.getMinutes();        // 0-59
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos

		// Formata a data e a hora (note o mês + 1)
		var str_data = dia + '/' + (mes+1) + '/' + ano4;
		var str_hora = hora + ':' + min + ':' + seg;

		// Mostra o resultado
		//alert('Hoje é ' + str_data + ' às ' + str_hora);

var base64Data="/9j/4AAQSkZJRgABAQEBLAEsAAD/4RDoRXhpZgAATU0AKgAAAAgABAE7AAIAAAAKAAAISodpAAQAAAABAAAIVJydAAEAAAAUAAAQzOocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFJvQnNPbiAuLgAABZADAAIAAAAUAAAQopAEAAIAAAAUAAAQtpKRAAIAAAADNTAAAJKSAAIAAAADNTAAAOocAAcAAAgMAAAIlgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMTktMDQtMjBUMDY6NTk6NTYuNDk2PC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPlJvQnNPbiAuLjwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAg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";
var width = 385; //width of the above image
var height = 140; // height of the above image
		SunmiInnerPrinter.printerInit();
        SunmiInnerPrinter.printerStatusStartListener();
		SunmiInnerPrinter.setAlignment(1);
		SunmiInnerPrinter.printBitmap(base64Data, width, height);
        SunmiInnerPrinter.setFontSize(27);
		SunmiInnerPrinter.setAlignment(1);
		SunmiInnerPrinter.printOriginalText("Você pede e nós entregamos!");
		SunmiInnerPrinter.setAlignment(2);
        SunmiInnerPrinter.setFontSize(36);
		SunmiInnerPrinter.setAlignment(1);
		SunmiInnerPrinter.printOriginalText("Sistema aberto em"); 
		SunmiInnerPrinter.printOriginalText(str_data + ' as ' + str_hora); 
        SunmiInnerPrinter.lineWrap(1);
		SunmiInnerPrinter.setFontSize(22);
		SunmiInnerPrinter.setAlignment(0);
	    SunmiInnerPrinter.lineWrap(2);
		SunmiInnerPrinter.setAlignment(1);
		SunmiInnerPrinter.printQRCode("Você pede e nós entregamos!",8,2);
		//SunmiInnerPrinter.printOriginalText("\n");
		//SunmiInnerPrinter.printBarCode("7898087031818",2,162,2,2);
        SunmiInnerPrinter.lineWrap(4);
		
		document.addEventListener("pause", onPause, false);
		document.addEventListener("resume", onResume, false);
			
		initPush(false);
				
		cordova.plugins.notification.local.hasPermission(function (granted) {			
			if(!granted){
				cordova.plugins.notification.local.requestPermission(function (granted) {
					
				});
			}
		});
				
	} catch(err) {
       alert(err.message);
    } 	
}


function onPause() {   
	setAppStatus("app_status=1");
	setStorage("running_background",1);	 
}

function onResume() {   
	
   try {
   	
	   removeStorage("running_background");   
	   setAppStatus("app_status=0");
	   
	   push.setApplicationIconBadgeNumber(function(){
	      //toastMsg("success")
	   }, function() {
	      //toastMsg("failed")
	   },0);
	      
   } catch(err) {
       alert(err.message);
    } 	
}


jQuery.fn.exists = function(){return this.length>0;}
jQuery.fn.found = function(){return this.length>0;}


document.addEventListener("offline", noNetConnection, false);

function noNetConnection()
{
	hideAllModal();	
    ajax_request.abort();
	toastMsg( getTrans("Internet connection lost","net_connection_lost") );	
}


function dump(data)
{
	console.debug(data);
}

function setStorage(key,value)
{
	localStorage.setItem(key,value);
}

function getStorage(key)
{
	return localStorage.getItem(key);
}

function removeStorage(key)
{
	localStorage.removeItem(key);
}

function explode(sep,string)
{
	var res=string.split(sep);
	return res;
}

function urlencode(data)
{
	return encodeURIComponent(data);
}

function empty(data)
{
	//if (typeof data === "undefined" || data==null || data=="" || data=="null"  ) { 
	if (typeof data === "undefined" || data==null || data=="" || data=="null" || data=="undefined" ) {	
		return true;
	}
	return false;
}

$( document ).on( "keyup", ".numeric_only", function() {
  this.value = this.value.replace(/[^0-9\.]/g,'');
});	 

/*onsen ready*/
ons.bootstrap();  
ons.ready(function() {
			
	dump("onsen ready");
	
	/*removeStorage("merchant_info");
	removeStorage("merchant_token");	
	removeStorage("mt_default_lang");*/
	
	//removeStorage("mt_default_lang");	
		
    if (isDebug()){	    
	   setStorage("merchant_device_id","dispositivo_web");
	}	
	
	removeStorage('total_order');
	removeStorage("running_background");
			   			
}); /*end ready*/


function refreshConnection()
{	
	if ( !hasConnection() ){			
	} else {		
	}	
}

function hasConnection()
{	
	try {				
		if(isDebug()){
			return true;
		}			
		
		var networkState = navigator.connection.type;	
		if ( networkState=="Connection.NONE" || networkState=="none"){	
			return false;
		}	
		return true;
	
	} catch(err) {
   	   alert(err.message);     
   	   return false;
    } 
}

function createElement(elementId,elementvalue)
{
  try {
  	
	   var content = document.getElementById(elementId);
	   content.innerHTML=elementvalue;
	   ons.compile(content);
   
   } catch(err) {
   	   dump(err.message);     
   } 
}

/*PAGE INIT*/
document.addEventListener("pageinit", function(e) {
	dump("pageinit");	
	dump("pagname => "+e.target.id);	
	
	switch (e.target.id)
	{		
		case "page-getsettings":
		   if (isDebug()){
		      getLanguageSettings();
		   }
		break;
		
		case "page-home":		 		
		 runAlert();
		 runCancelOrder();		 
		break;
		
		case "page-bookingForm":
		   $(".write_comments").attr("placeholder",  getTrans('Write a comments...','write_comments') );
		break;
		
		case "page-acceptOrderForm":
		initMobileScroller();
		translatePage();
		break;
			
		case "page-displayOrder":
		case "page-declineOrderForm":		
		case "page-forgotpass":
		case "page-lostPassword":
		case "page-orderHistory":
		case "page-changesStatus":				
		case "page-SearchPopUp":
		case "page-searchResults":		
		case "page-assignDriver":				
		translatePage();
		break;
		
		case "page-login":		   
		   translatePage();
		break;
				
		case "page-orderstoday":
		$(".tab-action").val('GetTodaysOrder');
		$(".display-div").val('new-orders');
		$(".tab-active-page").html( getTrans('New Orders','new_order') );
							
		if ( !empty( getStorage("notification_push_type")  )){
			if (  getStorage("notification_push_type")=="order" ){				
				
		         $(".tab-action").val('GetTodaysOrder');
                 $(".display-div").val('new-orders');
                 $(".tab-active-page").html( getTrans('New Orders','new_order') );
                 tabbar.setActiveTab(0);		       	 
		       	 removeStorage("notification_push_type");
		       	 
		       	 showNotificationBadge(1);
				
			} else if ( getStorage("notification_push_type")=="booking" ){
				
				   $("#display-div").val('booking-pending');
				   $(".tab-active-page").html( getTrans("Booking","booking") );	 
				   tabbar.setActiveTab(3);				   
				   removeStorage("notification_push_type");
				   
				   showNotificationBadge(1);
				   
			} else {
				GetTodaysOrder();
			}
		} else {
			GetTodaysOrder();
		}
		
				
		translatePage();				
		break;
		
		case "page-pendingorders":
		$(".tab-action").val('GetPendingOrders');
		$(".display-div").val('pending-orders');
		$(".tab-active-page").html( getTrans('Pending Orders','pending_orders') );
		getPendingOrders();
		break;
		
		case "page-allorders":
		$(".tab-action").val('GetAllOrders');
		$(".display-div").val('allorders-orders');
		$(".tab-active-page").html( getTrans('All Orders','all_orders') );
		getGetAllOrders();
		break;		
		
		
		case "page-languageoptions":  
	    callAjax('getLanguageSelection','');
	    break;
		
	   case "page-settings":  	   
	   
	    $(".device_id_val").html( getStorage("merchant_device_id") );
	    if (isDebug()){
	    	$(".software_version_text").html( "1.0" );
	    } else {
	    	$(".software_version_text").html( BuildInfo.version );
	    }
	    
	    /*callAjax("getSettings",
	     "device_id="+getStorage("merchant_device_id")
	    ); */
	    
	    var info=getMerchantInfoStorage();	      	 
	    var params='';
	    params+="&token="+getStorage("merchant_token");
	    params+="&user_type="+info.user_type;
	    params+="&mtid="+info.merchant_id;		  
	    params+="&device_id="+getStorage("merchant_device_id");
	    callAjax("getSettings",params); 
	    
	    translatePage();
	    break; 
	    
	   case "page-profile": 
	      var info=getMerchantInfoStorage();	      	 
	      var params='';
		  params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;		  
	     callAjax('getProfile',params);
	     translatePage();     
	    break; 
	    
	   case "page-slidemenu": 
	   menu.on('preopen', function() {
          console.log("Menu page is going to open");       
          translatePage();       
       });
	   break; 
	   
	   case "page-tablePending":	     
	      var info=getMerchantInfoStorage();	      	 
	      var params='';
		  params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;		  
	      callAjax('PendingBooking',params);
	      translatePage(); 	   	
	      
	      $("#tab-action").val('pendingBooking');
	      $("#display-div").val('table-pending');
	      $(".page_label_book").html( getTrans("Pending Booking","pending_booking") );      	     
	   break; 
	   
	   case "page-tableAll":	
	      var info=getMerchantInfoStorage();	      	 
	      var params='';
		  params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;		  
	      callAjax('AllBooking',params);     
	      translatePage(); 	
	      
	      $("#tab-action").val('AllBooking');
	      $("#display-div").val('table-all');
	      $(".page_label_book").html( getTrans("All Booking","all_booking") );	      
	   break; 
	   	   
	   case "page-bookingtab":	   	      
	      var info=getMerchantInfoStorage();	      	 
	      var params='';
		  params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;		  
	      callAjax('PendingBookingTab',params);
	      translatePage(); 	   	
	           
	      $(".tab-active-page").html( getTrans("Booking","booking") );	 
	      $("#display-div").val('booking-pending');
	      
	   break; 
	   
	   case "page-map":
	   	  
	     var page = kNavigator.getCurrentPage();
	     lat = page.options.lat;	
	     lng = page.options.lng;	
	     address = page.options.address;
	     
	     map_provider = getMapProvider();
	     if (map_provider=="mapbox"){
	     	
	     	mapbox_initMap('location-map', lat, lng, address  );
	     	
	     } else {	     
	     options = {
			  div: ".location-map",
			  lat: lat,
			  lng: lng,
			  disableDefaultUI: true,
			  styles: map_style ,
		   };

	     map = new GMaps(options);     
	     
	     info_html = '<p>'+address+"</b>";
	     var infoWindow = new google.maps.InfoWindow({
		    content: info_html
		 });	
		 
		 marker =  map.addMarker({
			  lat: lat,
			  lng: lng,
			  infoWindow: infoWindow,
		});
		
		infoWindow.open(map, marker);
	     }
	     	   
		translatePage(); 	   
		
	   break; 
	   
	   case "page_map_track":
	     var page = kNavigator.getCurrentPage();
	     map_provider = getMapProvider();
	     
	     switch(map_provider)
	     {
	     	case "mapbox":
	     	  mapbox_initTrackmap(page);
	     	break;
	     	
	     	default:
	     initTrackMap(page);	     
	   break; 
	     }	     
	   break; 
	   
	   case "page_cancel_order":
			translatePage();
	     $(".tab-active-page").html( getTrans('Cancel Orders','cancel_orders') );
	     loadCancelOrder();
	   break; 
	   
	   case "page-showNotification":
	      translatePage();
	      var params='';  
      	  var info=getMerchantInfoStorage();      	  
      	  if(!empty(info)){
			  params+="&token="+getStorage("merchant_token");
			  params+="&user_type="+info.user_type;
			  params+="&mtid="+info.merchant_id;		  
		      callAjax("getNotification",params);	
      	  }
	   break; 
	   
	   /*end pageinit*/
	   	   
	}
	
}, false);


function onsenAlert(message,dialog_title)
{
	if (typeof dialog_title === "undefined" || dialog_title==null || dialog_title=="" ) { 
		dialog_title=dialog_title_default;
	}
	ons.notification.alert({
      message: message,
      title:dialog_title
    });
}

function hideAllModal()
{
	setTimeout('kloader.hide()', 1);	
}

/*mycallajax*/
function callAjax(action,params)
{	
    try {
	
	if ( !hasConnection() ){		
		switch (action)
		{
			case "registerMobile":			
			break;
			
			case "getLanguageSettings":
			  $(".retry-language").show();
			break;
			
			default:
			toastMsg(  getTrans("CONNECTION LOST",'connection_lost') );
			break;
			
		}
		return;
	}
	
	set_lang = getStorage("mt_default_lang");
	if(empty(set_lang) || set_lang=="null"){
		params+="&lang=en";	
	} else params+="&lang="+getStorage("mt_default_lang");	
		
	if(!empty(krms_config.APIHasKey)){
		params+="&api_key="+krms_config.APIHasKey;
	}
	
	params+="&app_version="+app_version;
	
	merchant_device_id = getStorage("merchant_device_id");
	if(!empty(merchant_device_id)){
		params+="&merchant_device_id="+merchant_device_id;
	}
	
	merchant_token = getStorage("merchant_token");
	if(!empty(merchant_token)){
		params+="&token="+merchant_token;
	}
	
	var info=getMerchantInfoStorage();		
	if(!empty(info)){
		params+="&user_type="+info.user_type;
		params+="&mtid="+info.merchant_id;	
	}
	
	if (isDebug()){
  	  params+="&device_platform=Android";
    } else {
  	  params+="&device_platform="+ encodeURIComponent(device.platform);
    }	 
		
	dump("Action=>"+action);
	dump(ajax_url+"/"+action+"?"+params);
	
	ajax_request = $.ajax({
	 url: ajax_url+"/"+action, 
	 data: params,
	 type: 'post',                  
	 async: false,
	 dataType: 'jsonp',
	 timeout: 5000,	 	
	 crossDomain: true,
	 beforeSend: function() {
		if(ajax_request != null) {			 	
		   /*abort ajax*/
		   hideAllModal();	
           ajax_request.abort();
           clearTimeout(timer);
		} else {    
			/*show modal*/		

		   timer = setTimeout(function() {
				hideAllModal();				
				ajax_request.abort();
	            toastMsg( getTrans('Request taking lot of time. Please try again','request_taking_lot_time')  );	            
	        }, 20000);
			  
			switch(action)
			{
				case "none":
				   break;				
				default:
				   kloader.show();
				   break;
			}
		}
	},
	complete: function(data) {					
		ajax_request=null;   	     				
		hideAllModal();		
		view_order_page_bol = undefined;
		view_booking_page_bol = undefined;
	},
	success: function (data) {	  
		dump(data);
		if (data.code==1){
			
			dump('actions=>' + action);
			
			switch (action)
			{
				case "registerMobile":
				case "none":
				break;
				
				case "login":
				   dump(data.details.token);
				   setStorage("merchant_token",data.details.token);
				   setStorage("merchant_info",JSON.stringify(data.details.info));
				   showHomePage();
				break;				
				
				case "GetTodaysOrder":
				   displayOrders(data.details.data,'new-orders');
				   
				   setStorage("total_order",data.details.total_order);
				   
				   unopen_count = data.details.unopen_count;
				   if(unopen_count>0){
				       $(".new_order_badge").html( unopen_count );
				   } else {
				   	   $(".new_order_badge").html( '' );
				   }
				break;

				case "GetPendingOrders":				   
				   displayOrders(data.details,'pending-orders');

				   				  
				break;
				
				case "GetAllOrders":
				   displayOrders(data.details,'allorders-orders');				   				   
				   
				   
				break;
				
				case "OrderdDetails":
				displayOrderDetails(data.details);	
					getDetalhesImpressao();
				break;
				
				case "printsunmi":
					$(".detalhesimpressao").val( data.details.print_receipt);
				break;
									
				case "DeclineOrders":
				case "AcceptOrdes":
				case "ChangeOrderStatus":
					var options = {
				      animation: 'none',
				      onTransitionEnd: function() { 			      	 			      	 
				      } 
				    };				    
					notyAlert(data.msg,'error');
					kNavigator.resetToPage('slidemenu.html',options);
				break;
				
				case "StatusList":
				statusList(data.details);
				break;
				
				case "getLanguageSelection":
				displayLanguageSelection(data.details);
				break;
				
				
				case "getSettings":      			       
			       if ( data.details.enabled_push==1){		
			       	   enabled_push.setChecked(true);
			       } else {			       	  
			       	   enabled_push.setChecked(false);
			       }		
			       
			       dump(data.details.food_option_not_available);
			       switch (data.details.food_option_not_available)
			       {
			       	   case 1:
			       	   case "1":
			       	   food_option_not_available.setChecked(true);
			       	   food_option_not_available_disabled.setChecked(false);
			       	   break;
			       	   
			       	   case 2:
			       	   case "2":
			       	   food_option_not_available.setChecked(false);
			       	   food_option_not_available_disabled.setChecked(true);
			       	   break;
			       	   
			       	   default:
			       	   food_option_not_available.setChecked(false);
			       	   food_option_not_available_disabled.setChecked(false);
			       	   break;
			       }
			       
			       if (data.details.merchant_close_store=="yes"){
			       	   merchant_close_store.setChecked(true);
			       } else {
			       	   merchant_close_store.setChecked(false);
			       }
			       
			       if (data.details.merchant_show_time=="yes"){
			       	   merchant_show_time.setChecked(true);
			       } else {
			       	   merchant_show_time.setChecked(false);
			       }
			       
			       if (data.details.merchant_disabled_ordering=="yes"){
			       	   merchant_disabled_ordering.setChecked(true);
			       } else {
			       	   merchant_disabled_ordering.setChecked(false);
			       }
			       
			       if (data.details.merchant_enabled_voucher=="yes"){
			       	   merchant_enabled_voucher.setChecked(true);
			       } else {
			       	   merchant_enabled_voucher.setChecked(false);
			       }
					
			       if (data.details.merchant_enabled_fidelidade=="yes"){
			       	   merchant_enabled_fidelidade.setChecked(true);
			       } else {
			       	   merchant_enabled_fidelidade.setChecked(false);
			       }
			       
			       if (data.details.merchant_required_delivery_time=="yes"){
			       	   merchant_required_delivery_time.setChecked(true);
			       } else {
			       	   merchant_required_delivery_time.setChecked(false);
			       }
			       
			       if (data.details.merchant_enabled_tip=="2"){
			       	   merchant_enabled_tip.setChecked(true);
			       } else {
			       	   merchant_enabled_tip.setChecked(false);
			       }
			       
			       if (data.details.merchant_table_booking=="yes"){
			       	   merchant_table_booking.setChecked(true);
			       } else {
			       	   merchant_table_booking.setChecked(false);
			       }
			       
			       if (data.details.accept_booking_sameday=="2"){
			       	   accept_booking_sameday.setChecked(true);
			       } else {
			       	   accept_booking_sameday.setChecked(false);
			       }
			       	       
			     break;
			       
			    case "geoDecodeAddress":			    
				  var locations={
					"name":data.address ,
					"lat":data.details.lat,
					"lng":data.details.long
					};
				   initMap(locations);
			    break;
			    
			    case "ForgotPassword":
			    dialogForgotPass.hide();		
			    			    
			    var options = {
			      animation: 'none',
			      onTransitionEnd: function() { 
			      	 $(".changepass-msg").html( data.msg );		
			      	 $(".email_address").val( data.details.email_address );		
			      	 $(".user_type").val( data.details.user_type );		
			      } 
			    };
			    kNavigator.pushPage("lostPassword.html", options);			    	    
			    break;
			    
			    case "OrderHistory":
			    $(".order-history-title").html( getTrans('Order history #','order_history')  + data.details.order_id);
			    displayHistory(data.details.data);
			    break;
			    
			    case "ChangePasswordWithCode":
			    onsenAlert(data.msg);
			    kNavigator.popPage({cancelIfRunning: true});
			    break;
			    
			    case "getProfile":
			    $(".username").val(data.details.username);
			    break; 
			    
			    case "getLanguageSettings":		
			    
			       setStorage("mt_translation",JSON.stringify(data.details.translation));
			       var device_set_lang=getStorage("mt_default_lang");
			       dump("device_set_lang=>"+device_set_lang);
			       
			       setStorage("app_enabled_alert",data.details.app_enabled_alert);
			       setStorage("app_alert_interval",data.details.app_alert_interval);
			       setStorage("app_decline_order_status",data.details.app_decline_order_status);
			       
			       setStorage("app_cancel_order_alert",data.details.app_cancel_order_alert);
			       setStorage("app_cancel_order_alert_interval",data.details.app_cancel_order_alert_interval);
			      
			       setStorage("map_provider",data.details.map_provider);
			       setStorage("mapbox_token",data.details.mapbox_token);
			       			       
			       /*KEEP THE NOT TURN OFF SCREEN*/
			       if(!empty(data.details.app_keep_awake)){			       	   
				       setStorage("app_keep_awake",data.details.app_keep_awake);			       
				       if(data.details.app_keep_awake==1){
				       	  keepAwake(true);
				       }
			       }
			      
			      if (empty(device_set_lang)){		

			      	  if (!empty(data.details.app_force_lang)){
			      	  	  setStorage("mt_default_lang",data.details.app_force_lang);
			      	  } else {			      	        	   
					       if(!empty(data.details.default_lang)){			       	  
					       	  dump(" set language "  + data.details.default_lang);
					          setStorage("mt_default_lang",data.details.default_lang);
					       } else {
					       	  dump("remove language");
					       	  setStorage("mt_default_lang","");
					       }		
			      	  }	
			       } else {
			       	  dump('already has language');
			       	  if (!empty(data.details.app_force_lang)){
			       	  	 setStorage("mt_default_lang",data.details.app_force_lang);
			       	  }
			       }
			       
			       setStorage("is_login_already",0);
			       			       
			       if (data.details.is_login){
			       	   dump('already login');			       	   
			       	   setStorage("is_login_already",1);			       	   
			       	   kNavigator.resetToPage("slidemenu.html", {
			       	   	  animation: 'slide',
			       	   });			       	   
			       } else {			       	   
			       	   dump('show login page');			       	   			       	   
			       	   kNavigator.resetToPage("pageLogin.html", {
			       	   	  animation: 'slide',
			       	   });			       	   
			       }
			      
			    break;
			    
			    
			    case "getNotification":		
			    displayNotification(data.details);	       
			    break;
			    
			    case "searchOrder":
			    //$(".search_results_found").html( data.msg);
			    displayOrders(data.details,'search-resuls');
			    break;
			    
			    case "PendingBooking":
			       displayBooking(data.details,'table-pending');		
			    break;
			    
			    case "AllBooking":
			       displayBooking(data.details,'table-all');		
			    break;
			    
			    case "GetBookingDetails":
			    $("#booking-view-title").html( getTrans("Booking Details #",'booking_details') + data.details.booking_id );
			    displayBookingDetails(data.details.data);
			    translatePage();	  	
			    break;
			    
			    case "bookingChangeStats":
			        var options = {
				      animation: 'none',
				      onTransitionEnd: function() { 			      	 			      	 
				      } 
				    };				    
					notyAlert(data.msg,'error');
					kNavigator.resetToPage('bookingHome.html',options);					
			    break;
			    
			    case "loadTeamList":
			       $(".driver_selected").html( getTrans('Assigned Driver','assigned_driver') ); 
			       $(".driver_id").val('');
			       displayTeamList(data.details);
			    break;
			    
			    case "driverList":
			       displayDriverList(data.details);
			    break;
			    
			    case "assignTask":
			       toastMsg(data.msg);
                   kNavigator.resetToPage("slidemenu.html", {
				   	animation: 'none', 
				   });
			    break;
			    
			    case "PendingBookingTab":
			       displayBooking(data.details,'newbooking-list');		
			    break;
			    
			    case "saveSettings":
			      toastMsg(data.msg);
			      if(data.details.enabled_push==1){
			      	 checkDeviceRegister();
			      } else {
			      	 pushUnregister();
			      }
			    break;
			    
			    case "trackDriver":
			    			    
			      map_provider = getMapProvider();
			      
	              switch(map_provider){	              	
	              	case "mapbox":
	              	  mapbox_trackdriver(data.details);
	              	break;
	              		              	
	              	default:
			      ReInitTrackingMap(data.details);
			    break;
	              }
	              	                    
			    break;
			    
			    case "approvedOrder":
			    case "declineOrder":
			      kNavigator.resetToPage("slidemenu.html", {
		       	   	 animation: 'slide',
		       	  });
			    break;
			    
			    case "clearNotification":			    
			      $("#notification").html('');		
			      $(".clear_noti_div").hide();
			    break;
			    
				default:
				   dump('default');
				   onsenAlert(data.msg);
				break;
			}
			
		} else if(data.code==3){
			
			removeStorage("merchant_token");
            removeStorage("merchant_info");
			toastMsg(data.msg);
            kNavigator.resetToPage("pageLogin.html", {
       	   	  animation: 'slide',
       	    });		
			
		} else {
			// failed response
			switch (action)
			{
				case "getNotification":		
				  $(".clear_noti_div").hide();
				  toastMsg(data.msg);
				break;
				
				case "registerMobile":
				case "none":
				case "getLanguageSettings":
				break;
											
				case "GetPendingOrders":
				case "GetAllOrders":				
				case "searchOrder":
				case "PendingBooking":
				case "AllBooking":
				case "PendingBookingTab":
				notyAlert(data.msg,"error");
				break;
				
				case "GetTodaysOrder":
				notyAlert(data.msg,"error");
				$("#new-orders").html('');
				break;
				
				case "OrderdDetails":
				onsenAlert(data.msg);
				kNavigator.popPage({cancelIfRunning: true});
				break;
								
				case "OrderHistory":
				//onsenAlert(data.msg);
				notyAlert(data.msg,"error");
			    $(".order-history-title").html( getTrans('Order history #','order_history') + data.details);			    
			    break;
			    
			    case "GetBookingDetails":
			    $("#booking-view-title").html( getTrans("Booking Details #",'booking_details') );
			    notyAlert(data.msg,"error");
			    break;
			    
			    case "getSettings":
			    onsenAlert(data.msg);
			    break;
			    
			    case "loadTeamList":			       
			      $(".team_selected").html( getTrans('Select Team','select_team') ); 
			      onsenAlert(data.msg);
			      createElement("team-list",'');
			      teamListDialog.hide();
			    break;
			    
			    case "driverList":			      
			       $(".driver_selected").html( getTrans('Assigned Driver','assigned_driver') ); 
			       onsenAlert(data.msg);
			       createElement("driver-list",'');
			       driverListDialog.hide();
			    break;
			    
			    case "trackDriver":
			      stopTrackMapInterval();
			    break;
				
				default:
				toastMsg(data.msg);
				break;
			}			
		}
	},
	error: function (request,error) {	        
		hideAllModal();
		view_order_page_bol = undefined;
		dump("MY CALL ERROR=>" + action);
		switch (action)
		{
			case "getLanguageSettings":
			case "registerMobile":
			case "getLanguageSettings":			
			break;
			
			case "GetTodaysOrder":
			notyAlert( getTrans("Network error has occurred please try again!",'network_error')  ,"error");
			break;
			
			default:
			//onsenAlert( getTrans("Network error has occurred please try again!",'network_error') );
			notyAlert( getTrans("Network error has occurred please try again!",'network_error')  ,"error");
		    break;
		}
	}
   });       
   
   ajax_request.always(function() {
       dump( "second complete" );
       ajax_request=null;  
       clearTimeout(timer);
   });		
   
   
   } catch(err) {
   	   toastMsg(err.message);       
   } 
	
} /*end callajax*/

function getTrans(words,words_key)
{
	return words;
}

function login()
{
	$.validate({ 	
	    form : '#frm-login',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-login").serialize();
	      params+="&merchant_device_id="+getStorage("merchant_device_id");
	      if (isDebug()){
	      	params+="&device_platform=Android" ;
	      } else {
	      	params+="&device_platform=" + device.platform ;
	      }	      
	      callAjax("login",params);	       
	      return false;
	    }  
	});	
}

function showForgotPass()
{
	$(".email_address").val('');
	if (typeof dialogForgotPass === "undefined" || dialogForgotPass==null || dialogForgotPass=="" ) { 	    
		ons.createDialog('forgotPassword.html').then(function(dialog) {
	        dialog.show();	        
	        $(".email_address").attr("placeholder",  getTrans('Email Address','email_address') );
	    });	
	} else {
		dialogForgotPass.show();		
	}
}

function showHomePage()
{
   var options = {
      animation: 'none',
      onTransitionEnd: function() {   
      	  //tabbar.setActiveTab(3);
      } 
   };
   kNavigator.pushPage("slidemenu.html", options);				
}

function setHome()
{	
    var options = {     	  		  
  	   closeMenu:true,
       animation: 'slide',
       //callback:GetTodaysOrder
    };	   	   	          
    menu.setMainPage('home.html',options);
}

function logout()
{
         
   ons.notification.confirm({
	  message: getTrans('Are you sure','are_you_sure') +"?" ,	  
	  title: dialog_title_default ,
	  buttonLabels: [ getTrans('Yes','yes') ,  getTrans('No','no') ],
	  animation: 'default', // or 'none'
	  primaryButtonIndex: 1,
	  cancelable: true,
	  callback: function(index) {	  	
	  	 if(index<=0){
	  	 	
	  	 	removeStorage("merchant_token");
            removeStorage("merchant_info"); 
            pushUnregister();
            
	  	 	kNavigator.resetToPage("pageLogin.html", {
       	   	  animation: 'slide',
       	    });	
       	    
	  	 }	  	 
	  }	  
	});
}

function load(done)
{	
	dump('pull');
	
	if ( !hasConnection() ){
		notyAlert(  getTrans("CONNECTION LOST",'connection_lost'),'error' );
		done();
		return;
	}
				
	//var action="GetTodaysOrder";
	var action= $(".tab-action").val();	
	var div_id= $(".display-div").val();
	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;	
	params+="&lang_id="+getStorage("mt_default_lang");
		
    if(!empty(krms_config.APIHasKey)){
		params+="&api_key="+krms_config.APIHasKey;
	}
	
	dump(ajax_url+"/"+action+"/?"+params);	
	
    ajax_request = $.ajax({
	 url: ajax_url+"/"+action, 
	 data: params,
	 type: 'post',                  
	 async: false,
	 dataType: 'jsonp',
	 timeout: 5000,
	 crossDomain: true,
	 beforeSend: function() {
		if(ajax_request != null) {			 	
		   /*abort ajax*/
		   hideAllModal();	
           ajax_request.abort();
           clearTimeout(timer);
		} else {
			timer = setTimeout(function() {
				hideAllModal();				
				ajax_request.abort();
	            toastMsg( getTrans('Request taking lot of time. Please try again','request_taking_lot_time')  );	            
	        }, 20000);
		}
	},
	complete: function(data) {					
		ajax_request=null;  		
	},
	success: function (data) {	  
		dump(data);
		done();
		if (data.code==1){					
			displayOrders(data.details.data,div_id);			
		} else if(data.code==3){
									
		} else {
			// failed response
			notyAlert(data.msg,"error");
			$("#new-orders").html('');
		}
	},
	error: function (request,error) {	        
				
	}
   });       				
   
   ajax_request.always(function() {
       dump( "second complete" );
       ajax_request=null;  
       clearTimeout(timer);
   });		
}

function GetTodaysOrder()
{	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;
	callAjax("GetTodaysOrder",params);
	
}

function getDetalhesImpressao()
{	
	var order_id=$("#order_id").val(); 
	callAjax('printsunmi','order_id='+order_id);
}

function getPendingOrders()
{	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;
	callAjax("GetPendingOrders",params);
		
}

function getGetAllOrders()
{	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;
	callAjax("GetAllOrders",params);
		
}

function getMerchantInfoStorage()
{
	var info =  JSON.parse( getStorage("merchant_info") );	
	return info;
}

function displayOrders(data,div_id)
{
	
	try {
	
	var icon_trans_type=''; var icons=''; var icons2='';
	var htm='';
	$.each( data, function( key, val ) {        		  		  
		//dump(val);
		
		if(!empty(val.cancel_order)){
		   htm+='<ons-list-item class="stic-list-item" modifier="tappable" onclick="reviewOrder('+val.order_id+');">';	
		} else {
		   htm+='<ons-list-item class="stic-list-item" modifier="tappable" onclick="viewOrder('+val.order_id+');">';
		}
		
		htm+='<ons-row class="row-with-pad">';
				
		icon_trans_type = getTransactionTypeIcons( val.trans_type_raw );
		
		var new_tag='';
		if (val.viewed==1){
			new_tag='<div class="new-tag rounded">'+ getTrans('new','new') +'</div>';
		}
		
		htm+='<ons-col width="25%" class="center" >';
		   htm+=new_tag;
		   htm+='<div class="delivery-icon">';
			// htm+='<ons-icon icon="'+icon_trans_type+'" class="icon rounded"></ons-icon>';
			htm+='<img src="'+icon_trans_type+'" style="max-width:90%; background: rgba(0,0,0,0.04); border-radius: 10px;" alt="" title="">';
		   htm+='</div>';
		htm+='</ons-col>';
		
		/*icons='fa-exclamation-triangle';
		icons2='';*/
		var icon=getOrderIcons(val.status_raw);
		var icons=icon.icons;
		var icons2=icon.classname;
								
		htm+='<ons-col class="stic-row-pad">';
		   htm+='<p class="margin2 small-font-dim small-font-dim-smaller red mybold stic-order">'+ getTrans('Order No','order_#')+' '+val.order_id+'</b></p>';
		   htm+='<p class="margin2 nospacing uppercase small-font-dim small-font-dim-smaller concat-text bold stic-name">'+val.customer_name+'</p>';
		   htm+='<p class="margin2 small-font-dim small-font-dim-smaller stic-date">'+val.delivery_date+'</p>';
		   htm+='<p class="status line15 margin2 '+ val.status_raw +' ">';
		   //htm+='<ons-icon icon="'+icons+'" class="icon '+icons2+'"></ons-icon>';
		   htm+=val.status;
		   htm+='</p>';
		 htm+='</ons-col>';

		
		 htm+='<ons-col width="25%" style="margin-right:-5px;" class="stic-top10 center" >';
		   htm+='<price class="pricemargin">'+val.total_w_tax_prety+'</price>';
		   htm+='<p class="small-font-dim orange-text">';
		   if(val.delivery_asap_raw!=1){
		   if (!empty(val.delivery_time)){
		     htm+='<ons-icon icon="ion-android-alarm-clock" class="stic-datetime icon" style="padding-right: 3px;"></ons-icon>';
		     htm+='<span class="stic-datetime">'+val.delivery_time+'</span>';
			   }
		   }
		   if(val.delivery_asap_raw==1){
		   if (!empty(val.delivery_asap)){
		     // htm+='<ons-icon icon="ion-android-alarm-clock" class="icon"></ons-icon>';		   
		     htm+=' '+val.delivery_asap;
			   }
		   }
		   htm+='</p>';
		 htm+='</ons-col>';
		 
		htm+='</ons-row>';
		htm+='</ons-list-item>';
	});	
	//createElement('new-orders',htm);
	
	createElement(div_id,htm);
	
	} catch(err) {
   	   dump(err.message);       
    } 
		
}

function getOrderIcons(status_raw)
{
	icons='fa-exclamation-triangle';
	icons2='';
	switch (status_raw)
	{
		case "decline":
	    icons='ion-close-circled';
	    icons2='icon-red';
		break;
		
		case "accepted":
		icons='ion-checkmark-round';
		icons2='icon-green';
		break;
		
		case "delivered":
		icons='ion-ios-checkmark';
		icons2='icon-green';
		break;
		
		case "pending":
		icons='fa-exclamation-triangle';
		icons2='icon-orange';
		break;
		
		default:
		icons='';
		icons2='';
		break;
		
	}
	return {
		'icons':icons,
		'classname':icons2
	};
}

function getTransactionTypeIcons(trans_type_raw)
{
	var icon_trans_type='';
	if ( trans_type_raw=="delivery"){
		icon_trans_type='css/images/delivery-truck.png';
	} else {
		icon_trans_type='css/images/shopping-bag.png';
	}
	return icon_trans_type;
}

function notyAlert(msg,alert_type)
{
	
	if (!isDebug()){
		toastMsg( msg );
		return ;
	}
		
	// type = warning or success
	var n = noty({
		 text: msg,
		 type        : alert_type ,		 
		 theme       : 'relax',
		 layout      : 'bottomCenter',		 
		 timeout:3000,
		 killer: true, 
		 animation: {
	        open: 'animated fadeInUp', // Animate.css class names
	        close: 'animated fadeOut', // Animate.css class names	        
	    }
	});
}

var view_order_page_bol;

function viewOrder(order_id)
{	
	dump("view_order_page_bol->"+view_order_page_bol);
	if (empty(view_order_page_bol)){
		dump('view_order_page_bol');
		view_order_page_bol=true;
	} else {
		return;
	}
	
	dump(order_id);
	
	var options = {
      animation: 'slide',
      onTransitionEnd: function() { 
      	
      	 $("#order-details-page-title").html( getTrans("Getting order details..",'getting_order_details') );
      	
      	 var info=getMerchantInfoStorage();	
		 var params="token="+getStorage("merchant_token");
	 	 params+="&user_type="+info.user_type;
	 	 params+="&mtid="+info.merchant_id;	 	 
	 	 params+="&order_id="+order_id;	 	 
	 	 params+="&backend=true";	
	 	 $(".order_id").val(order_id);	 	 
		 callAjax("OrderdDetails",params);
      } 
   };
   kNavigator.pushPage("displayOrder.html", options);   
}

function acceptOrder()
{
	var order_id=$(".order_id").val();
	var trans_type=$(".trans_type").val();
	dump("order_id->"+order_id);
	dump("trans_type->"+trans_type);
	
	var options = {
      animation: 'none',
      onTransitionEnd: function() { 
      	   $(".order_id").val(order_id);
      	   if ( trans_type=="delivery"){
      	   	   $(".delivery-notes").html( getTrans("We'll send a confirmation including delivery time to your customer",'send_confirm_msg') );        
      	   	   $(".delivery_time").attr("placeholder", getTrans("Delivery Time",'delivery_time') );
      	   } else {
      	   	   $(".delivery-notes").html( getTrans("We'll send a confirmation including pickup time to your customer",'send_cinfirm_pickup'));        
      	   	   $(".delivery_time").attr("placeholder",getTrans("Pickup Time",'pickup_time') );
      	   }      	   
      	   
      	   if(!empty(getStorage("delivery_time") && getStorage("delivery_time")!="false" )){      	      
      	      $(".delivery_time").val( getStorage("delivery_time") );
      	   }
      	   
      } 
   };
   kNavigator.pushPage("acceptOrderForm.html", options);				
}

function displayOrderDetails(data)
{
	
	var icon = getTransactionTypeIcons( data.trans_type_raw );
	//var header='<ons-icon icon="'+icon+'"></ons-icon> ';
	//header+=data.transaction_date;		
	createElement("order-details-page-title",'');
	
	/*client and orderinfo*/
	var icons=getOrderIcons(data.status_raw);
		
	
	$(".trans_type").val( data.trans_type_raw ) ;
		
	if (data.trans_type_raw=="delivery"){
		setStorage("delivery_time",data.delivery_time);
	} else {
		//setStorage("delivery_time",'');
		setStorage("delivery_time",data.delivery_time);
	}
	var html='';
	var html='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col><p class="status line15 margin2 '+data.status_raw+' ">'+data.status+'</p></ons-col>';
        html+='<ons-col class="text-right">'+getTrans("Order No",'order_no')+' : '+data.order_id+'</ons-col>';
        html+='</ons-row>';
     html+='</ons-list-header>';
     
     html+='<ons-list-item>';
       html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-person"></ons-icon> <span class="stic-bold">'+data.client_info.full_name+'</span>';
     html+='</ons-list-item>';
     
     if ( !empty(data.client_info.contact_phone)){
     html+='<ons-list-item>';
     html+='<ons-row>';
     html+='<ons-col>';
     html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-ios-telephone"></ons-icon> <a href="tel:'+data.client_info.contact_phone+'">'+ data.client_info.contact_phone+"</a>";
     html+='</ons-col>';
     
     /*html+='<ons-col class="text-right">';
     html+='<ons-button modifier="quiet" onclick="YourPrintFunctinns()" class="view-location">';
     html+= getTrans("Print",'print') + '</ons-button>';
     html+='</ons-col>';*/
     
     html+='</ons-row>';
     html+='</ons-list-item>';
     }
     
     //if ( !empty(data.client_info.address)){
     dump(data.trans_type_raw);
     if (data.trans_type_raw=="delivery"){
	     var address = "'"+data.client_info.address+"'";    
	     var lat_lng = "'"+data.client_info.delivery_lat+"'," + "'"+data.client_info.delivery_lng+"'," + "'"+data.client_info.address+"'";    
	     html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="21px"><ons-icon class="stic-ccc" icon="ion-ios-location"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+data.client_info.address+'</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-button modifier="quiet" onclick="viewLocationNew('+lat_lng+')" class="stic-location">';
	          html+= getTrans("View Location",'view_location') + '</ons-button>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';
     }
          
     html+=TPLorderRow( getTrans("TRN Type",'trn_type') ,  data.trans_type);
     html+=TPLorderRow( getTrans("Payment Type",'payment_type') ,  data.payment_type);
     
     //if( data.payment_type=="PYR" || data.payment_type=="pyr"){
     if( data.payment_type_raw=="PYR" || data.payment_type_raw=="pyr"){
     	html+=TPLorderRow( getTrans("Card#",'card_number') ,  data.payment_provider_name);
     }
     //if( data.payment_type=="OCR" || data.payment_type=="ocr"){
     if( data.payment_type_raw=="OCR" || data.payment_type_raw=="ocr"){
     	html+=TPLorderRow( getTrans("Card#",'card_number') , data.credit_card_number );
     	/*html+=TPLorderRow( getTrans("CVV",'cvv') , data.cvv );
     	html+=TPLorderRow( getTrans("Expiry date",'expiry_date') , data.expiry_date );*/
     }
     
     if ( data.trans_type_raw=="delivery"){
        html+=TPLorderRow( getTrans("Delivery Date",'delivery_date') ,  data.delivery_date);     
     } else if ( data.trans_type_raw == "dinein") {
     	html+=TPLorderRow( getTrans("Dine in Date",'dinein_date') ,  data.delivery_date);     
     } else {
     	html+=TPLorderRow( getTrans("Pickup Date",'pickup_date') ,  data.delivery_date);     
     }
          
     if(data.delivery_asap_raw!=1){
	     if (!empty(data.delivery_time)){
	     	 if ( data.trans_type_raw=="delivery"){
	            html+=TPLorderRow( getTrans("Delivery Time",'delivery_time') ,  data.delivery_time);
	          } else if ( data.trans_type_raw == "dinein") {
	          	html+=TPLorderRow( getTrans("Dine in Time",'dinein_time') ,  data.delivery_time);
	     	 } else {
	     	 	html+=TPLorderRow( getTrans("Pickup Time",'pickup_time') ,  data.delivery_time);
	     	 }
	     }
     }
     
     if ( data.trans_type_raw=="dinein"){     	
     	html+=TPLorderRow( getTrans("Number of guest",'number_of_guest') ,  data.dinein_number_of_guest );
     	html+=TPLorderRow( getTrans("Table number",'table_number') ,  data.dinein_table_number );
     	html+=TPLorderRow( getTrans("Special instructions",'special_instructions') , data.dinein_special_instruction );
     }
     
     if (!empty(data.delivery_asap)){
     	 if(data.delivery_asap_raw==1){
            html+=TPLorderRow( getTrans("Delivery Asap",'delivery_asap') ,  data.delivery_asap);
     	 }
     }
     
     if ( data.trans_type_raw=="delivery"){
        html+=TPLorderRow( getTrans("Delivery Instruction",'delivery_instructions') ,  data.delivery_instruction);     
	
	//Atualização MasterHub (CPF na nota)
        html+=TPLorderRow( getTrans("CPF na Nota?",'cpf_nota') ,  data.cpf_nota);     
        html+=TPLorderRow( getTrans("Location Name",'location_name') ,  data.client_info.location_name);     
     }
     
     if (!empty(data.total.order_change)){
         html+=TPLorderRow( getTrans("Change",'change') ,  data.total.order_change );
     }
	//Atualização MasterHub (Sistema de Fidelidade)
				    if (data.merchant_enabled_fidelidade=="yes"){
				if (data.pedido_info.fidelidade_owner!=null){
     html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col>'+ getTrans("Programa de Fidelidade",'fidelidade_details') +'</ons-col>';        
        html+='</ons-row>';
     html+='</ons-list-header>';
					if (data.pedido_info.premio_adicional!=""){
		html+='<ons-list-item>';
			html+='<p class="center" style="margin-top: -7px; margin-bottom: -20px;">';
				html+=getTrans("Enviar ao cliente junto com este pedido!",'enviar_ao_cliente_junto_pedido');	
			html+='</p>';
			html+='<ons-row>';			
	        html+='<ons-col size="30px"><ons-icon icon="ion-trophy"></ons-icon></ons-col>';        
	        html+='<ons-col class="">'+data.pedido_info.premio_adicional+'</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';	
					}
					if (data.pedido_info.quant_pedidos===0){
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-ios-star"></ons-icon></ons-col>';        
	        html+='<ons-col class="center">'+ getTrans("Primeiro pedido deste cliente!",'nenhum_pedido_realizado') +'</ons-col>';
	        html+='<ons-col class="text-right" size="30px"><ons-icon icon="ion-ios-star"></ons-icon></ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';
					} else {
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-android-cart"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+ getTrans("Pedidos realizados",'cliente_pedidos_realizados') +':</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-col class="fixed-col">'+data.pedido_info.quant_pedidos+'</ons-col>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';					
					}
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-pricetags"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+ getTrans("Este cliente ja gastou!",'cliente_ja_gastou') +':</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-col class="fixed-col">'+prettyPrice(data.pedido_info.gasto_total)+'</ons-col>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';			
		
		/* html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-pie-graph"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+ getTrans("Pedido feito por",'cliente_pedidos_feito_por') +':</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-col class="fixed-col">'+ getTrans(data.pedido_info.request_from, data.pedido_info.request_from) +'</ons-col>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>'; */
			
				} else {
     html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col>'+ getTrans("Informacoes do Cliente",'cliente_details') +'</ons-col>';        
        html+='</ons-row>';
     html+='</ons-list-header>';
					
					if (data.pedido_info.quant_pedidos==0){
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-ios-star"></ons-icon></ons-col>';        
	        html+='<ons-col class="center"><span style="text-align:center; font-size: 16px;">'+ getTrans("Primeiro pedido deste cliente!",'nenhum_pedido_realizado') +'</span></ons-col>';
	        html+='<ons-col class="text-right" size="30px"><ons-icon icon="ion-ios-star"></ons-icon></ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';
					} else {
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-android-cart"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+ getTrans("Pedidos realizados",'cliente_pedidos_realizados') +':</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-col class="fixed-col">'+data.pedido_info.quant_pedidos+'</ons-col>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';
						
		html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-pricetags"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+ getTrans("Este cliente ja gastou!",'cliente_ja_gastou') +':</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-col class="fixed-col">'+prettyPrice(data.pedido_info.gasto_total)+'</ons-col>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';			
		
					}		
		/* html+='<ons-list-item>';
	     html+='<ons-row>';
	        html+='<ons-col size="30px"><ons-icon icon="ion-pie-graph"></ons-icon></ons-col>';        
	        html+='<ons-col class="fixed-col">'+ getTrans("Pedido feito por",'cliente_pedidos_feito_por') +':</ons-col>';
	        html+='<ons-col class="text-right">';
	          html+='<ons-col class="fixed-col">'+ getTrans(data.pedido_info.request_from, data.pedido_info.request_from) +'</ons-col>';
	        html+='</ons-col>';
	       html+='</ons-row>';  
	     html+='</ons-list-item>';	*/			
				}
					}
     createElement("order-details",html);
          
     /*display the order items*/
     var html='';
     /*html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col>'+ getTrans("Total",'total') +'</ons-col>';
        html+='<ons-col class="text-right">'+data.total.total+'</ons-col>';
        html+='</ons-row>';
     html+='</ons-list-header>';*/
     
     html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col>'+ getTrans("Order Details",'order_details') +'</ons-col>';        
        html+='</ons-row>';
     html+='</ons-list-header>';
     
     html+=data.html;
     
     var show_manual_item = false;
     
     if(show_manual_item){
     	
     if (!empty(data.item)){
     	$.each( data.item , function( key, val ) {       		  
     		  var price=val.normal_price;
     		  if (val.discounted_price>0){
     		  	  price=val.discounted_price
     		  }
     		  
     		  //var final_price=parseInt(val.qty)*parseFloat(price)
     		  var final_price = val.total_price; 
     		  /*if (isNaN(final_price)){
     		  	 final_price=0;
     		  }*/
     		       		  
     		  description = val.qty+"x "+ price+ " " + val.item_name ;
     		  if (!empty(val.size_words)){
     		  	 description+=" ("+val.size_words+")";
     		  }
     		  
     		  if (!empty(val.cooking_ref)){
     		  	 description+='<br/>'+val.cooking_ref
     		  }
     		  
     		  if (!empty(val.order_notes)){
     		  	 description+='<br/>'+val.order_notes
     		  }
     		       		  
     		  //final_price=displayPrice(data.currency_position, data.total.curr , final_price);
     		  html+=TPLorderRow( description ,  final_price , 'fixed-col bold' );     
     		  
     		  /*ingredients*/
     		  if (!empty(val.ingredients)){
     		  	  if ( val.ingredients.length>0){
	     		  	  html+='<ons-list-header>'+ getTrans("Ingredients",'ingredients') +'</ons-list-header>';
	     		  	  $.each( val.ingredients , function( key1, ingredients ) {       		  	  	  
	     		  	  	  html+=TPLorderRow( ingredients ,  '' );     
	     		  	  });	
     		  	  }
     		  }
     		  
     		  /*sub item*/
     		  var addon='';
     		  if (!empty(val.sub_item_new)){     		  	  
 		  	  	  $.each( val.sub_item_new , function( key2, sub_item ) {  
 		  	  	  	  html+='<ons-list-header>'+key2+'</ons-list-header>';  
 		  	  	  	  if ( sub_item.length>0){
 		  	  	  	  	  $.each( sub_item , function( key3, sub_items ) {  
 		  	  	  	  	  	  t_desc=sub_items.addon_qty+"x "+sub_items.addon_price+" "+sub_items.addon_name;
 		  	  	  	  	  	  html+=TPLorderRow( t_desc ,  sub_items.total , 'fixed-col' );     
 		  	  	  	  	  });
 		  	  	  	  }
 		  	  	  });     		  	  
     		  }
     		  
     	});	
     }
     
     html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col></ons-col>';        
        html+='</ons-row>';
     html+='</ons-list-header>';
     
     if ( !empty(data.total)){
     	
     	if (!empty(data.total.discounted_amount)){
     		html+=TPLorderRow( getTrans("Discount",'discount') +" "+ data.total.discount_percentage , "("+data.total.discounted_amount1 +")");
     		
     		if (!empty(data.total.points_discount)){
     			if (data.total.points_discount>0){
     				html+=TPLorderRow( getTrans("Points Discount",'point_discount'),"("+data.total.points_discount1 +")");
     			}
     		}
     		
     		html+=TPLorderRow( getTrans("Sub Total",'sub_total') ,  data.total.subtotal );
     		
     	} else {
     		
     		if (!empty(data.total.points_discount)){
     			if (data.total.points_discount>0){
     				html+=TPLorderRow( getTrans("Points Discount",'point_discount'),"("+data.total.points_discount1 +")");
     			}
     		}
     		
     		html+=TPLorderRow( getTrans("Sub Total",'sub_total') ,  data.total.subtotal );
     	}
     	                  
        if (!empty(data.total.voucher_amount)){
         	if (data.total.voucher_amount>0){
         		
         		if ( data.total.voucher_type=="percentage"){
         		   html+=TPLorderRow( getTrans("Less Voucher",'less_voucher') + " " + data.total.voucher_percentage , "("+data.total.voucher_amount1 +")");
         		} else {
         		   html+=TPLorderRow( getTrans("Less Voucher",'less_voucher') , "("+data.total.voucher_amount1 +")");
         		}
         		
         		html+=TPLorderRow( getTrans("Sub Total (after less voucher)",'sub_total_after_voucher') ,  data.total.subtotal2 ,'fixed-col');
         	}
         }
         
	//Atualização MasterHub (Sistema Fidelidade)
        if (!empty(data.total.fidelidade_amount)){
         	if (data.total.fidelidade_amount>0){
         		
         		if ( data.total.fidelidade_type=="percentage"){
         		   html+=TPLorderRow( getTrans("Less Fidelidade",'less_fidelidade') + " " + data.total.fidelidade_percentage , "("+data.total.fidelidade_amount1 +")");
         		} else {
         		   html+=TPLorderRow( getTrans("Less Fidelidade",'less_fidelidade') , "("+data.total.fidelidade_amount1 +")");
         		}
         		
         		html+=TPLorderRow( getTrans("Sub Total (after less fidelidade)",'sub_total_after_fidelidade') ,  data.total.subtotal2 ,'fixed-col');
         	}
         }
         
         if (!empty(data.total.delivery_charges)){
             html+=TPLorderRow( getTrans("Delivery Fee",'delivery_fee') ,  data.total.delivery_charges );
         }
         
         if (!empty(data.total.merchant_packaging_charge)){
             html+=TPLorderRow( getTrans("Packaging",'packaging') ,  data.total.merchant_packaging_charge );
         }
                  
         if (!empty(data.total.taxable_total)){
             html+=TPLorderRow( getTrans("Tax",'tax') +" " +  data.total.tax_amt ,  data.total.taxable_total );
         }
                  
         if (!empty(data.total.cart_tip_value)){
             html+=TPLorderRow( getTrans("Tips",'tips')  ,  data.total.cart_tip_value );
         }         
     }
     
     html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+='<ons-col>'+ getTrans("Total",'total') +'</ons-col>';
        html+='<ons-col class="text-right">'+data.total.total+'</ons-col>';
        html+='</ons-row>';
     html+='</ons-list-header>';         
     
     } // end show manual item
     
     app_decline_order_status = getStorage("app_decline_order_status");
     
     // button d2
     if ( data.status_raw=="pending"){
     	$(".actions-1").show();
     	$(".actions-2").hide();
     	$(".actions-3").hide();
     	$(".actions-4").hide();
     	
     } else if  ( data.status_raw==app_decline_order_status){
     	
     	$(".actions-1").hide();
     	$(".actions-2").show();
     	$(".actions-3").hide();
     	$(".actions-4").hide();
     		
     } else {
     	
     	if ( data.driver_app==1){
     		
     	   $(".task_id").val( data.task_id );
     	   
     	   setStorage("icon_location", data.icon_location);
     	   setStorage("icon_driver", data.icon_driver);
     	   setStorage("icon_dropoff", data.icon_dropoff);
     	   
     	   setStorage("driver_profilepic", data.driver_profilepic);
     	   setStorage("time_left", data.time_left);
     	  
     	   switch ( data.task_status)
     	   {
     	   	  case "unassigned":
			  case "assigned":			
			  case "declined": 
				  if (data.driver_id>0){
		     	   	  $(".assign_driver_label").html( getTrans("Re-assigned Driver",'re_assigned_driver') );
		     	   	  $("#assign_driver_label").val( getTrans("Re-assigned Driver",'re_assigned_driver') );
		     	   } else {
		     	   	  $(".assign_driver_label").html( getTrans("Assigned Driver",'assigned_driver') );
		     	   	  $("#assign_driver_label").val( getTrans("Assigned Driver",'assigned_driver') );
		     	   }     	   
		     	   
		     	   $(".actions-3").show();
     	           $(".actions-2").hide();
     	           $(".actions-1").hide();     	   
     	           $(".actions-4").hide();
			  break;
			  
			  case "acknowledged": 
			  case "started":
			  case "inprogress":
			  
			     $(".assign_driver_label").html( getTrans("Track Order",'track_order') );
		     	 $("#assign_driver_label").val( getTrans("Track Order",'track_order') );
		     	 
		     	 $(".actions-4").show();
		     	 $(".actions-3").hide();
     	         $(".actions-2").hide();
     	         $(".actions-1").hide();     	
     	              	         
     	         if ( !empty(data.task_info) ){
     	         	$(".task_lat").val( data.task_info.task_lat);
     	         	$(".task_lng").val( data.task_info.task_lng);
     	         	$(".task_address").val( data.task_info.delivery_address);
     	         	
     	         	$(".drop_address").val( data.task_info.drop_address);
     	         	$(".dropoff_lat").val( data.task_info.dropoff_lat);
     	         	$(".dropoff_lng").val( data.task_info.dropoff_lng);
     	         }
     	         if ( !empty(data.driver_info) ){
     	         	$(".driver_lat").val( data.driver_info.location_lat);
     	         	$(".driver_lng").val( data.driver_info.location_lng);
     	         	
     	         	var driver_name='';
     	         	if (!empty(data.driver_info.first_name)){
     	         		driver_name=data.driver_info.first_name + " ";
     	         		
     	         	}
     	         	if (!empty(data.driver_info.last_name)){
     	         		driver_name+=data.driver_info.last_name;
     	         		
     	         	}
     	         	$(".driver_name").val( driver_name );
     	         	$(".driver_phone").val( data.driver_info.phone);
     	         	$(".driver_location").val( data.driver_info.formatted_address);     	         	
     	         	$(".driver_id").val( data.driver_info.driver_id);
     	         	     	         	
     	         }     	            
			  break;			  
			  
			  default:
			    $(".actions-1").hide();
     	        $(".actions-2").show();
     	        $(".actions-3").hide();
     	        $(".actions-4").hide();
			  break;
     	   }	
     	   
     	} else {
     	   $(".actions-2").show();
     	   $(".actions-1").hide();
     	   $(".actions-3").hide();
     	   $(".actions-4").hide();
     	}     	
     }
          
     createElement("order-details-item",html);     
}

function TPLorderRow(label , value, label_class)
{
	 var html='';	
	 html+='<ons-list-item>';
       html+='<ons-row>';
        html+='<ons-col class="stic-bold '+label_class+'">'+label+'</ons-col>';
        html+='<ons-col class="text-right">'+value+'</ons-col>';
       html+='</ons-row>';
     html+='</ons-list-item>';
     return html
}

function displayPrice(currency_position, currency ,price)
{
	if ( currency_position=="right"){
		return price+" "+currency;
	} else {
		return currency+" "+price;
	}
}

	//Atualização MasterHub (Personalizações)
function prettyPrice( price )
{
	dump(price);
	
	var decimal_place = 2;		
	var currency_position= "left";
	var currency_symbol = "R$";
	var thousand_separator = ".";
	var decimal_separator = ",";	
			
	dump("decimal_place=>"+decimal_place);	
	dump("currency_symbol=>"+currency_symbol);
	dump("thousand_separator=>"+thousand_separator);
	dump("decimal_separator=>"+decimal_separator);
	dump("currency_position=>"+currency_position);
		
	price = number_format(price,decimal_place, decimal_separator ,  thousand_separator ) ;
	
	if ( currency_position =="left"){
/*Atualização Master Hub (Separar o símbolo da moeda do valor)*/
		return currency_symbol+" "+price;
	} else {
		return price+" "+currency_symbol;
/*Fim da atualização*/
	}
}
function number_format(number, decimals, dec_point, thousands_sep) 
{
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

function orderConfirm()
{
	$.validate({ 	
	    form : '#frm-acceptorder',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-acceptorder").serialize();	      
	      
	      var info=getMerchantInfoStorage();	
	      params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;	 	 
	 	 
	      callAjax("AcceptOrdes",params);	       
	      return false;
	    }  
	});	
}

function declineOrder()
{
	var order_id=$(".order_id").val();
	var trans_type=$(".trans_type").val();
	dump("order_id->"+order_id);
	dump("trans_type->"+trans_type);
	
	var options = {
      animation: 'none',
      onTransitionEnd: function() {
      	  $(".order_id").val( order_id );
      } 
   };
   kNavigator.pushPage("declineOrderForm.html", options);				
}

function declineConfirm()
{
	
	var params = $( "#frm-decline").serialize();	      	      
    var info=getMerchantInfoStorage();	
    params+="&token="+getStorage("merchant_token");
    params+="&user_type="+info.user_type;
    params+="&mtid="+info.merchant_id;	 	 
	 
    callAjax("DeclineOrders",params);	       
}

function changeOrderStatus()
{
	var order_id=$(".order_id").val();
	var trans_type=$(".trans_type").val();
	dump("order_id->"+order_id);
	dump("trans_type->"+trans_type);
	
	var options = {
      animation: 'none',
      onTransitionEnd: function() {
      	  $(".order_id").val( order_id );
      	  var info=getMerchantInfoStorage();	      	  
		  var params="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;	 	 			 
		  params+="&order_id="+order_id;
		 callAjax("StatusList",params);	       
      } 
   };
   kNavigator.pushPage("changesStatus.html", options);				
		
}

function statusList(data)
{
	var htm='';
	htm+='<ons-list-header class="list-header">'+ getTrans('Select Status','select_status') +'</ons-list-header>';	
	htm+='<ons-list class="pad-top10">';	
	$.each( data.status_list, function( key, val ) {    

		ischecked='';
		if ( key==data.status){
			ischecked='checked="checked"';
		}
		 
		htm+='<ons-list-item style="background:white; padding-left:25px;" modifier="tappable">';
		 htm+='<label class="radio-button checkbox--list-item">';
			htm+='<input type="radio" name="status" class="status" value="'+key+'" '+ischecked+' >';
			htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
			htm+='<span class="stic-status">'+val+'</span>';
		  htm+='</label>'; 
		htm+='</ons-list-item>';
	});	
	htm+='</ons-list>';	
	
	createElement('status-list',htm);	
}

function changeStatus()
{
	$.validate({ 	
	    form : '#frm-changestatus',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-changestatus").serialize();	      
	      
	      var info=getMerchantInfoStorage();	
	      params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;
		  	 	 
	      callAjax("ChangeOrderStatus",params);	       
	      return false;
	    }  
	});	
}

function showLanguageList()
{
	if (typeof languageOptions === "undefined" || languageOptions==null || languageOptions=="" ) { 	    
		ons.createDialog('languageOptions.html').then(function(dialog) {
	        dialog.show();
	        translatePage();
	    });	
	} else {
		languageOptions.show();		
	}	
}


function displayLanguageSelection(data)
{
	var selected = getStorage("mt_default_lang");
	dump("selected=>"+selected);	
	var htm='';
	htm+='<ons-list>';
	htm+='<ons-list-header class="list-header trn" data-trn-key="language">'+ getTrans("Language",'language') +'</ons-list-header>';
	$.each( data, function( key, val ) {        		  		  		
		ischecked='';
		if ( val==selected){
			ischecked='checked="checked"';
		}
		htm+='<ons-list-item modifier="tappable" onclick="setLanguage('+"'"+val+"'"+');">';
		 htm+='<label class="radio-button checkbox--list-item">';
			htm+='<input type="radio" name="country_code" class="country_code" value="'+val+'" '+ischecked+' >';
			htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
			htm+=' '+val;
		  htm+='</label>'; 
		htm+='</ons-list-item>';
	});		
	htm+='</ons-list>';	
	createElement('language-options-list',htm);	
	translatePage();
}

function setLanguage(lang_id)
{
	dump(lang_id);
	dump( getStorage("translation") );
	if (typeof getStorage("mt_translation") === "undefined" || getStorage("mt_translation")==null || getStorage("mt_translation")=="" ) { 	
	   languageOptions.hide();   
       ons.notification.confirm({
		  message: 'Language file has not been loaded, would you like to reload?',		  
		  title: dialog_title_default ,
		  buttonLabels: ['Yes', 'No'],
		  animation: 'none',
		  primaryButtonIndex: 1,
		  cancelable: true,
		  callback: function(index) {
		     if ( index==0 || index=="0"){
		     	getLanguageSettings();		     	
		     } 
		  }
		});
		return;
	}	
		
	if ( getStorage("mt_translation").length<=5 ){	
		onsenAlert("Translation file is not yet ready.");	
		return;
	}
	
	if ( !empty(lang_id) ){	   
	   setStorage("mt_default_lang",lang_id);
	   if ( !empty(translator)){
	       translator.lang(lang_id);
	   } else {
	   	   translator = $('body').translate({lang: lang_id, t: dictionary});
	   }	   
	}
}

function saveSettings()
{
	var params = $( "#frm-settings").serialize();	 
	
	var info=getMerchantInfoStorage();	
	params+="&token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;
	params+="&merchant_device_id="+getStorage("merchant_device_id");
		  
	callAjax("saveSettings",params);	    
}

function viewLocation(address)
{
	dump(address);
	var options = {
      animation: 'none',
      onTransitionEnd: function() {       
      	  $("#location-address").html(address);	 
      	  var params="address="+address;
      	  callAjax("geoDecodeAddress",params);
      } 
   };
   kNavigator.pushPage("map.html", options);				
}

function initMap(data)
{
	dump(data);	
	if ( !empty(data)){
		var map = new GoogleMap();	
	    map.initialize('location-map', data.lat, data.lng , 15);
	} else {
		$("#location-map").hide();
		notyAlert("location not available",'error' );
	}
}

function forgotPassword()
{
	$.validate({ 	
	    form : '#frm-forgotpass',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-forgotpass").serialize();	      
	      callAjax("ForgotPassword",params);	       
	      return false;
	    }  
	});	
}

function changePassWord()
{
    $.validate({ 	
	    form : '#frm-changepassword',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-changepassword").serialize();	      
	      callAjax("ChangePasswordWithCode",params);	       
	      return false;
	    }  
	});	
}

function viewHistory()
{
   var order_id=$("#order_id").val();
    dump(order_id);
        
    
	var options = {
      animation: 'none',
      onTransitionEnd: function() {    
	//Atualização MasterHub (Tradução)
      	 $(".order-history-title").html(getTrans('Getting history...','getting_history...'));
      	 var info=getMerchantInfoStorage();	
      	 var params='';
			 params+="&token="+getStorage("merchant_token");
			 params+="&user_type="+info.user_type;
			 params+="&mtid="+info.merchant_id;
			 params+="&order_id="+order_id;      	 
	     callAjax("OrderHistory",params);	             	   	     	
      } 
   };
   kNavigator.pushPage("orderHistory.html", options);				
}

function displayHistory(data)
{
	var htm='<ons-list-header class="header">';
	htm+='<ons-row>';
	  htm+='<ons-col class="fixed-col">'+ getTrans("Date/Time",'date_time')  +'</ons-col>';
	  htm+='<ons-col class="fixed-col">'+ getTrans("Status",'status') +'</ons-col>';
	  htm+='<ons-col class="fixed-col">'+ getTrans("Remarks",'remarks') +'</ons-col>';
	htm+='</ons-row>';
	htm+='</ons-list-header>';
	
	$.each( data, function( key, val ) {
		
		htm+='<ons-list-item>';
		   htm+='<ons-row>';
			htm+='<ons-col class="fixed-col">'+val.date_created+'</ons-col>';
			htm+='<ons-col class="fixed-col"><span class="status line15 margin2 '+val.status_raw+' " >'+val.status+'</span></ons-col>';
			htm+='<ons-col class="fixed-col">'+val.remarks+'</ons-col>';
		  htm+='</ons-row>';
		htm+='</ons-list-item>';
		
	});
		
	createElement('order-history',htm);
}

function saveProfile()
{
	$.validate({ 	
	    form : '#frm-profile',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-profile").serialize();		      
	      var info=getMerchantInfoStorage();	      	 
		  params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;		  
	      callAjax("saveProfile",params);	       
	      return false;
	    }  
	});	
}

function getLanguageSettings()
{
	if ( !hasConnection() ){
		toastMsg( getTrans("Internet connection lost","net_connection_lost") );	
		$(".retry-language").show();
		return;
	}	
	
	var params='';	
	callAjax("getLanguageSettings", params );		
}

function translatePage()
{	
	dump("TranslatePage Functions");				
	if (typeof getStorage("mt_translation") === "undefined" || getStorage("mt_translation")==null || getStorage("mt_translation")=="" ) { 	   
		return;		
	} else {
		dictionary =  JSON.parse( getStorage("mt_translation") );
	}
	if (!empty(dictionary)){
		dump(dictionary);		
		var default_lang=getStorage("mt_default_lang");
		dump(default_lang);
		if (default_lang!="undefined" && default_lang!=""){
			dump("INIT TRANSLATE");
			translator = $('body').translate({lang: default_lang, t: dictionary});
			translateValidationForm();
	        translateForms();
		} 
	}				
}

function getTrans(words,words_key)
{
	var temp_dictionary='';
	/*dump(words);
	dump(words_key);	*/
	if (getStorage("mt_translation")!="undefined"){
	   temp_dictionary =  JSON.parse( getStorage("mt_translation") );
	}
	if (!empty(temp_dictionary)){
		//dump(temp_dictionary);		
		var default_lang=getStorage("mt_default_lang");
		//dump(default_lang);
		if (default_lang!="undefined" && default_lang!=""){
			//dump("OK");
			if ( array_key_exists(words_key,temp_dictionary) ){
				//dump('found=>' + words_key +"=>"+ temp_dictionary[words_key][default_lang]);				
				if(!empty(temp_dictionary[words_key][default_lang])){
				   return temp_dictionary[words_key][default_lang];
				}
			}
		}
	}	
	return words;
}

function array_key_exists(key, search) {  
  if (!search || (search.constructor !== Array && search.constructor !== Object)) {
    return false;
  }
  return key in search;
}

function translateValidationForm()
{
	$.each( $(".has_validation") , function() { 
		var validation_type = $(this).data("validation");
		
		switch (validation_type)
		{
			case "number":			
			$(this).attr("data-validation-error-msg",getTrans("The input value was not a correct number",'validation_numeric') );
			break;
			
			case "required":
			$(this).attr("data-validation-error-msg",getTrans("this field is mandatory!",'validaton_mandatory') );
			break;
			
			case "email":
			$(this).attr("data-validation-error-msg",getTrans("You have not given a correct e-mail address!",'validation_email') );
			break;
		}
		
	});
}

function translateForms()
{	
	var t='';
	$.each( $(".text-input") , function() { 
		var placeholder = $(this).attr("placeholder");			
		t = getTrans(placeholder, $(this).data("trn-key") );
	    $(this).attr("placeholder",t);
	});	
}

function showNotification(title, message, order_id)
{				
	if ( !isLogin() ){		
		return;
	}
	if (typeof pushDialog === "undefined" || pushDialog==null || pushDialog=="" ) { 	    
		ons.createDialog('pushNotification.html').then(function(dialog) {
			$(".push-title").html(title);
	        $(".push-message").html(message);
	        dialog.show();
	        $("#order_id").val( order_id );
	    });	
	} else {
		$(".push-title").html(title);
	    $(".push-message").html(message);
	    $("#order_id").val( order_id );
		pushDialog.show();
	}	
}

function showNotificationCampaign(title,message)
{			
	if ( !isLogin() ){
		return;
	}
	if (typeof pushcampaignDialog === "undefined" || pushcampaignDialog==null || pushcampaignDialog=="" ) { 	    
		ons.createDialog('pushNotificationCampaign.html').then(function(dialog) {
			$("#page-notificationcampaign .push-title").html(title);
	        $("#page-notificationcampaign .push-message").html(message);
	        dialog.show();
	    });	
	} else {
		$("#page-notificationcampaign .push-title").html(title);
	    $("#page-notificationcampaign .push-message").html(message);
		pushcampaignDialog.show();
	}	
}

function setHome2()
{	
	pushDialog.hide();
    var options = {     	  		  
  	   closeMenu:true,
       animation: 'slide'       
    };	   	   	   
    menu.setMainPage('home.html',options);
}

function isLogin()
{
	if (!empty(getStorage("merchant_token"))){
		return true;
	}
	return false;
}

function showNotificationPage()
{
   clearNotificationCount();      
   setNotificationDisplay();
   kNavigator.pushPage("showNotification.html", {
   	  animation: 'none',
   });				
}

function displayNotification(data)
{
	var htm='';
	$.each( data, function( key, val ) {        	
		  
		  /*if ( val.push_type=="order"){
		  	  var action='onclick="viewOrder('+val.order_id+')" ';
		  } else {
		  	
		  	  var str = nl2br(val.push_message);              
		  	  var campaign="'"+val.push_title+"',"+"'"+ str +"'" ;
		  	  var action='onclick="showNotificationCampaign('+campaign+')" ';
		  }*/
		  		  		 
		  htm+='<ons-list-item modifier="tappable" class="notification-action" data-text="'+val.push_message+'" data-type="'+val.push_type+'" data-orderid="'+val.order_id+'" data-bookingid="'+val.booking_id+'" data-title="'+val.push_title+'" >';
            htm+='<ons-row>';
              htm+='<ons-col width="90px" class="fixed-col" >';
              htm+=val.date_created
              htm+='</ons-col>';
              htm+='<ons-col class="fixed-col" >';
              htm+=val.push_title
              htm+='</ons-col>';
            htm+='</ons-row>';
         htm+='</ons-list-item>';
	});	
	createElement('notification',htm);
}

function pullNotification(done)
{	
	dump('pull');
	
	if ( !hasConnection() ){
		notyAlert(  getTrans("CONNECTION LOST",'connection_lost'),'error' );
		done();
		return;
	}
				
	var action= 'getNotification';
	var div_id= 'notification';
	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;
	params+="&lang_id="+getStorage("mt_default_lang");

	if(!empty(krms_config.APIHasKey)){
		params+="&api_key="+krms_config.APIHasKey;
	}
	
	dump(ajax_url+"/"+action+"/?"+params);	    
	
    ajax_request = $.ajax({
	 url: ajax_url+"/"+action, 
	 data: params,
	 type: 'post',                  
	 async: false,
	 dataType: 'jsonp',
	 timeout: 5000,
	 crossDomain: true,
	 beforeSend: function() {
		if(ajax_request != null) {			 	
		   /*abort ajax*/
		   hideAllModal();	
           ajax_request.abort();
		} 
	},
	complete: function(data) {					
		ajax_request=null;  		
	},
	success: function (data) {	  
		dump(data);
		done();
		if (data.code==1){					
			displayNotification(data.details);	
		} else if(data.code==3){
			notyAlert(data.msg,"error");					
		} else {
			// failed response
			notyAlert(data.msg,"error");
		}
	},
	error: function (request,error) {	        
				
	}
   });       				
}

function showSearchPopUp()
{
	if (typeof SearchPopUpDialog === "undefined" || SearchPopUpDialog==null || SearchPopUpDialog=="" ) { 
		ons.createDialog('SearchPopUp.html').then(function(dialog) {			
	        dialog.show();
	    });	
	} else {		
		$(".order_id_customername").val('');
		SearchPopUpDialog.show();
	}	
}

function searchOrder()
{
	$.validate({ 	
	    form : '#frm-search',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      	      
	      SearchPopUpDialog.hide();	      
	      var options = {
           animation: 'none',
		      onTransitionEnd: function() {    
		      	  var params = $( "#frm-search").serialize();
			      var info=getMerchantInfoStorage();	      	 	      
				  params+="&token="+getStorage("merchant_token");
				  params+="&user_type="+info.user_type;
				  params+="&mtid="+info.merchant_id;		  
			      callAjax("searchOrder",params);
		      } 
		   };
		   kNavigator.pushPage("searchResults.html", options);				
	      
	      return false;
	    }  
	});	
}

function closeApp()
{
	try {
		
		ons.notification.confirm({	   
		  message: getTrans('Are you sure to close the app?','close_app') ,	  
		  title: dialog_title_default ,
		  buttonLabels: [ getTrans('Yes','yes') ,  getTrans('No','no') ],
		  animation: 'default',
		  primaryButtonIndex: 1,
		  cancelable: true,
		  callback: function(index) {	  	   
		  	   if (index==0){	  	   	   
		  	   	   if (navigator.app) {
					   navigator.app.exitApp();
					} else if (navigator.device) {
					   navigator.device.exitApp();
					} else {
					   window.close();
					}
		  	   }
		  }
		});
	
	} catch(err) {
   	   alert(err.message);       
   } 
}


function loadTable(done)
{	
	dump('pull');
	
	if ( !hasConnection() ){
		notyAlert(  getTrans("CONNECTION LOST",'connection_lost'),'error' );
		done();
		return;
	}
					
	var action= $(".tab-action").val();	
	var div_id= $(".display-div").val();
	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;	
	params+="&lang_id="+getStorage("mt_default_lang");
		
    if(!empty(krms_config.APIHasKey)){
		params+="&api_key="+krms_config.APIHasKey;
	}
	
	dump(ajax_url+"/"+action+"/?"+params); 	
	
    ajax_request = $.ajax({
	 url: ajax_url+"/"+action, 
	 data: params,
	 type: 'post',                  
	 async: false,
	 dataType: 'jsonp',
	 timeout: 5000,
	 crossDomain: true,
	 beforeSend: function() {
		if(ajax_request != null) {			 	
		   /*abort ajax*/
		   hideAllModal();	
           ajax_request.abort();
		} 
	},
	complete: function(data) {					
		ajax_request=null;  		
	},
	success: function (data) {	  
		dump(data);
		done();
		if (data.code==1){					
			displayBooking(data.details,div_id);			
		} else if(data.code==3){
									
		} else {
			// failed response
			notyAlert(data.msg,"error");
		}
	},
	error: function (request,error) {	        
				
	}
   });       				
}

function displayBooking(data,div_id)
{
	var html='';
	$.each( data, function( key, val ) {        

		var icon=getBookingIcons(val.status_raw);
		 
		html+='<ons-list-item class="stic-list-item" modifier="tappable" onclick="viewBooking('+val.booking_id+')">';
          html+='<ons-row class="row-with-pad">';

          	// htm+='<ons-col width="5%" class="center" >';
          	//    htm+='<div class="delivery-icon">';
          	// 	htm+='<img src="css/images/booking-table.png" style="max-width:90%; background: rgba(0,0,0,0.04); border-radius: 10px;" alt="" title="">';
          	//    htm+='</div>';
          	// htm+='</ons-col>';
                       
             html+='<ons-col width="25%" class="center" >';
                html+='<div class="delivery-icon">';
             	html+='<img src="css/images/booking-table.png" style="max-width:90%; background: rgba(0,0,0,0.04); border-radius: 10px;" alt="" title="">';
                html+='</div>';
             html+='</ons-col>';   

             html+='<ons-col width="50%" class="stic-row-pad" >';
             html+='<b class="margin2 red mybold stic-order">'+ getTrans("Booking",'booking') +' #</b><b class="margin2 red mybold stic-order">'+val.booking_id+'</b><br/>';
             html+='<p class="margin2 nospacing uppercase stic-name">'+val.booking_name+'</p>';
             html+='<p class="margin2 stic-date">'+val.date_of_booking+'</p>';
             html+='<p class="status line15 margin2 '+val.status_raw+' ">';
	             //html+='<ons-icon class="icon '+icon.classname+'" icon="'+icon.icons+'"></ons-icon>';
	             html+=' '+val.status;
	             if ( val.viewed==1){
	                html+= '&nbsp;<span class="new-tags">'+ getTrans('new','new') +'</span>'
	             }
	             html+='</p>';
             html+='</ons-col>';      
             
             html+='<ons-col width="25%" style="padding-right: 10px;" class="text-right" >';
             html+= '</br>';
             html+= '<b>'+val.number_guest+'</b> ';
             html+='<ons-icon icon="'+ getBookingGuestIcon(val.number_guest) +'"></ons-icon>';
             html+='</ons-col> ';
             
          html+='</ons-row>';
       html+='</ons-list-item>';
	});	
	
	createElement(div_id,html);
}

function getBookingIcons(status_raw)
{
    icons='fa-exclamation-triangle';
	icons2='';
	switch (status_raw)
	{
		case "denied":
	    icons='ion-close-circled';
	    icons2='icon-red';
		break;
		
		case "approved":
		icons='ion-checkmark-round';
		icons2='icon-green';
		break;
						
		case "pending":
		icons='fa-exclamation-triangle';
		icons2='icon-orange';
		break;
		
		default:
		icons='fa-exclamation-triangle';
		icons2='icon-orange';
		break;
		
	}
	return {
		'icons':icons,
		'classname':icons2
	};
}

function getBookingGuestIcon(number_guest)
{
	icon='ion-android-contact';
	if ( number_guest>1){
		icon='ion-android-contacts';
	} 
	return icon;
}

var view_booking_page_bol;

function viewBooking(booking_id)
{	
	
	dump("view_booking_page_bol->"+view_booking_page_bol);
	if (empty(view_booking_page_bol)){
		dump('view_booking_page_bol');
		view_booking_page_bol=true;
	} else {
		return;
	}
	
    var options = {
      animation: 'slide',
      onTransitionEnd: function() {                     	  
      	  $("#booking-view-title").html( getTrans("Getting booking details","getting_booking") +"..." );
      	  var info=getMerchantInfoStorage();	
		  var params="token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;
		  params+='&booking_id='+booking_id
		  callAjax("GetBookingDetails",params);
      } 
    };
    kNavigator.pushPage("bookingView.html", options);					
}

function displayBookingDetails(data)
{
	if ( data.status_raw=="pending"){
		$(".booking-action").show();
	} else {
		$(".booking-action").hide();
	}
	
	dump(data);
	var html='';
	
	$("#booking_id").val( data.booking_id);
	$("#booking_status").val( data.status_raw);
	
	var icon=getBookingIcons(data.status_raw);
	
	var html='<ons-list-header class="header">';
        html+='<ons-row>';        
        //html+='<ons-icon class="icon '+icon.classname+'" icon="'+icon.icons+'"></ons-icon>';
        //html+='&nbsp;&nbsp;'+data.status
        html+='<span class="status line15 margin2 '+data.status_raw+' ">'+data.status+'</span>';
        html+='</ons-row>';
     html+='</ons-list-header>';
     
      if ( !empty(data.booking_name)){
	     html+='<ons-list-item>';
	       html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-person"></ons-icon> <span class="stic-bold">'+data.booking_name+'</span>';
	     html+='</ons-list-item>';
      }
     
       if ( !empty(data.email)){
	     html+='<ons-list-item>';
	       html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-ios-email"></ons-icon> '+ data.email;
	     html+='</ons-list-item>';
       }

     if ( !empty(data.mobile)){
	     html+='<ons-list-item>';
	     //html+='<ons-icon icon="ion-ios-telephone"></ons-icon> '+data.mobile;
	     html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-ios-telephone"></ons-icon> <a href="tel:'+data.mobile+'">'+ data.mobile+"</a>";
	     html+='</ons-list-item>';
     }
     
     if ( !empty(data.booking_notes)){
	     html+='<ons-list-item>';
	     html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-chatbubble-working"></ons-icon> '+data.booking_notes;
	     html+='</ons-list-item>';
     }
     
     if ( !empty(data.transaction_date)){
	     html+='<ons-list-item>';
	     html+='<ons-icon class="stic-icon-pad stic-ccc" icon="ion-android-calendar"></ons-icon> '+data.transaction_date;
	     html+='</ons-list-item>';
     }
     
     html+='<ons-list-header class="header">';
        html+='<ons-row>';
        html+= getTrans( 'Details','details' ) ;        
        html+='</ons-row>';
     html+='</ons-list-header>';
     
     html+=TPLorderRow( getTrans("Number Of Guests",'number_of_guest') , data.number_guest);
     html+=TPLorderRow( getTrans("Date Of Booking",'date_of_booking') , data.date_booking);
     html+=TPLorderRow( getTrans("Time",'time') , data.booking_time);
                
	 createElement('booking-details',html);
}

function bookingApproved()
{	
	var booking_id= $("#booking_id").val();	
	 var options = {
      animation: 'none',
      onTransitionEnd: function() {        
      	  $(".booking-form-title").html( getTrans("Booking #", 'booking_nos') +" "+ booking_id);    	 
      	  $(".booking-btn").html( getTrans("Accept & Confirm", 'accept_n_confirm') );      	  
      	  $(".booking-notes").html( getTrans( "will send a booking confirmation to your customer",'booking_confirm_msg') );
      	  
      	  $(".booking_id").val( booking_id );
      	  $(".status").val( 'approved' );
      } 
    };
    kNavigator.pushPage("bookingForm.html", options);		
}

function bookingDenied()
{	
	var booking_id=$("#booking_id").val();	
	var options = {
      animation: 'none',
      onTransitionEnd: function() {               
      	  $(".booking-form-title").html( getTrans("Booking #", 'booking_nos') +" "+ booking_id);    	 
      	  $(".booking-btn").html( getTrans("Decline Booking", 'decline_booking') );      	  
      	  $(".booking-notes").html( getTrans( "will send an email to your customer",'booking_denied_msg') );
      	  $(".booking_id").val( booking_id );
      	  $(".status").val( 'denied' );
      } 
    };
    kNavigator.pushPage("bookingForm.html", options);		
}

function bookingChangeStats()
{
	$.validate({ 	
	    form : '#frm-booking',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var params = $( "#frm-booking").serialize();	      
	      
	      var info=getMerchantInfoStorage();	
	      params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;	 	 
	 	 
	      callAjax("bookingChangeStats",params);	       
	      return false;
	    }  
	});	
}

function setHomeBooking()
{	
	dump('setHomeBooking');
    var options = {     	  		  
  	   closeMenu:true,
       animation: 'none',       
    };	   	   	    
    
    var pages = kNavigator.getPages();     
    if ( pages.length<=1){
    	kNavigator.resetToPage("slidemenu.html", options);	
    } else {
    	menu.setMainPage('home.html',options);
    }      
}

jQuery(document).ready(function() {	
	dump('jquery ready');	
	$( document ).on( "click", ".notification-action", function() {
		 var push_type= $(this).data("type");
		 dump( push_type );
		 if ( push_type=="order"){
		 	 viewOrder( $(this).data("orderid") );
		 } else if ( push_type =="booking" ) {
		    viewBooking( $(this).data("bookingid")  );
		 } else {
		 	showNotificationCampaign( $(this).data("title") ,  $(this).data("text"));
		 }		 
	});
});

function viewOrders()
{
	pushDialog.hide();
	var order_id= $("#order_id").val();	
	viewOrder(order_id);
}

function showNotificationBooking(title, message, booking_id)
{				
	if ( !isLogin() ){		
		return;
	}
	if (typeof pushDialogBooking === "undefined" || pushDialogBooking==null || pushDialogBooking=="" ) { 	    
		ons.createDialog('pushNotificationBooking.html').then(function(dialog) {
			$(".push-title").html(title);
	        $(".push-message").html(message);
	        dialog.show();
	        $("#booking_id").val( booking_id );
	    });	
	} else {
		$(".push-title").html(title);
	    $(".push-message").html(message);
	    $("#booking_id").val( booking_id );
		pushDialogBooking.show();
	}	
}

function viewBookings(booking_id)
{
	pushDialogBooking.hide();
	var booking_id= $("#booking_id").val();	
	viewBooking(booking_id);
}

function initMobileScroller()
{
	if ( $('.mobiscroll_time').exists()){		
		$('.mobiscroll_time').mobiscroll().time({
			theme: 'android-holo-light', 
			mode: "scroller",
			display: "modal",
			dateFormat : "yy-mm-dd",
			/*timeFormat:"HH:ii",
			timeWheels:"HHii"*/
		});
	}
}

function isDebug()
{	
	var debug = krms_config.debug;
	if(debug){
		return true;
	}
	return false;
}

function toastMsg( message )
{		
	if (isDebug()){
		notyAlert( message ,'success');
		return ;
	}
		   
    window.plugins.toast.showWithOptions(
      {
        message: message ,
        duration: "long",
        position: "bottom",
        addPixelsY: -40 
      },
      function(args) {
      	
      },
      function(error) {
      	onsenAlert( message );
      }
    );
}

/*MEDIA SOUNDS STARTS HERE*/

var my_media;

function playNotification()
{	 
	 if ( device.platform =="iOS"){	  	
	 	var sound_url= "beep.wav";
	 } else {
	 	var sound_url= "file:///android_asset/www/beep.wav";
	 }	 	 
	 playAudio(sound_url);
}

function playAudio(url) {    
    my_media = new Media(url,
        // success callback
        function () {
            dump("playAudio():Audio Success");
            my_media.stop();
            my_media.release();
        },
        // error callback
        function (err) {
            dump("playAudio():Audio Error: " + err);
        }
    );    
    my_media.play({ playAudioWhenScreenIsLocked : true });
    my_media.setVolume('1.0');
}

function stopNotification()
{
	my_media.stop();
    my_media.release();
}
/*MEDIA SOUNDS ENDS HERE*/

function assignDriver()
{	
	var options = {
      animation: 'none',
      onTransitionEnd: function() {       
      	  $(".assign-driver-title").html( getTrans('Assigned Driver','assigned_driver') + 
      	  " - " + getTrans('Order No','order_no') +":"+ $(".order_id").val() );
      	  
      	  $(".task_id").val( $(".task_id").val() );
      } 
    };
    kNavigator.pushPage("assignDriver.html", options);	
}

function showTeamList()
{
	if (typeof teamListDialog === "undefined" || teamListDialog==null || teamListDialog=="" ) {
		ons.createDialog('teamList.html').then(function(dialog) {					   	
		   var info=getMerchantInfoStorage();		
	       params="mtid="+info.merchant_id;    
	       callAjax("loadTeamList",params);       
	       teamListDialog.show();	
	       translatePage();
	    });	
	} else {				
		var info=getMerchantInfoStorage();		
	    params="mtid="+info.merchant_id;    
	    callAjax("loadTeamList",params);       
	    teamListDialog.show();
	}	
}

function showDriverList()
{
	if ( $(".team_id").val()==""){
		toastMsg( getTrans('Please select a team','select_team')  );
		return;
	}
	if (typeof driverListDialog === "undefined" || driverListDialog==null || driverListDialog=="" ) {
		ons.createDialog('driverList.html').then(function(dialog) {			
			
		   var info=getMerchantInfoStorage();	
		   params="mtid="+info.merchant_id;    
		   params+="&team_id="+$(".team_id").val();
	       callAjax("driverList",params);       
	       
		   driverListDialog.show();
		   translatePage();
	    });	
	} else {		
		var info=getMerchantInfoStorage();	
	    params="mtid="+info.merchant_id;    
	    params+="&team_id="+$(".team_id").val();
        callAjax("driverList",params);       
	       
		driverListDialog.show();
	}	
}

function displayTeamList(data)
{
	dump(data);
	var html='';
	if ( data.length>=1){   	  
		$.each( data, function( key, val ) {    
			 dump(val);
			 //onclick="setLanguage('+"'"+val.lang_id+"'"+');"
			 html+='<ons-list-item modifier="tappable" onclick="setTeam('+val.team_id+', '+"'"+val.team_name+"'"+' );" >';
             html+=val.team_name;
             html+='</ons-list-item>';
		});	
		createElement("team-list",html);
	}
}

function setTeam(team_id, team_name)
{
	$(".team_id").val( team_id );
	$(".team_selected").html( team_name );
	teamListDialog.hide();
}

function displayDriverList(data)
{
	dump(data);
	var html='';
	if ( data.length>=1){   	  
		$.each( data, function( key, val ) {    
			 dump(val);			 
			 driver_name=val.first_name +" "+ val.last_name;
			 html+='<ons-list-item modifier="tappable" onclick="setDriver('+val.driver_id+', '+"'"+driver_name+"'"+' );" >';
             html+=driver_name;
             html+='</ons-list-item>';
		});	
		createElement("driver-list",html);
	}
}

function setDriver(driver_id, driver_name)
{
	$(".driver_id").val( driver_id );
	$(".driver_selected").html( driver_name );
	driverListDialog.hide();
}

function assignTask()
{			   
	$.validate({ 	
	    form : '#frm-assigntask',    
	    borderColorOnError:"#FF0000",
	    onError : function() {      
	    },	   
	    onSuccess : function() {     	   	      
	      var info=getMerchantInfoStorage();	
	      var params = $( "#frm-assigntask").serialize();	   	      
	      params+="&mtid="+info.merchant_id;       
	      params+="&order_id="+$(".order_id").val();
	      callAjax("assignTask",params);	       
	      return false;
	    }  
	});	
}

function viewLocationNew(lat, lng, address)
{
	//dump(lat); dump(lng); dump(address);
	/*setStorage("map_lat", lat );
	setStorage("map_lng", lng );
	setStorage("map_address", address );
	setStorage("map_actions",'view_location');*/
	
	var options = {
      animation: 'none',   
      lat :  lat,
      lng :  lng,
      address: address      
   };
   kNavigator.pushPage("map.html", options);
}

function TrackOrder()
{	
   var options = {
      animation: 'none',    
      title : getTrans("Track Order",'track_order'),
      lat :  $(".task_lat").val(),
      lng : $(".task_lng").val(),
      delivery_address : $(".task_address").val(),
      driver_lat : $(".driver_lat").val(),
      driver_lng : $(".driver_lng").val(),
      driver_name : $(".driver_name").val(),
      driver_phone : $(".driver_phone").val(),
      driver_address : $(".driver_location").val(),
      driver_avatar : getStorage("driver_profilepic"),
      driver_name : $(".driver_name").val() ,
      icon_driver : getStorage("icon_driver"),
      icon_location : getStorage("icon_location") ,
      icon_dropoff : getStorage("icon_dropoff") ,
      driver_id : $(".driver_id").val(),
      drop_address : $(".drop_address").val(),
      dropoff_lat : $(".dropoff_lat").val(),
      dropoff_lng : $(".dropoff_lng").val(),
   };
   kNavigator.pushPage("map_track.html", options);
}

function InitMap()
{	
	if (empty(getStorage("map_lat"))){
		toastMsg( getTrans("Invalid coordinates",'invalid_coordinates') );
		return;
	}
	
	kloader.show();		
	var map_actions =  getStorage("map_actions");
	
	//alert(map_actions);
	
	if (isDebug()){
	    return;
	}
	
	
	var div = document.getElementById("map_canvas_div");
	$('#map_canvas_div').css('height', $(window).height() - $('#map_canvas_div').offset().top);
	
	setTimeout(function(){ 
				 
	     /*alert(getStorage("map_lat"));
	     alert(getStorage("map_lng"));*/
	     //alert( getStorage("map_lat") +"=>" + getStorage("map_lng") );
	     
	     
	     var location = new plugin.google.maps.LatLng( getStorage("map_lat") , getStorage("map_lng") ); 
	     
	     switch ( map_actions )
	     {
	     	case "view_location":
	     	  dump("view_location");
	     	  
	     	  $(".map-bottom-wrapper").hide();
	     	  
	     	  
	     	  map = plugin.google.maps.Map.getMap(div, {     
		         'camera': {
		         'latLng': location,
		         'zoom': 17
		        }
		      });
		      		      
		      map.setBackgroundColor('white');
		         
		      map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
		      			      	 
			     map.clear();	
	        	 map.off();
	        	 map.setCenter(location);
	        	 map.setZoom(17); 
		      	
        	     map.addMarker({
        	     	 'position': location ,
					  'title': getStorage("map_address") ,
					 'snippet': getTrans( "Delivery ddress" ,'delivery_address'),
					  }, function(marker) {						  	
					    marker.showInfoWindow();	
					    				     					   
					    map.animateCamera({
						  'target': location,
						  'zoom': 17,
						  'tilt': 30
						}, function() {
					    });   
					    
        	         }
        	     );
        	     
		     });
	     	  
	     	
	     	break;
	     		     	
	     	case "track_order":
	     	   
	     	   $(".map-bottom-wrapper").show();
	     	
	     	   /*alert( getStorage("driver_lat") );
	     	   alert( getStorage("driver_lng") );*/
	     	   
	     	   $(".driver_avatar").attr("src", getStorage("driver_profilepic") );
	     	   $("._driver_name").html( getStorage("driver_name") );
	     	   $(".call_driver").attr("href","tel:"+ getStorage("driver_phone") );
	     	   
	     	   if(!empty(getStorage("time_left"))){
	     	      $(".time_left").html( getStorage("time_left") );
	     	   } 
	     	   
	     	   if (!isDebug()){
	     	   	  
	     	   	  var driver_location = new plugin.google.maps.LatLng( getStorage("driver_lat") , getStorage("driver_lng") ); 
	     	   	  map = plugin.google.maps.Map.getMap(div, {     
			         'camera': {
			         'latLng': location,
			         'zoom': 17
			        }
			      });			      
			      map.setBackgroundColor('white');
			      			      
			      
			      map.addEventListener(plugin.google.maps.event.MAP_READY, function() {			      	  
			      	
			      	  map.clear();	
	        	      map.off();
	        	      map.setCenter(location);
	        	      map.setZoom(17);	
	        	      
	        	       var data = [      
						 { 
					        'title': getStorage("driver_location") ,
					        'position': driver_location ,
					        'snippet': getTrans( "Driver Location" ,'driver_location'),
					        'icon': {
						       'url': getStorage("icon_driver")
						    }
					      },{ 
					        'title': getStorage("map_address") ,   
					        'position': location ,
					        'snippet': getTrans( "Delivery Address" ,'delivery_address'),
					        'icon': {
						       'url': getStorage("icon_location")
						    }
					      }  
					   ];
					   
					   addMarkers(data, function(markers) {    	
					   	   
					   	    if ( iOSeleven() ){					   	    	
					   	    	map.animateCamera({
							 	  'target': driver_location ,
							 	  'zoom': 17,
							 	  'tilt': 30
								});				 
					   	    } else { 
						    	map.addPolyline({
								points: [
								  driver_location,
								  location
								],
								'color' : '#AA00FF',
								'width': 10,
								'geodesic': true
								}, function(polyline) {
								   
									 map.animateCamera({
									 	  'target': driver_location ,
									 	  'zoom': 17,
									 	  'tilt': 30
									 }); 
									
								});
					   	    }
								    	
					   }); /*end addMarkers*/
	        	       		      	
			      }); /*end addEventListener*/			      
	     	   }
	     	break;
	     	
	     	default:
	     	 toastMsg(  getTrans("Undefined map action",'undefined_map_action') );
	     	break;
	     }
	     	     
		 hideAllModal();		
	}, 500); 
	
}

function addMarkers(data, callback) {
  var markers = [];
  function onMarkerAdded(marker) {
    markers.push(marker);
    if (markers.length === data.length) {
      callback(markers);
    }
  }
  data.forEach(function(markerOptions) {
    map.addMarker(markerOptions, onMarkerAdded);
  });
}

function setButtonTask()
{
	dump('setButtonTask');	
	var task_id=$(".task_id").val();
	if (task_id>0){
	    $(".assign_driver_label").html( $("#assign_driver_label").val() );
	}
}

function setButtonTask2()
{	
	kNavigator.popPage({cancelIfRunning: true});
	setButtonTask();
}

function loadBooking(done)
{
	dump('pull');
	
	if ( !hasConnection() ){
		notyAlert(  getTrans("CONNECTION LOST",'connection_lost'),'error' );
		done();
		return;
	}
					
	var action= "PendingBookingTab";
	var div_id= 'newbooking-list';
	
	var info=getMerchantInfoStorage();	
	var params="token="+getStorage("merchant_token");
	params+="&user_type="+info.user_type;
	params+="&mtid="+info.merchant_id;	
	params+="&lang_id="+getStorage("mt_default_lang");
		
    if(!empty(krms_config.APIHasKey)){
		params+="&api_key="+krms_config.APIHasKey;
	}
	
	dump(ajax_url+"/"+action+"/?"+params); 	
	
    ajax_request = $.ajax({
	 url: ajax_url+"/"+action, 
	 data: params,
	 type: 'post',                  
	 async: false,
	 dataType: 'jsonp',
	 timeout: 5000,
	 crossDomain: true,
	 beforeSend: function() {
		if(ajax_request != null) {			 	
		   /*abort ajax*/
		   hideAllModal();	
           ajax_request.abort();
		} 
	},
	complete: function(data) {					
		ajax_request=null;  		
	},
	success: function (data) {	  
		dump(data);
		done();
		if (data.code==1){					
			displayBooking(data.details,div_id);			
		} else if(data.code==3){
									
		} else {
			// failed response
			$("#newbooking-list").html('');
			notyAlert(data.msg,"error");
		}
	},
	error: function (request,error) {	        
				
	}
   });       				
}

function OrderRefresh()
{
	dump('OrderRefresh()');
	var tab_action = $("#display-div").val();
	dump(tab_action);
	switch (tab_action)
	{
		case "new-orders":
		GetTodaysOrder();
		break;
		
		case "pending-orders":
		getPendingOrders();
		break;
		
		case "allorders-orders":
		getGetAllOrders();
		break;
		
		case "booking-pending":		
          var info=getMerchantInfoStorage();	      	 
	      var params='';
		  params+="&token="+getStorage("merchant_token");
		  params+="&user_type="+info.user_type;
		  params+="&mtid="+info.merchant_id;		  
	      callAjax('PendingBookingTab',params);
	      translatePage(); 	   	
		break;
	}
}

function foodOptions(action)
{
	switch(action){
		case 1:
		if ( food_option_not_available.isChecked()){
		   food_option_not_available_disabled.setChecked(false);
		}	
		break;
		
		case 2:
		if ( food_option_not_available_disabled.isChecked()){
		   food_option_not_available.setChecked(false);	
		}
		break;
	}
}

function showNotificationBadge(counter)
{	
	var badge_count=0;
	
	if (empty(getStorage("badge_count"))){
		setStorage("badge_count",0);
		badge_count=0;
	}
	
	if (isNaN(getStorage("badge_count"))){			
		setStorage("badge_count",1);
		badge_count=1;
	} else {
		badge_count=parseInt(getStorage("badge_count")) + parseInt(counter);	
		setStorage("badge_count", badge_count );
	}
		
	
	if ( badge_count>0 ){			   
		$(".notification-count").css({ "display":"inline-block","position":"absolute","margin-left":"-8px" });
		$(".notification-count").text(badge_count);
	} else {
		$(".notification-count").hide();
	}
}

function clearBadge()
{
	removeStorage("badge_count");
	$(".notification-count").hide();
}


function iOSeleven()
{	
	if ( device.platform =="iOS"){	
		version = parseFloat(device.version);		
		if ( version>=11 ){
			return true;
		}
	}
	return false;
}

function print()
{
    var order_id=$("#order_id").val();    
    callAjax('print','order_id='+order_id);
}

/*UNOPEN ORDER*/

var ajax_request_alert;
var timer_alert = null;

function getUnOPenOrder()
{

  try {

   if ( !hasConnection() ){
		return false;
   }		
   
   dump("getUnOPenOrder");
      
   var action='getCountUnOpenOrder';
   
   var info=getMerchantInfoStorage();	
   var params="token="+getStorage("merchant_token");
   params+="&user_type="+info.user_type;
   params+="&mtid="+info.merchant_id;
   
   if(!empty(krms_config.APIHasKey)){
	   params+="&api_key="+krms_config.APIHasKey;
   }
   
   dump("Action=>"+action);
   dump(ajax_url+"/"+action+"?"+params);
	
   ajax_request_alert = $.ajax({
	 url: ajax_url+"/"+action, 
	 data: params,
	 type: 'post',                  
	 async: false,
	 dataType: 'jsonp',
	 timeout: 5000,	 	
	 crossDomain: true,
	 beforeSend: function() {
		if(ajax_request_alert != null) {			 	
		   /*abort ajax*/		   
           ajax_request_alert.abort();
           clearInterval(alert_handle); 
           clearTimeout(timer_alert);
		} else {    		
			
			timer_alert = setTimeout(function() {
				hideAllModal();			
				dump("TIMER ALERT AJAX ABORT")	
				ajax_request_alert.abort();	            
	        }, 20000);
	        
		}
	},
	complete: function(data) {					
		ajax_request_alert=null;  			
	},
	success: function (data) {	  
		 dump("ALERT RESPONSE");
	     dump(data);
	     if(data.code==1){
	     	
	     	running_background = getStorage("running_background");	     	
	     	if (typeof running_background === "undefined" || running_background==null || running_background=="" || running_background=="null" ) {	     			     		
	     		toastMsg(data.msg);
	     	    playSound();
	     	} else {
	     		handleLocationNotification(data.msg, data.details.sub_message);
	     	}
	     		     		     		     	
	     	total_order = getStorage("total_order");
	     	dump("total_order=>"+ total_order);
	     	dump("total_unopen=>"+ data.details.total_unopen);
	     	dump("total_total_order=>"+ data.details.total_order);	     	

	     	if(total_order!= data.details.total_order) {
	     		dump("REFRESH");
	     		GetTodaysOrder();
	     	}
	     		     	
	     	$(".new_order_badge").html( data.details.total_unopen );
	     	
	     } else {
	     	$(".new_order_badge").html('');
	     }
	     
	     clearInterval(alert_handle); 
	     alert_handle = null;
	     runAlert();     
	     	   
	},
	error: function (request,error) {	        
		clearInterval(alert_handle);
	}
   });       

   ajax_request_alert.always(function() {
       dump( "second complete" );
       ajax_request_alert=null;  
       clearTimeout(timer_alert);
   });			
   
   } catch(err) {
   	   dump(err.message);
       clearAlert();
   } 
    
}

document.addEventListener("backbutton", function (e) {		 	
	 if ($('#page-displayOrder').is(':visible')) {	 	
	 }
}, false);	

function runAlert()
{
	app_enabled_alert = getStorage("app_enabled_alert");
	if(app_enabled_alert==1 || app_enabled_alert=="1"){		
		dump("alert_handle=>"+alert_handle);
		interval = alert_delayed;
		app_alert_interval = getStorage("app_alert_interval");
		if(app_alert_interval>0){
			interval = app_alert_interval*1000;
		}		
		dump("interval=>"+interval);
		if(empty(alert_handle)){
		   alert_handle = setInterval(function(){getUnOPenOrder()}, interval );
		}
	}
}

/*2.3 CODE*/

function t(words,words_key){
	return getTrans(words,words_key);
}

clearAlert = function(){	
    clearInterval(alert_handle); 
	alert_handle = null;
};

initPush = function(re_init){
	
	try {
	
		push = PushNotification.init({
			android: {
				sound : "true",
				clearBadge : "true"
			},
		    browser: {
		        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
		    },
			ios: {
				alert: "true",
				badge: "true",
				sound: "true",
				clearBadge:"true"
			},
			windows: {}
	    });
	    
	    push.on('registration', function(data) {   	  	
	    	/*CHECK IF SAME DEVICE ID*/	    	
	    	if(re_init){	    		
		    	old_device_id = getStorage("merchant_device_id");
		    	dump(old_device_id +"=>" + data.registrationId );
	    		if (old_device_id!=data.registrationId){	    			
	    			sendPost('reRegisterDevice', "new_device_id="+ data.registrationId);
	    		}
	    	} else {	    		
	    	   setStorage("merchant_device_id", data.registrationId ); 	
	    	}	    	 
		});
		
		 push.on('notification', function(data){     
	   	   //alert(JSON.stringify(data));   	
		   if ( data.additionalData.foreground ){
	    		playSound();
	       } 
	                       	  
	       handleNotification(data);
	       
	    });
	    
	    PushNotification.createChannel(function(){
	    	//alert('create channel succces');
	    }, function(){
	    	//alert('create channel failed');
	    },{
	    	 id: 'kmrs_merchant_channel',
	         description: 'merchant app channel',
	         importance: 5,
	         vibration: true,
	         sound : 'beep'
	      }
	    );
	    
	    push.on('error', function(e) {      
	     	 alert(e.message);
		});
    
	} catch(err) {
       alert(err.message);
    } 
};

handleNotification = function(data){
	try {
		
	  push_type = '';	  
	  //alert(JSON.stringify(data));	  
	  if(device.platform=="iOS"){	  	
	  	 $.each( data.additionalData, function( key, data ) {	  	 	
	  	 	if (key=="gcm.notification.push_type"){
	  	 		push_type = data;
	  	 	}
	  	 });
	  } else {	     
	     push_type = data.additionalData.push_type;
	  }
	  	  
	  toastMsg(data.title+"\n"+data.message);
	  setNotificationCount();
	  
	  if ( data.additionalData.foreground ){
		  if( push_type == "order"){
		  	  GetTodaysOrder();
		  }
	  }
	  
	} catch(err) {
       alert(err.message);
    } 
};

setNotificationCount = function(){	
	current_count = getStorage("notification_count");
	if (typeof current_count === "undefined" || current_count==null || current_count=="" || current_count=="null" ) {
		current_count =1;
	} else current_count++;
		
	setStorage("notification_count",current_count);	
	setNotificationDisplay();
};

clearNotificationCount = function(){
	removeStorage("notification_count");
};

setNotificationDisplay = function(){
	current_count = getStorage("notification_count");	
	if (typeof current_count === "undefined" || current_count==null || current_count=="" || current_count=="null" ) {		
		setTimeout(function(){ 
		    $(".notification_count").html( '' );
	     }, 100);
	} else {
		dump('set number =>' + current_count);		
		 setTimeout(function(){ 
		    $(".notification_count").html( current_count );
	     }, 100);
	}
};

playSound = function(){		 
	 try {	 		 	 
		 url = 'file:///android_asset/www/beep.wav';			 
		 if(device.platform=="iOS"){
		 	url = "beep.wav";
		 }
		 //alert(url);
		 my_media = new Media(url,	        
	        function () {
	            dump("playAudio():Audio Success");
	            my_media.stop();
	            my_media.release();
	        },	        
	        function (err) {
	            dump("playAudio():Audio Error: " + err);
	        }
	    );	    
	    my_media.play({ playAudioWhenScreenIsLocked : true });
	    my_media.setVolume('1.0');
    
    } catch(err) {
       dump(err.message);
    } 
};

initTrackMap = function(page){
	
	try {	
		
		map_bounds = [];
		
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
		  $(".driver_contact").html( driver_phone );
		} else {
		  $(".driver_contact").hide();
		}
		
		if (!empty(lat) && !empty(lng) ){
			
			dump(lat +"=>" + lng);
			
			 options = {
				  div: ".track_map",
				  lat: lat,
				  lng: lng,
				  disableDefaultUI: true,
				  styles: map_style ,
			   };
	
		     map = new GMaps(options);     
		     
		     info_html = '<p>'+delivery_address+"</b>";
		     var infoWindow = new google.maps.InfoWindow({
			    content: info_html
			 });	
			 
			 marker =  map.addMarker({
				  lat: lat,
				  lng: lng,
				  infoWindow: infoWindow,
				  icon: icon_location
			});
		
		    infoWindow.open(map, marker);
		    		    
		    setMapBound(lat,lng);
		    
		    
		    /*PLOT DROP OFF ADDRESS*/
		    if (!empty(dropoff_lat) && !empty(dropoff_lng) ){
		    			    	
			    var infoWindowDropoff = new google.maps.InfoWindow({
				    content: '<p>'+drop_address+"</b>"
				});				 
		    	marker_dropoff =  map.addMarker({
				  lat: dropoff_lat,
				  lng: dropoff_lng,
				  infoWindow: infoWindowDropoff,
				  icon: icon_dropoff
			   });
			   infoWindowDropoff.open(map, marker_dropoff);
			   			 
			   setMapBound(dropoff_lat,dropoff_lng);
			     			
		    }
		    		    
		    /*PLOT DRIVER*/
		    if (!empty(driver_lat) && !empty(driver_lng) ){
		    	
		    	info_html = '<p>'+driver_address+"</b>";
			    var infoWindow = new google.maps.InfoWindow({
				    content: info_html
				});	
		    	
			    driver_marker =  map.addMarker({
					  lat: driver_lat,
					  lng: driver_lng,
					  infoWindow: infoWindow,
					  icon: icon_driver
				});
				
				infoWindow.open(map, driver_marker);								
		        setMapBound(driver_lat,driver_lng);
		        		        
				track_order_map_interval = setInterval(function(){runTrackMap(driver_id)}, 10000);
		    }
		    
		    /*NOW ADD ROUTE*/
		    if (!empty(dropoff_lat) && !empty(dropoff_lng) ){
		    			    	
				map.drawRoute({
				    origin: [driver_lat , driver_lng ],
					destination: [ dropoff_lat , dropoff_lng ],
				    travelMode: 'driving',
				    strokeColor: '#131540',
				    strokeOpacity: 0.6,
				    strokeWeight: 6
				});		        
				
				map.drawRoute({
				    origin: [dropoff_lat , dropoff_lng ],
					destination: [ lat , lng ],
				    travelMode: 'driving',
				    strokeColor: '#131540',
				    strokeOpacity: 0.6,
				    strokeWeight: 6
				});		        
				
				dump("DONE ROUTE");
				dump(driver_lat+"=>"+driver_lng);
				dump(lat+"=>"+lng);
				
		    } else if (!empty(driver_lat) && !empty(driver_lng)) {		    
		    	 map.drawRoute({
				    origin: [driver_lat , driver_lng ],
					destination: [ lat , lng ],
				    travelMode: 'driving',
				    strokeColor: '#131540',
				    strokeOpacity: 0.6,
				    strokeWeight: 6
				});		        
				dump("DONE ROUTE");
				dump(driver_lat+"=>"+driver_lng);
				dump(lat+"=>"+lng);
		    }
		    
			
		    /*NOW CENTER THE MAP*/
		    setMapCenter();
		    		    
		} else {
			toastMsg( getTrans("Invalid coordinates",'invalid_coordinates') );
		}				
	} catch(err) {
       alert(err.message);
    } 
};

setMapBound = function(lat, lng){
	var latlng = new google.maps.LatLng( lat , lng );
    map_bounds.push(latlng);
};


setMapCenter = function(){			
	map.fitLatLngBounds(map_bounds);
};

runTrackMap = function(driver_id){
	
	if ($('#page_map_track').is(':visible')) {
	   stopTrackMapInterval();
	   var params='driver_id=' + driver_id;       
       callAjax("trackDriver",params);	       	 
	} else {
		stopTrackMapInterval();
	}
};

stopTrackMapInterval = function(){
   clearInterval(track_order_map_interval);
};

ReInitTrackingMap = function(data){
	try {
		dump("ReInitTrackingMap");
		dump(data);
		driver_marker.setPosition( new google.maps.LatLng( data.location_lat , data.location_lng ) );
		
		setMapBound(data.location_lat, data.location_lng);
		setMapCenter();
		
		track_order_map_interval = setInterval(function(){runTrackMap(data.driver_id)}, 10000);
	} catch(err) {
		stopTrackMapInterval();
        toastMsg(err.message);
    } 
};


pushUnregister = function(){
	dump("pushUnregister");
	try {	
		push.unregister(function(){			
			dump('unregister ok');
			setStorage("push_unregister",1);
		},function(error) {   	   	   	   	   
			dump('unregister error');
	    });		
		
	} catch(err) {		
        alert(err.message);       
    } 
};

checkDeviceRegister = function(){	
	push_unregister = getStorage("push_unregister");
	dump("push_unregister => "+ push_unregister);
	if (typeof push_unregister === "undefined" || push_unregister==null || push_unregister=="" || push_unregister=="null" ) {
		// do nothing
	} else {
		if(push_unregister==1){
			dump("Registered again");
			initPush(true);
		}
	}
};


sendPost = function(action,params){
		
	try {
		
		set_lang = getStorage("mt_default_lang");
		if(empty(set_lang) || set_lang=="null"){
			params+="&lang=en";	
		} else params+="&lang="+getStorage("mt_default_lang");	
			
		if(!empty(krms_config.APIHasKey)){
			params+="&api_key="+krms_config.APIHasKey;
		}
		
		params+="&app_version="+app_version;
		
		merchant_device_id = getStorage("merchant_device_id");
		if(!empty(merchant_device_id)){
			params+="&merchant_device_id="+merchant_device_id;
		}
		
		merchant_token = getStorage("merchant_token");
		if(!empty(merchant_token)){
			params+="&token="+merchant_token;
		}
		
		var info=getMerchantInfoStorage();		
		if(!empty(info)){
			params+="&user_type="+info.user_type;
			params+="&mtid="+info.merchant_id;	
		}
		
		if (isDebug()){
	  	  params+="&device_platform=Android";
	    } else {
	  	  params+="&device_platform="+ encodeURIComponent(device.platform);
	    }	 
		
		var send_post_ajax = $.ajax({
		  url: ajax_url+"/"+action, 
		  method: "GET",
		  data: params,
		  dataType: "jsonp",
		  timeout: 20000,
		  crossDomain: true,
		  beforeSend: function( xhr ) {       
	      }
	    });
	    
	    send_post_ajax.done(function( data ) {
	    	 //alert(JSON.stringify(data));
	    	 if(data.code==1){
	    	 	setStorage("merchant_device_id", data.details ); 
	    	 	removeStorage("push_unregister");
	    	 } else {    	 
	    	 	// do nothing	
	    	 }
	    });
	    
	    send_post_ajax.always(function() {        
	    	send_post_ajax=null;   
	    });
	          
	    /*FAIL*/
	    send_post_ajax.fail(function( jqXHR, textStatus ) {    	
	    	send_post_ajax=null;   	    	
	    });    
    
    } catch(err) {
       alert(err.message);       
    } 
};

loadCancelOrder = function(done){
	
	try {
		
		dump('pull');
	
		if ( !hasConnection() ){
			notyAlert(  getTrans("CONNECTION LOST",'connection_lost'),'error' );
			if(!empty(done)){
			    done();
			}
			return;
		}
						
		var action= "loadCancelOrder";
		var div_id= 'cancel_order_list';
		
		var info=getMerchantInfoStorage();	
		var params="token="+getStorage("merchant_token");
		params+="&user_type="+info.user_type;
		params+="&mtid="+info.merchant_id;	
		params+="&lang_id="+getStorage("mt_default_lang");
			
	    if(!empty(krms_config.APIHasKey)){
			params+="&api_key="+krms_config.APIHasKey;
		}
		
		dump(ajax_url+"/"+action+"/?"+params); 	
				
		
	    ajax_request = $.ajax({
		 url: ajax_url+"/"+action, 
		 data: params,
		 type: 'post',                  
		 async: false,
		 dataType: 'jsonp',
		 timeout: 5000,
		 crossDomain: true,
		 beforeSend: function() {
			if(ajax_request != null) {			 	
			   /*abort ajax*/
			   hideAllModal();	
	           ajax_request.abort();
	           clearTimeout(timer);
			} else {
				
				timer = setTimeout(function() {
				hideAllModal();				
				ajax_request.abort();
	            toastMsg( getTrans('Request taking lot of time. Please try again','request_taking_lot_time')  );	            
	           }, 20000);
	        
	            kloader.show();
	           
			}
		},
		complete: function(data) {					
			ajax_request=null;  		
			hideAllModal();	
		},
		success: function (data) {	  
			dump(data);
			if(!empty(done)){
			    done();
			}
			if (data.code==1){									
				displayOrders(data.details.data,div_id);
			} else if(data.code==3){
										
			} else {
				// failed response
				$(div_id).html('');
				notyAlert(data.msg,"error");
			}
		},
		error: function (request,error) {	        
			ajax_request.abort();
	        clearTimeout(timer);		
		}
	   });       
	
	} catch(err) {
       toastMsg(err.message);       
    } 
};

reviewOrder = function(order_id){	
	ons.notification.confirm({
	  message:  t('Review order','review_order') ,	  
	  title: dialog_title_default,
	  buttonLabels: [ t('Approved','approved') , t('Decline','decline') ],
	  animation: 'default',
	  primaryButtonIndex: 1,
	  cancelable: true,
	  callback: function(index) {
	  	 dump("reviewOrder :" + index);	    
	  	 if(index==0){	  	 	
	  	 	callAjax('approvedOrder','order_id='+ order_id);
	  	 } else if ( index >=1) {
	  	 	callAjax('declineOrder','order_id='+ order_id);
	  	 }
	  }
	});
};

function getDataAtual(data)
{
		// Obtém a data/hora da variável ou atual
	if (typeof data == "undefined" || data==null || data=="" || data=="null"){
		var data = new Date();
	} else {
		var data = data;
	}

		// Guarda cada pedaço em uma variável
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth();          // 0-11 (zero=janeiro)
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
		var min     = data.getMinutes();        // 0-59
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos

		// Formata a data e a hora (note o mês + 1)
		var str_data = dia + '/' + (mes+1) + '/' + ano4;
		var str_hora = hora + ':' + min + ':' + seg;

		// Mostra o resultado
		//alert('Hoje é ' + str_data + ' às ' + str_hora);
	
}

function runCancelOrder()
{
	app_enabled_alert = getStorage("app_cancel_order_alert");
	if(app_enabled_alert==1 || app_enabled_alert=="1"){				
		interval = alert_delayed;
		app_alert_interval = getStorage("app_cancel_order_alert_interval");
		if(app_alert_interval>0){
			interval = app_alert_interval*1000;
		}		
		dump("interval =>" + interval);
		if(empty(alert_handle_cancel)){
		   alert_handle_cancel = setInterval(function(){getCancelOrder()}, interval );
		}
	}		
}

var ajax_cancel_order;
var alert_handle_cancel;
var timer_alert_cancel;

getCancelOrder = function(){	
		
	try {
		
	   if ( !hasConnection() ){
	  	   return false;
       }	
        
       var action='getCancelOrder';
   
	   var info=getMerchantInfoStorage();	
	   var params="token="+getStorage("merchant_token");
	   params+="&user_type="+info.user_type;
	   params+="&mtid="+info.merchant_id;
	   
	   if(!empty(krms_config.APIHasKey)){
		   params+="&api_key="+krms_config.APIHasKey;
	   }
	   
	   dump("Action=>"+action);
	   dump(ajax_url+"/"+action+"?"+params);
		
	   ajax_cancel_order = $.ajax({
		 url: ajax_url+"/"+action, 
		 data: params,
		 type: 'post',                  
		 async: false,
		 dataType: 'jsonp',
		 timeout: 5000,	 	
		 crossDomain: true,
		 beforeSend: function() {
			if(ajax_cancel_order != null) {			 	
			   /*abort ajax*/		   
	           ajax_cancel_order.abort();
	           clearInterval(alert_handle_cancel); 	 
	           clearTimeout(timer_alert_cancel);          
			} else {    		
				
				timer_alert_cancel = setTimeout(function() {					
					dump("TIMER ALERT AJAX ABORT")	
					ajax_cancel_order.abort();	            
		        }, 20000);
		        
			}
		},
		complete: function(data) {					
			ajax_cancel_order=null;  			
		},
		success: function (data) {	  
			 dump("ALERT RESPONSE");
		     dump(data);
		     if(data.code==1){		
		     	
		     	
		     	running_background = getStorage("running_background");	     	
		     	if (typeof running_background === "undefined" || running_background==null || running_background=="" || running_background=="null" ) {
			     	toastMsg(data.msg);
			     	playSound();
		     	} else {
		     		handleLocationNotification(data.msg,'');
		     	}
		     	
		     	$(".new_cancel_order").html( data.details.count);
		     } else {
		     	$(".new_cancel_order").html('');
		     }
		     
		     clearInterval(alert_handle_cancel); 
		     alert_handle_cancel = null;
		     runCancelOrder();     
		     	   
		},
		error: function (request,error) {	        
			clearInterval(alert_handle_cancel);
		}
	   });       
	
	   ajax_cancel_order.always(function() {
	       dump( "second complete" );
	       ajax_cancel_order=null;  	  
	       clearTimeout(timer_alert_cancel);     
	   });			
        
	} catch(err) {
   	   dump(err.message);
       clearAlert();
    } 
};

clearAlertCancelOrder = function(){	
    clearInterval(alert_handle_cancel); 
	alert_handle_cancel = null;
};

handleLocationNotification = function(message, sub_message){
	
	try {
		
		 url_sound = 'file:///android_asset/www/beep.wav';			 		 
		 if(device.platform=="iOS"){
		 	url_sound = "beep.wav";
		 }
		 				 
		cordova.plugins.notification.local.schedule({
		    title: message ,
		    text:  sub_message,
		    foreground: true,
		    sound : url_sound
		});
		
	} catch(err) {
   	   alert(err.message);       
    } 
};



var send_app_status;

setAppStatus = function(params){
			
	try {
	
	    action = 'setAppStatus';
		
		set_lang = getStorage("mt_default_lang");
		if(empty(set_lang) || set_lang=="null"){
			params+="&lang=en";	
		} else params+="&lang="+getStorage("mt_default_lang");	
			
		if(!empty(krms_config.APIHasKey)){
			params+="&api_key="+krms_config.APIHasKey;
		}
		
		params+="&app_version="+app_version;
		
		merchant_device_id = getStorage("merchant_device_id");
		if(!empty(merchant_device_id)){
			params+="&merchant_device_id="+merchant_device_id;
		}
		
		merchant_token = getStorage("merchant_token");
		if(!empty(merchant_token)){
			params+="&token="+merchant_token;
		}
		
		var info=getMerchantInfoStorage();		
		if(!empty(info)){
			params+="&user_type="+info.user_type;
			params+="&mtid="+info.merchant_id;	
		}
		
		if (isDebug()){
	  	  params+="&device_platform=Android";
	    } else {
	  	  params+="&device_platform="+ encodeURIComponent(device.platform);
	    }	 
	    
	    dump(ajax_url+"/"+action+"?"+params);
		
		var send_app_status = $.ajax({
		  url: ajax_url+"/"+action, 
		  method: "GET",
		  data: params,
		  dataType: "jsonp",
		  timeout: 20000,
		  crossDomain: true,
		  beforeSend: function( xhr ) {       
	      }
	    });
	    
	    send_app_status.done(function( data ) {
	    	 //alert(JSON.stringify(data));
	    });
	    
	    send_app_status.always(function() {        
	    	send_app_status=null;   
	    });
	          
	    /*FAIL*/
	    send_app_status.fail(function( jqXHR, textStatus ) {    	
	    	send_app_status=null;   	    	
	    });    
    
    } catch(err) {
       toastMsg(err.message);       
    } 
};

clearNotification = function(){
	
	ons.notification.confirm({
	  message: getTrans('Clear notification','clear_notification') +"?" ,	  
	  title: dialog_title_default ,
	  buttonLabels: [ getTrans('Yes','yes') ,  getTrans('No','no') ],
	  animation: 'default', // or 'none'
	  primaryButtonIndex: 1,
	  cancelable: true,
	  callback: function(index) {	  	
	  	 if(index<=0){
	  	 	 callAjax('clearNotification','');
	  	 }	  	 
	  }	  
	});
	
};

keepAwake = function(enabled){
	try {		
		if(enabled){			
			window.plugins.insomnia.keepAwake();
		} else {
			window.plugins.insomnia.allowSleepAgain();
		}
	} catch(err) {
   	   toastMsg(err.message);       
    } 
};

getMapProvider = function(){
	
	map_provider = getStorage("map_provider");
	if(!empty(map_provider)){
		return map_provider;
	}
	return 'google.maps'	
};