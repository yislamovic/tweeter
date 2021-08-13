/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const determineDate = function (date) {
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");
  return diffDays;
}

const createTweet = function (obj, now) {
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
        <span>${now ? timeago.format(new Date()) : determineDate(obj.created_at) + ' days ago'} </span>
        </div>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>  
      </div>
    <article>
    `
  )
}

const renderTweets = function () {
  $.ajax('/tweets', { method: "GET", dataType: "json" })
  .then(result => {
    for (let user of result) {
      $('.contains-tweets').prepend(
       createTweet(user, false)
      )
    }
  })
  .catch(error => {
    console.log(error);
  })
}

$(document).ready(function () {
  renderTweets();
  $("#form").on('submit', function (event) {
    event.preventDefault();
    const $textArea = document.getElementById('tweet-text');
    const tweet = $("#tweet-text").serialize();
    if ($textArea.value.length > 140) {
      if ($('#error').length) {
        const elem = document.getElementById("error");
        elem.remove();
      }
      $('.contains-tweets').prepend(`
      <p id="error">You have exceeded the maximum characters alloted!</p>`);
    }
    if ($textArea.value.length === 0) {
      if ($('#error').length) {
        const elem = document.getElementById("error");
        elem.remove();
      }
      $('.contains-tweets').prepend(`
      <p id="error">You didnt write anything!</p>`);
    }
    if ($textArea.value && $textArea.value.length <= 140) {
      if ($('#error').length) {
        const elem = document.getElementById("error");
        elem.remove();
      }
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
              createTweet(obj, true);
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



