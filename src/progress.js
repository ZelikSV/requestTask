(function() {
  const progressDownload = document.querySelector('.progress-bar-download');
  const progressUpload = document.querySelector('.progress-bar-upload');
  const percentageProgressUpload = document.querySelector('.percentage-progress');
  const percentageProgressDownload = document.querySelector('title');

  function clearProgressLine(NodeElement, shownElement) {
    if (shownElement == document.querySelector('title')) {
      shownElement.innerHTML = 'Download Master';
    }
    shownElement.classList.remove('active');
    NodeElement.style.opacity = 0;
    NodeElement.style.width = '0%';
  }

  function downloadLine(event, NodeElement, shownElement) {
    const percentage = Math.round(event.loaded / event.total * 100);
    NodeElement.style.opacity = 1;
    NodeElement.style.width = `${percentage}%`;
    shownElement.classList.add('active');
    shownElement.innerHTML = `${percentage}%`;
    setTimeout(clearProgressLine, 1500, NodeElement, shownElement);
  }

  window.onUploadProgress = event => downloadLine(event, progressUpload, percentageProgressUpload);

  window.onDownloadProgress = event => downloadLine(event, progressDownload, percentageProgressDownload);
}());