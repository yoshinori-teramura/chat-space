

$(function(){
  function buildHTML(message) {
    
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="right-content__main__box" data-id="${message.id}">
                    <p class="right-content__main__box__namem>
                      ${message.user_name}
                    </p>  
                    <p class="right-content__main__box__timestamp">
                      ${message.date}
                    </p>
                </div>
                <div class="right-content__main__message">
                    <p class="lower-message__content">
                    <div>
                      ${content}
                    </div>  
                    <p>
                      ${img}
                    </p>
                </div>`
  return html;
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
    // .done(function (messages) {
    //   console.log('success');
    // })
    // .fail(function () {
    //   console.log('error');
    // });
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      console.log(html)
      $('.right-content__main').append(html);
      // $('#message_content').val(''); //input内のメッセージを消しています。
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);　//ここで解除している
    })
  })
});


