
$(function(){
  function buildHTML(message) {
    var img = (message.image)? `<imag class="lower-message__image" src=${message.image}>` :"";
    var html = `<div class="right-content__main__box" data-id="${message.id}">
                  <div class="right-content__main__box__name">
                    ${message.user_name}
                  </div>  
                  <p class="right-content__main__box__timestamp">
                    ${message.created_at}
                  </p>
                </div>
                <div class="right-content__main__message">
                  <p class="lower-message__content">
                    ${message.content}
                  <p>
                    ${img}
                  </p>
                </div>`
  return html; 
  }

  function ScrollToNewMessage(){
    $('.right-content__main').animate({scrollTop: $('.right-content__main')[0].scrollHeight}, 'fast');
  }



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      console.log(data);
      console.log(html)
      $('.right-content__main').append(html);
      $('#new_message')[0].reset();
      $('.right-content__main').animate({scrollTop: $(".right-content__main")[0].scrollHeight }, 'fast');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.right-content__footer__send-button').prop('disabled', false);
    })
  })
  

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.right-content__main__box:last').data('id');
      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.right-content__main').append(insertHTML);
        })
        $('.right-content__main').animate({scrollTop: $('.right-content__main')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });  
    }
  };
  setInterval(reloadMessages, 5000);
});

  

