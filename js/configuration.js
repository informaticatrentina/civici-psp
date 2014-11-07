$(document).ready(function() {
  $("table tr td").on('blur', "input[type='text'], textarea", function(e) {
    $.ajax({
      url: document.URL,
      type: 'POST',
      data: {key: $(this).siblings('.action').val(), value: $(this).val()},
    });
    $(this).closest('td').text($(this).val());
  });
  $("table").on('click', 'td', function(e) {
    if ($(this).attr('class') == 'value') {
      if ($(this).find('input').length) {
        return;
      }
      if ($(this).siblings('.name').text() == 'Text to display on home page when submission if Off') {
        var input = $("<textarea></textarea>").val($(this).text());
      } else {
        var input = $("<input type='text' size='5' />").val($(this).text());
      }
      var action = $("<input class='action' type='hidden' value='5'/>").val($(this).siblings('.hidden').text());
      $(this).empty().append(input);
      $(this).append(action);
    }
  });
});
