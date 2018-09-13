(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 100, // Creates a dropdown of 50 years to control year
    	format: "dd/mm/yyyy"
  	});

  }); // end of document ready
})(jQuery); // end of jQuery name space