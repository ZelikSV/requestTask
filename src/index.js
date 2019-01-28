const inputUpload = document.getElementById('download');
const uploadLabel = document.querySelector('.download-icon span');
const btnUpload = document.querySelector('.btn-upload');
const inputDownload = document.querySelector('.search-field');
const btnDownload = document.querySelector('.btn-download');


inputUpload.onchange = function() {
  if (this.value !== '') {
    btnUpload.disabled = false;
    uploadLabel.innerHTML = this.value.replace(/.*\\/, '');
  } else {
    uploadLabel.innerHTML = 'Choice your file';
    btnUpload.disabled = true;
  }
};

inputDownload.oninput = function() {
  if (this.value !== '') {
    btnDownload.disabled = false;
  } else {
    btnDownload.disabled = true;
  }
};