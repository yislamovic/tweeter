$(document).ready(function () {
  const $textArea = document.getElementById('tweet-text');
  const $output = document.getElementById('counter');
  $($textArea).on('input', () => {
    $output.value = $output.value - 1;
    if($output.value < 0){
      $output.style.color = 'red';
    }
  });
});