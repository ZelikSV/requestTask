/* global  HttpRequest */
(function() {
  const request = new HttpRequest({ baseUrl: 'http://localhost:8000/' });

  function render(listFiles) {
    if (listFiles.length === 0) {
      return '<li>Your list is empty</li>';
    } else {
      return `${listFiles.map(item => `<li>${item}</li>`).join('\n')}`;
    }
  }

  class FileList {
    constructor(nodeEl) {
      if (!nodeEl) {
        throw new Error('you are missing parents element');
      }
      this.parent = nodeEl;
      this.data = [];
      this.init();
    }

    init() {
      this.load()
        .then(() => this.render());
    }

    clickListener(element, cb) {
      this.parent.addEventListener('click', function(e) {
        element.value = e.target.innerHTML;
        cb();
      });
    }

    load() {
      return request.get('/list', { responseType: 'json' })
        .then(data => (this.data = data));
    }

    render() {
      this.parent.innerHTML = render(this.data);
    }
  }
  window.FileList = FileList;
  window.request = request;
}());

