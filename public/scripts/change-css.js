$(document).ready(function () {
  //fas fa-angle-double-down
  $(document).on('click', '.fas.fa-angle-double-down', function(){
    $("#tweet-text").focus();
  });
  $(document).on('mouseenter', '.tweet-container', function (event) {
    const $article = $(event.currentTarget);
    $article.addClass("tweet-shadow");
  });
  $(document).on('mouseleave', '.tweet-container', function (event) {
    const $article = $(event.currentTarget);
    $article.removeClass("tweet-shadow");
  });
  $(document).on('mouseenter', '.fas.fa-flag', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","blue");
  });
  $(document).on('mouseleave', '.fas.fa-flag', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","gray");
  });
  $(document).on('mouseenter', '.fas.fa-retweet', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","blue");
  });
  $(document).on('mouseleave', '.fas.fa-retweet', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","gray");
  });
  $(document).on('mouseenter', '.fas.fa-heart', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","blue");
    
  });
  $(document).on('mouseleave', '.fas.fa-heart', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","gray");
  });
});
