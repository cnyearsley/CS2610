$(document).ready(function(){
	loadPage();
	// $('#welcome-text').slideUp();
	$('#welcome-text').slideDown(2000);
});

function loadPage(){
	$('#main-logo').click(function(){
		console.log("This is at test");
	});
	$('#welcome-buttons').delay(2000).fadeIn(1000);
}
