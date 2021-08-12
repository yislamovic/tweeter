/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  
  $(document).on('mouseenter', '.tweet-container', function (event) {
    const $article = $(event.currentTarget);
    $article.addClass("tweet-shadow");
  });
  $(document).on('mouseleave', '.tweet-container', function (event) {
    const $article = $(event.currentTarget);
    $article.removeClass("tweet-shadow");
  });
  $("#form").on('submit', function (event) {
    event.preventDefault();
    const $textArea = document.getElementById('tweet-text');
    const tweet = $("#tweet-text").serialize();
    if ($textArea.value.length > 140) {
      if( $('#error').length ) {
        const elem = document.getElementById("error");
        elem.remove();
      }
      $('.contains-tweets').prepend(`
      <p id="error">You have exceeded the maximum characters alloted!</p>`);
    }
    if ($textArea.value.length === 0) {
      if( $('#error').length ) {
        const elem = document.getElementById("error");
        elem.remove();
      }
      $('.contains-tweets').prepend(`
      <p id="error">You didnt write anything!</p>`);
    }
    if ($textArea.value && $textArea.value.length <= 140) {
      if( $('#error').length ) {
        const elem = document.getElementById("error");
        elem.remove();
      }
      // $.ajax({ type: "POST", url: '/tweets', data: tweet })
      //   .done(function (data) {
      //     console.log(data);
      //     console.log("success");
      //   })
      //   .fail(function () {
      //     console.log("error");
      //   })
      //   .always(function () {
      //     console.log("finished");
      //   });
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweet,
        success: function (data) {
          console.log("The ajax request succeeded!");
          console.log("The result is: ");
          console.dir(data);
          $.ajax('/tweets', { method: "GET", dataType: "json" })
            .then(result => {
              const obj = result.reverse()[0];
              console.log(result.reverse()[0]);
              $('.contains-tweets').prepend(
                `
                <article class="tweet-container">
                  <div class="header">
                    <div class="name-image">
                      <img class="image" src="${obj.user.avatars}"/>
                      <span>${obj.user.name}</span>
                    </div>
                    <span>${obj.user.handle}</span>
                  </div>
                  <p3>${obj.content.text}</p3>
                  <hr class="seperator"></hr>
                  <div class="footer">
                    <div>
                    <span>1 + " days ago"}</span>
                    </div>
                    <div class="icons">
                      <i id="flag" class="fas fa-flag"></i>
                      <i class="fas fa-retweet"></i>
                      <i class="fas fa-heart"></i>
                    </div>  
                  </div>
                <article>
                `
              )
            })
            .catch(error => {
              console.log(error);
            })
        },
        error: function () {
          console.log("The request failed");
        }
      });
    }
  })
});

