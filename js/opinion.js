$(document).ready(function() {
  $('.opinionStatus').click(function() {
    var area = $(this);
    var opinionId = $(this).attr('opinion-id');
    var tagName = $(this).attr('tag-name');
    var discussionId = $(this).attr('discussion-id');
    var status = $(this).html();
    showLoadingImage(area);
    $.ajax({
      type: 'GET',
      url: page.url,
      dataType: 'json',
      data: {
        opinion_id: opinionId,
        status: status,
        tag_name : tagName,
        discussion_id : discussionId
      },      
      success: function(resp) {
        hideLoadingImage(area);
        if (resp.success) {
          area.html(resp.status);
        } else {
          area.html(status);
          alert(resp.msg);
        }
      }, 
      error: function(resp){
        hideLoadingImage(area);
        area.html(status);
      }        
    });
  });
});
