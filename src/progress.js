const progress = document.getElementById('progress');

function downloadLine(event) {
  if (event.total === event.loaded) {
    progress.style.opacity = 1;
    progress.style.width = '100%';
    setTimeout(() => {
      progress.style.opacity = 0;
      progress.style.width = '0%';
    }, 1500);
  }
}

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  // eslint-disable-next-line no-undef
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { downloadLine, data: form });
};
