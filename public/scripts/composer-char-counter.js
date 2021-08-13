$(document).ready(function () {
  //gets all the elements by the id..
  const $textArea = document.getElementById('tweet-text');
  const $output = document.getElementById('counter');
  $($textArea).on('input', () => {
    //when the textarea has input
    const currentLength = $textArea.value.length;
    $output.value = currentLength;//assign the length of the value of the textarea
    if(currentLength > 140){//condition that changes the css when character limit has reached
      $output.style.color = 'red';
    }
    else{
      $output.style.color = 'black';
    }
    if(currentLength === 0){
      $output.value = "Max chars 140";
    }
  });
});