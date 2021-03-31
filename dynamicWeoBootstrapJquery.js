(() => {
  loadScript("/tpn/docs/jquery-3.2.1.min.js", { type: 'text/javascript' }), loadScript("https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js", { type: "text/javascript", integrity: "sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd", crossOrigin: "anonymous" }, loadScript("https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css", { rel: "stylesheet", integrity: "sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu", crossOrigin: "anonymous" }));

  function loadScript(src, attr, cb) {
    let s;
    if (attr.type && attr.type === "text/javascript") {
      s = document.createElement('script');
    } else if (attr.rel && attr.rel === "stylesheet") {
      s = document.createElement('stylesheet');
    } else {
      s = document.createElement('div');
    }
    s.src = src;
    Object.keys(attr).forEach(key =>
      s[key] = attr[key]
    );
    document.head.insertAdjacentElement("afterbegin", s);
    if (s.readyState) {
      s.onreadystatechange = function () {
        if (s.readyState === "loaded" || s.readyState === "complete") {
          s.onreadystatechange = null;
          if (cb && typeof cb === "function") {
            cb();
          }
        }
      };
    } else {
      s.onload = function () {
        if (cb && typeof cb === "function") {
          cb();
        }
      };
    }
  };
})();