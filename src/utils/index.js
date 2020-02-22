// 获取url参数
// 如：http://localhost:8080/?sid=c42c175c4ca9d6a063882e2b8abbb574220cd42f%20&ticket=1556522994mKz2oe&o=pptest#/
export function getQueryString (name) {
  let reg = `(^|&)${name}=([^&]*)(&|$)`;
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  // 场景：http://localhost:8084/?a=2#/home&sid=c7c257c1a0d5c6216f3b5f5e6709686f2eb5bf2c%20&ticket=1565089298kvtyyC&o=retesting
  let r2 = window.location.href.substr(1).match(reg);
  if (r2 != null) return unescape(r2[2]);
  return null;
};

// 获取url hash参数
// 如果 http://localhost:8080/#/?sid=c42c175c4ca9d6a063882e2b8abbb574220cd42f%20&ticket=1556522994mKz2oe&o=pptest
export function getQueryStringFromHash (name) {
  var after = window.location.hash.split('?')[1];
  if (after) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
};

// 尝试从hash和search上获取参数
export function getQueryStringFromHashOrSearch (name) {
  let query = getQueryStringFromHash(name);
  if (query) {
    return query;
  } else {
    query = getQueryString(name);
    if (query) {
      return query;
    }
  }
  return null;
};

/**
 * 截断字符，超出补后缀（...）
 * value 要截断的字符
 * length 超出长度
 * suffix 后缀 默认 ...
 */
export function subString (value, length = 10, suffix = '...') {
  return value ? (value.length > length ? (value.substring(0, length)) + suffix : value) : '';
}

/**
 * 格式化手机号码 星星符号替换
 *
 */
export function starPhone (phone) {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return phone.replace(reg, '$1****$2');
}
/**
 * 删除url中的参数
 * @param {string} url url
 * @param {string} parameter 参数
 */
export function removeURLParameter (url, parameter) {
  const urlparts = url.split('?');
  if (urlparts.length >= 2) {
    // 参数名前缀
    const prefix = encodeURIComponent(parameter) + '=';
    const pars = urlparts[1].split(/[&;]/g);

    // 循环查找匹配参数
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        // 存在则删除
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

// 删除url的ticket，sid，o参数
export function removeUrlAuthParameter (url) {
  if (url.indexOf('ticket') > -1) {
    url = removeURLParameter(url, 'ticket');
    url = removeURLParameter(url, 'sid');
    url = removeURLParameter(url, 'o');
  }
  return url;
}
// 转成json，否则返回{}
export function try2JSON (jsonString) {
  let json;
  try {
    json = JSON.parse(jsonString);
  } catch (e) {
    json = {};
  }
  return json;
}

// 获取页面header的高度
export function getHeaderHeight () {
  const header = document.querySelector('header');
  if (header) {
    return header.offsetHeight;
  }
  return 0;
}

// 是否为''，undefined,null
export function isEmpty (string) {
  return !string && string !== 0;
}

// 为''，undefined,null，返回点位符（--）
export function emptyPlaceholder (string, placeholder = '--') {
  if (isEmpty(string)) {
    return placeholder;
  }
  return string;
}
