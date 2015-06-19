var arrayQuery, generateurl, loadparams;

arrayQuery = function() {
  var i, pair, pairs, request, url;
  url = window.location.href;
  request = {};
  pairs = url.substring(url.indexOf('?') + 1).split('&');
  i = 0;
  while (i < pairs.length) {
    pair = pairs[i].split('=');
    request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    i++;
  }
  return request;
};

loadparams = function() {
  var code, ctheme, ff, fs, gfm, gistid, lists, pedant, query, san, sp, theme, txt, val;
  query = arrayQuery();
  gfm = query['gfm'];
  lists = query['sl'];
  san = query['san'];
  pedant = query['ped'];
  sp = query['sp'];
  txt = query['txt'];
  fs = query['fs'];
  ff = query['ff'];
  val = decodeURIComponent(query['val']);
  gistid = decodeURIComponent(query['gistid']);
  code = query['code'];
  theme = query['theme'];
  ctheme = decodeURIComponent(query['ctheme']);
  if (code !== 'true' || code === void 0) {
    if (query['val'] === void 0) {
      document.getElementById('ugly').value = '';
    } else {
      document.getElementById('ugly').value = val;
    }
    if (query['gistid'] !== void 0) {
      $.ajax({
        url: 'https://api.github.com/gists/' + gistid,
        type: 'GET',
        dataType: 'jsonp'
      }).success(function(gistdata) {
        var content, names;
        names = Object.keys(gistdata.data.files);
        content = gistdata.data.files[names[0]].content;
        document.getElementById('ugly').value = content;
        console.log('Gist ' + gistid + ' loaded successfully.');
      }).error(function(e) {
        console.log('There was an error loading Gist ' + gistid);
      });
    }
    if (gfm === 'true') {
      $('#gfm').attr('checked', true);
    } else if (gfm === 'false') {
      $('#gfm').attr('checked', false);
    } else {
      $('#gfm').attr('checked', true);
    }
    if (lists === 'true') {
      $('#smartlists').attr('checked', true);
    } else if (lists === 'false') {
      $('#smartlists').attr('checked', false);
    } else {
      $('#gfm').attr('checked', true);
    }
    if (san === 'true') {
      $('#sanitize').attr('checked', true);
    } else {
      $('#sanitize').attr('checked', false);
    }
    if (pedant === 'true') {
      $('#pedantic').attr('checked', true);
    } else {
      $('#pedantic').attr('checked', false);
    }
    if (sp === 'true') {
      $('#smartypants').attr('checked', true);
    } else {
      $('#smartypants').attr('checked', false);
    }
    if (txt === 'true') {
      $('#txt').attr('checked', true);
      mddisable();
    } else {
      $('#txt').attr('checked', false);
    }
    if (fs === null || fs === '' || fs === void 0) {
      document.getElementById('font-size').value = '12';
    } else {
      document.getElementById('font-size').value = fs;
    }
    switch (ff) {
      case 'lato':
        document.getElementById('font-family').selectedIndex = 0;
        break;
      case 'gloria':
        document.getElementById('font-family').selectedIndex = 1;
        break;
      case 'opensans':
        document.getElementById('font-family').selectedIndex = 2;
        break;
      case 'merri':
        document.getElementById('font-family').selectedIndex = 3;
        break;
      case 'incons':
        document.getElementById('font-family').selectedIndex = 4;
        break;
      default:
        document.getElementById('font-family').selectedIndex = 3;
        break;
    }
    return 'Done getting parameters.';
  } else {
    windowcontroller('code');
    if (query['val'] === void 0) {
      document.getElementById('sourcecode').value = '';
    } else {
      document.getElementById('sourcecode').value = val;
    }
    if (theme === void 0) {
      document.getElementById('theme').selectedIndex = 0;
    } else if (theme === 4) {
      $('#custom').collapse('show');
      document.getElementById('customlink').value = ctheme;
    } else if (theme !== void 0) {
      document.getElementById('theme').selectedIndex = theme;
    }
    if (query['gistid'] !== void 0) {
      $.ajax({
        url: 'https://api.github.com/gists/' + gistid,
        type: 'GET',
        dataType: 'jsonp'
      }).success(function(gistdata) {
        var content, lang, names;
        names = Object.keys(gistdata.data.files);
        content = gistdata.data.files[names[0]].content;
        lang = gistdata.data.files[names[0]].language;
        document.getElementById('sourcecode').value = content;
        document.getElementById('lang').value = lang;
        console.log('Gist ' + gistid + ' loaded successfully.');
      }).error(function(e) {
        console.log('There was an error loading Gist ' + gistid);
      });
    }
    return 'Done getting parameters for code.';
  }
};

generateurl = function() {
  var code, customlink, ff, font_family, font_size, gfm, gist, link, pedantic, sanitize, smartlists, smartypants, theme, txt, val;
  font_size = document.getElementById('font-size').value;
  font_family = document.getElementById('font-family').selectedIndex;
  gfm = document.getElementById('gfm').checked.toString();
  sanitize = document.getElementById('sanitize').checked.toString();
  pedantic = document.getElementById('pedantic').checked.toString();
  smartypants = document.getElementById('smartypants').checked.toString();
  smartlists = document.getElementById('smartlists').checked.toString();
  txt = document.getElementById('txt').checked.toString();
  code = document.getElementById('code').checked.toString();
  val = encodeURIComponent(document.getElementById('url-text').value);
  gist = encodeURIComponent(document.getElementById('gistid').value);
  theme = document.getElementById('theme').selectedIndex;
  customlink = encodeURIComponent(document.getElementById('customlink').value);
  if (code === 'false') {
    ff = void 0;
    switch (font_family) {
      case 0:
        ff = 'lato';
        break;
      case 1:
        ff = 'gloria';
        break;
      case 2:
        ff = 'opensans';
        break;
      case 3:
        ff = 'merri';
        break;
      case 4:
        ff = 'incons';
    }
    link = 'http://ethanarterberry.com/Sexydown?gfm=' + gfm + '&sl=' + smartlists + '&san=' + sanitize + '&ped=' + pedantic + '&sp=' + smartypants + '&txt=' + txt + '&fs=' + font_size + '&ff=' + ff + '&val=' + val + '&gistid=' + gist;
  } else {
    if (customlink === '') {
      link = 'http://ethanarterberry.com/Sexydown?code=' + code + '&val=' + val + '&gistid=' + gist + '&theme=' + theme;
    } else {
      link = 'http://ethanarterberry.com/Sexydown?code=' + code + '&val=' + val + '&gistid=' + gist + '&theme=4&ctheme=' + customlink;
    }
  }
  document.getElementById('link').innerHTML = link;
  $('#link').attr('href', link);
};

// ---
// generated by coffee-script 1.9.2