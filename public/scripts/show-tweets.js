const determineDate = function (date) {
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");
  return diffDays;
}

$(document).ready(function () {
  $.ajax('/tweets', { method: "GET", dataType: "json" })
  .then(result => {
    for (let user of result) {
      $('.contains-tweets').prepend(
        `
        <article class="tweet-container">
          <div class="header">
            <div class="name-image">
              <img class="image" src="${user.user.avatars}"/>
              <span>${user.user.name}</span>
            </div>
            <span>${user.user.handle}</span>
          </div>
          <p3>${user.content.text}</p3>
          <hr class="seperator"></hr>
          <div class="footer">
            <div>
            <span>${determineDate(user.created_at) + " days ago"}</span>
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
    }
  })
  .catch(error => {
    console.log(error);
  })
});
