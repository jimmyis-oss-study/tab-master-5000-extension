import React from 'react';
import Loadable from 'react-loadable';

export const includes = function (arr, val, index) {
  for (let i = 0 | index; i < arr.length; i++) {
    if (arr[i] === val) {
      return true;
    }
  }
  return false;
}

export const merge = function() {
  let [result, ...extenders] = Array.from(arguments);
  for (let i = 0, len = extenders.length; i < len; i++) {
    let keys = Object.keys(extenders[i]);
    for (let z = 0, len = keys.length; z < len; z++) {
      result[keys[z]] = extenders[i][keys[z]]
    }
  }
  return result;
}

export const whichToShow = function({outerHeight, itemHeight, scrollTop, columns}) {
  let start = Math.floor(scrollTop / itemHeight);
  let heightOffset = scrollTop % itemHeight;
  let length = Math.ceil((outerHeight + heightOffset) / itemHeight) * columns;

  return {
    start: start,
    length: length,
  }
}

export const unref = function(object) {
  setTimeout(() => {
    let keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      object[keys[i]] = null;
    }
  }, 0);
};

export const isNewTab = function(url) {
  return (url && (url.indexOf('chrome://newtab/') > -1
    || url.substr(-11) === 'newtab.html'
    || url.substr(-11) === 'ewtab.html#'))
}

const Loading = function(props) {
  if (props.error) {
    return <div>Error! <button className="ntg-btn" onClick={props.retry}>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button className="ntg-btn" onClick={props.retry}>Retry</button></div>;
  } else {
    return null;
  }
};

export const AsyncComponent = function(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10000,
  }, opts));
};