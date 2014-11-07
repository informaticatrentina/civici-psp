$(document).ready(function() {
  $('.opinionStatus').click(function() {
    var area = $(this);
    var linkId = $(this).attr('link-id');
    var status = $(this).html();
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    showLoadingImage(area);
    $.ajax({
      type: 'GET',
      url: page.url,
      dataType: 'json',
      data: {
        link_id: linkId,
        status: status,
        id: vars['id']
      },
      success: function(resp) {
        hideLoadingImage(area);
        if (resp.success) {
          area.html(resp.status);
        } else {
          area.html(resp.status);
        }
      },
      error: function(resp) {
        hideLoadingImage(area); 
        area.html(resp.status);
      }
    });
  });
});