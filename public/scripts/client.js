/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
    $(document).on('mouseenter', '.tweet-container', function () {
      const $article = document.querySelector(".tweet-container")
      $article.classList.toggle(".tweet-shadow");
      console.log($article);
    });
    $(document).on('mouseleave', '.tweet-container', function (){
      console.log('leave');
    })
  });

