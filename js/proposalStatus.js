$(document).ready(function() {
  $('.proposalStatus').click(function() {
    var area = $(this);
    var proposalId = $(this).attr('proposal-id');
    var status = $(this).html();
    if (proposalId == '' && status == '') {
      return false;
    }
    showLoadingImage(area);
    $.ajax({
      type: 'GET',
      url: page.proposalStatusUrl,
      dataType: 'json',
      data: {
        proposal_id: proposalId,
        status: status,
      },
      success: function(resp) {
        hideLoadingImage(area);
        if (resp.success) {
          area.html(resp.status);
        } else {
          area.html(status);
        }
      },
      error: function(resp) {
        hideLoadingImage(area);
        area.html(status);
      }
    });
  });
});
