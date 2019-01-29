const progress = document.getElementById('progress');

function downloadLine(event) {
  const percentage = Math.round(event.loaded / event.total * 100);
  progress.style.opacity = 1;
  progress.style.width = `${percentage}%`;
  document.title = `${percentage}%`;
  setTimeout(() => {
    document.title = 'Download Master';
    progress.style.opacity = 0;
    progress.style.width = '0%';
  }, 1500);
}
