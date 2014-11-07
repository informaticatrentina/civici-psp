var titleCount = '';
var proposalCount = '';
$(document).ready(function() {
  $(function() {
    $.extend($.tablesorter.themes.bootstrap, {
      table: 'table table-bordered',
      caption: 'caption',
      header: 'bootstrap-header', // give the header a gradient background
      footerRow: '',
      footerCells: '',
      icons: '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
      sortNone: 'bootstrap-icon-unsorted',
      sortAsc: 'icon-chevron-up glyphicon glyphicon-chevron-up', // includes classes for Bootstrap v2 & v3
      sortDesc: 'icon-chevron-down glyphicon glyphicon-chevron-down', // includes classes for Bootstrap v2 & v3
    });

    // call the tablesorter plugin and apply the uitheme widget
    $("table").tablesorter({
      theme: "bootstrap",
      widthFixed: true,
      headerTemplate: '{content} {icon}',
      widgets: ["uitheme", "zebra"],
      widgetOptions: {
        zebra: ["even", "odd"],
      }
    });
  });
  
  $('.edit-proposal').click(function(){
    $('#proposal-error').addClass('hidden');
    var proposalId = $(this).attr('proposal-id');
    var proposalTitle = $(this).siblings('td').children('.proposal-title').html();
    var proposalSummary = $(this).attr('proposal-summary');
    var proposalDescription = $(this).siblings('.proposal-description').html(); 
    $('#title').val(proposalTitle);
    $('#proposal-summary').val(proposalSummary);
    $('#proposal-description').val(proposalDescription);
    $('#proposal-id').val(proposalId);
    $('#title, #proposal-summary').trigger('keyup');
   });
  
  $('#updateProposal').click(function(e) {
    e.preventDefault();
    var title = $('#title').val();
    if ($.trim(title) == '') {
      $('#proposal-error').removeClass('hidden');
      $('#proposal-error').addClass('alert-danger');
      $('#proposal-error').html(Yii.t('js', ' Proposal title can not be empty'));
      return false;
    }
    var summary = $('#proposal-summary').val();
    if ($.trim(summary) == '') {
      $('#proposal-error').removeClass('hidden');
      $('#proposal-error').addClass('alert-danger');
      $('#proposal-error').html(Yii.t('js', ' Proposal summary can not be empty'));
      return false;
    }
    var description = $('#proposal-description').val();
    if ($.trim(description) == '') {
      $('#proposal-error').removeClass('hidden');
      $('#proposal-error').addClass('alert-danger');
      $('#proposal-error').html(Yii.t('js', ' Proposal description can not be empty'));
      return false;
    }
    if ($('.topic').length != 0) {
      if ($('.topic:checked').length == 0) {
        $('#proposal-error').removeClass('hidden');
        $('#proposal-error').addClass('alert-danger');
        $('#proposal-error').html(Yii.t('js', ' Please select atleast one topic'));
        return false;
      }
    }    
    $('#update-proposal-form').submit();
  });
  
  $("#title, #proposal-summary").bind('paste', function(e) {
    var self = $(this);
    self.attr('maxlength', '');
    setTimeout(function() {
      var pastedText = self.val();
      var pastedLength = pastedText.length;
      switch (self.attr('id')) {
        case 'title' :
          titleCount = tcharLimit - pastedLength;
          if (titleCount < 0) {
            $('#proposal-error').html(Yii.t('js', 'Title should be atmost 50 characters.'));
            $('#proposal-error').removeClass('hidden');
            $('#updateProposal').attr('disabled', 'true');
          }
          self.siblings('.words').text(titleCount);
          break;
        case 'proposal-summary' :
          proposalCount = icharLimit - pastedLength;
          if (proposalCount < 0) {
            $('#proposal-error').html(Yii.t('js', 'Proposal Introduction should be atmost 500 characters.'));
            $('#proposal-error').removeClass('hidden');
            $('#updateProposal').attr('disabled', 'true');
          }
          self.siblings('.words').text(proposalCount);
          break;
      }
      if (titleCount <= tcharLimit && titleCount >= 0 && proposalCount <= icharLimit && proposalCount >= 0) {
        $('#proposal-error').addClass('hidden');
        $('#proposal-error').html('');
        $('#updateProposal').removeAttr('disabled');
      }
    }, 100);
  });

  $('#title, #proposal-summary').keydown(function() {
    switch ($(this).attr('id')) {
      case 'title' :
        $(this).attr('maxlength', tcharLimit);
        break;
      case 'proposal-summary' :
        $(this).attr('maxlength', icharLimit);
        break;
    }
  });
  
  $('#title, #proposal-summary').keyup(function() {        
    switch ($(this).attr('id')) {
      case 'title':
        titleCount = tcharLimit - $(this).val().length;
        $(this).siblings('.words').text(titleCount);
        if (titleCount < 0) {
          $('#proposal-error').removeClass('hidden');
          $('#proposal-error').html(Yii.t('js', 'Title should be atmost 50 characters'));
        }
        break;
      case 'proposal-summary' :
        proposalCount = icharLimit - $(this).val().length;
        $(this).siblings('.words').text(proposalCount);
        if (proposalCount < 0) {
          $('#proposal-error').removeClass('hidden');
          $('#proposal-error').html(Yii.t('js', 'Proposal Introduction should be atmost 500 characters'));
        }
        break;
    }
    if (titleCount <= tcharLimit && titleCount >= 0 && proposalCount <= icharLimit && proposalCount >= 0) {
      $('#proposal-error').addClass('hidden'); 
      $('#proposal-error').html('');
      $('#updateProposal').removeAttr('disabled');
    } else if (titleCount >= 0 && titleCount <= tcharLimit) {
      if (proposalCount < 0) {
        $('#proposal-error').html(Yii.t('js', 'Proposal Introduction should be atmost 500 characters'));
        $('#proposal-error').removeClass('hidden');
        $('#updateProposal').attr('disabled','true'); 
      }
    } else if (proposalCount >= 0 && proposalCount <= icharLimit) {
      if (titleCount < 0) {
        $('#proposal-error').html(Yii.t('js', 'Title should be atmost 50 characters'));
        $('#proposal-error').removeClass('hidden');
        $('#updateProposal').attr('disabled','true');
      }
    }
  });
});
