var e_date = '';
var s_date = '';
$(document).ready(function() {
  if ($('#startDate').length > 0) { 
    $( "#startDate" ).datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange:"-90:+0",
      onSelect: function( selectedDate ) {
        $( "#endDate" ).datepicker( "option", "minDate", selectedDate );        
      }
    });
    $( "#endDate" ).datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange:"-90:+0",
      onSelect: function( selectedDate ) {
        $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );       
      }
    });
  }
  
  $('.login-link').click(function() {
    var pathname = window.location.pathname;
    $.pageslide({ direction: 'left', href: page.base_url + 'login?back=' + pathname });
    return false; 
  });
  
  $('.register-link').click(function() {
    var pathname = window.location.pathname;
    $.pageslide({ direction: 'left', href: page.base_url + 'register?back=' + pathname});
    return false; 
  });
});    

function showLoadingImage(area) {
  $(area).hide();
  $(area).siblings('.loading-image').show();
}
function hideLoadingImage(area) {
  $(area).siblings('.loading-image').hide();
  $(area).show(); 
}