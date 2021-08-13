/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const determineDate = function (date) {// function that gets the current date and date from database and returns the time since posted
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

const escape = function (str) {//escape function that escapes html and prevents scripts from bieng appened to the index.html
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweet = function (obj, now) {//function that determines the structure of the tweet that will be appened to the html dynamically
    //paramaters are the object and a boolean; boolean is for determining if the tweet is posted now or already in the db
    
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
      <p3>${escape(obj.content.text)}</p3>
      <hr class="seperator"></hr>
      <div class="footer">
        <div>  <!-- This ternary is what determines the date either 'just now' or date in db -->
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

const renderTweets = function () {// this gets all the tweets from the database and calls createTweets() to append them to html
  $.ajax('/tweets', { method: "GET", dataType: "json" })
  .then(result => {
    for (let user of result) {
      $('.contains-tweets').prepend(//prepends to the contains-tweets container
       createTweet(user, false)//calls create tweet and renders all tweets; (notice how the boolean is false?) this means it will call determineDate()
      )
    }
  })
  .catch(error => {
    console.log(error);
  })
}

$(document).ready(function () {
  renderTweets();//renders all the tweets on documents load
  $("#form").on('submit', function (event) {
    event.preventDefault();//prevents the defualt behavour of refreshing the page on form submit
    const $textArea = document.getElementById('tweet-text');
    const tweet = $("#tweet-text").serialize();
    //error handling; checking all requirements for a tweet before it gets posted
    if ($textArea.value.length > 140) {
      if ($('#error').length) {//if the error html already exist; remove it 
        const elem = document.getElementById("error");
        elem.remove();
      }//append an error in html above the tweet container  
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
    
    //if the conditions for tweet are met..
    if ($textArea.value && $textArea.value.length <= 140) {
      if ($('#error').length) {
        const elem = document.getElementById("error");
        elem.remove();
      }
      $.ajax({//post request to DB
        type: "POST",
        url: "/tweets",
        data: tweet,//serialized data from text area
        success: function (data) {
          //if POST was succesful; get the latest tweet and append it
          $.ajax('/tweets', { method: "GET", dataType: "json" })
            .then(result => {
              const obj = result.reverse()[0];//reverses the object to get the most current tweet
              createTweet(obj, true);//calls createTweet; true means the date displays 'just now'
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
    $textArea.value = '';//clears the text area
  })
});



