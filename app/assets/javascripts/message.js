

$(function(){
  function buildHTML(message) {
    var img = ""
    if (message.image !== null) {
        img = `<img src="${message.image.url}">`
    }
    
    var html = `<div class="right-content__main__box" data-id="${message.id}">
                  <div class="right-content__main__box__name">
                    ${message.user_name}
                  </div>  
                  <p class="right-content__main__box__timestamp">
                    ${message.date}
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
    console.log(message)
    var url = (window.location.href);
    console.log(url)
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
  


  

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $('.right-content__main').animate({scrollTop: $('.right-content__main')[0].scrollHeight}, 'fast');
      var last_message_id = $('.right-content__main').last().data('id');
      var href = 'api/messages'
      $.ajax({
        url: 'api/messages',
        type: "GET",
        data: {id: last_message_id},
        dataType: "json"
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var insertHTML = buildHTML(message)
          $('#message').append(insertHTML)
          $('.right-content__main').animate({scrollTop: $('.right-conten__main')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval);
      }
  } , 5000 );
});


