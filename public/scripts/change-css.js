$(document).ready(function () {
  //when the icon is pressed it focuses on the text area
  $(document).on('click', '.fas.fa-angle-double-down', function(){
    $("#tweet-text").focus();
  });

  //changes the css of tweet article when the mouse enters it
  $(document).on('mouseenter', '.tweet-container', function (event) {
    const $article = $(event.currentTarget);
    $article.addClass("tweet-shadow");
  });
  $(document).on('mouseleave', '.tweet-container', function (event) {
    const $article = $(event.currentTarget);
    $article.removeClass("tweet-shadow");
  });

  //changes the css of the icons when mouse enters it
  $(document).on('mouseenter', '.fas.fa-flag', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","blue");
  });
  $(document).on('mouseleave', '.fas.fa-flag', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","gray");
  });

  //more icons..
  $(document).on('mouseenter', '.fas.fa-retweet', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","blue");
  });
  $(document).on('mouseleave', '.fas.fa-retweet', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","gray");
  });

  //more icons..
  $(document).on('mouseenter', '.fas.fa-heart', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","blue");
    
  });
  $(document).on('mouseleave', '.fas.fa-heart', function (event) {
    const $article = $(event.currentTarget);
    $article.css("color","gray");
  });
});
