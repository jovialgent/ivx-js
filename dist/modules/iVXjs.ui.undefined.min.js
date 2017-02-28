!function (error) {
  console.error(error);
  if (typeof document === 'undefined') {
    return;
  } else if (!document.body) {
    document.addEventListener('DOMContentLoaded', print);
  } else {
    print();
  }
  function print() {
    var pre = document.createElement('pre');
    pre.className = 'errorify';
    pre.textContent = error.message || error;
    if (document.body.firstChild) {
      document.body.insertBefore(pre, document.body.firstChild);
    } else {
      document.body.appendChild(pre);
    }
  }
}({"message":"Cannot find module '/Users/georgepetersen/Documents/ivx-js copy/src/modules/ui/undefined/index.js' from '/Users/georgepetersen/Documents/ivx-js copy'","name":"Error","stack":"Error: Cannot find module '/Users/georgepetersen/Documents/ivx-js copy/src/modules/ui/undefined/index.js' from '/Users/georgepetersen/Documents/ivx-js copy'\n    at /Users/georgepetersen/Documents/ivx-js copy/node_modules/resolve/lib/async.js:55:21\n    at load (/Users/georgepetersen/Documents/ivx-js copy/node_modules/resolve/lib/async.js:69:43)\n    at onex (/Users/georgepetersen/Documents/ivx-js copy/node_modules/resolve/lib/async.js:92:31)\n    at /Users/georgepetersen/Documents/ivx-js copy/node_modules/resolve/lib/async.js:22:47\n    at FSReqWrap.oncomplete (fs.js:111:15)"})