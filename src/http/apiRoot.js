let domain = window.location.origin + '/';
let hostnames = ['localhost', '0.0.0.0'];

// 本地环境
if (hostnames.indexOf(window.location.hostname) > -1) {
  domain = domain + 'dev/';
}

export default domain;
