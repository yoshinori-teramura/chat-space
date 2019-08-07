$(function(){
  function buildHTML(message) {
    
    var content = message.content ? `${ message.content }` : "";
    var img = (message.image) ? `<img src= ${ message.image }>` : "";
    var html = `<div class="right-content__main__box" data-id="${message.id}">
                  <div class="right-content__main__box__namem">
                    ${message.user_name}
                  </div>  
                  <p class="right-content__main__box__timestamp">
                    ${message.date}
                  </p>
                </div>
                <div class="right-content__main__message">
                  <p class="lower-message__content">
                    ${content}
                  <p>
                    ${img}
                  </p>
                </div>`
  return html;
  }

  function ScrollToNewMessage(){
    $('.right-content__maine').animate({scrollTop: $('.right-content__main')[0].scrollHeight}, 'fast');
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
      console.log(data)
      var html = buildHTML(data);
      console.log(html)
      $('.right-content__main').append(html);
      $('.right-content__footer__text')[0].reset();

      $('.right-content__main').animate({scrollTop: $(".right-content__main")[0].scrollHeight }, 'fast');

    
      

    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.right-content__footer__send-button').prop('disabled', false); //送信ボタンのここで解除している
    })
  })
});

      $('.right-content__main').animate({scrollTop: $(".right-content__main")[0].scrollHeight }, 'fast');

    
      
