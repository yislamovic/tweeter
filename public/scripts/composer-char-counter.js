$(document).ready(function () {
  const $textArea = document.getElementById('tweet-text');
  const $output = document.getElementById('counter');
  $($textArea).on('input', () => {
    const currentLength = $textArea.value.length;
    $output.value = currentLength;
    if(currentLength > 140){
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