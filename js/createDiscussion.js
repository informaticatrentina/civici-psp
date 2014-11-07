$(document).ready(function() {
  discusstionNmae = '';
  if ( $('#discussionTitle').val() != '') {
    var discusstionNmae = $('#discussionTitle').val() + ' | ';
  }
  document.title = discusstionNmae + title;
  $('#create').click(function() {
    if ($('#discussionTitle').val() == '') {
      $('#error').html(Yii.t('js', "Please enter Discussion Title")).css('color', 'red');
      return false;
    }
    if ($('#discussionSummary').val() == '') {
      $('#error').html(Yii.t('js', "Please enter Discussion Summary")).css('color', 'red');
      return false;
    }
  });
  $('#discussionTitle').blur(function() {
    $('#discussionSlug').val(convertToSlug($('#discussionTitle').val()));
  });
});
function convertToSlug(text) {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '_');
}


