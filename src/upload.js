/* eslint-disable no-undef */
document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { downloadLine, data: form });
  document.querySelector('.btn-upload').disabled = true;
  filesList();
};