/**
 * r:react state data
 * c:chrome store data
 */
import { checkBoxItems, defaultSetting, selectBoxItems } from './common';

export function r2c(r) {
  let items = r["check_box"];

  if (typeof items === "undefined") {
    throw Error("check_box undefined");
  }

  let temp = {};

  if (typeof items !== 'undefined') {

    for (let m = 0; m < checkBoxItems.length; m++) {
      temp[checkBoxItems[m]["name"]] = 0;
    }

    for (let n = 0; n < items.length; n++) {
      temp[items[n]] = 1;
    }
  }

  return Object.assign({}, r, {
    "check_box": temp
  });
}

export function c2r(c) {
  let items = c["check_box"];
  if (typeof items === "undefined") {
    throw Error("check_box undefined");
  }

  let temp = [];

  if (typeof items !== 'undefined') {
    for (let i in items) {
      if (items[i] == 1) {
        temp.push(i);
      }
    }
  }

  return Object.assign({}, c, {
    "check_box": temp
  });
}

export function setItemByKey(key, value) {
  let obj = {};
  obj[key] = value;
  chrome.storage.sync.set(obj);
  chrome.storage.local.set(obj);
}

export function getItem(obj) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(obj, function (result) {
      if (result) {
        resolve(result[obj]);
      }
      reject(false);
    });
  });
}

export async function fixOldVersion() {
  let form = await getItem('form');

  if (form == undefined) {
    formReset();
    return defaultSetting;
  }

  return Object.assign({}, defaultSetting, form);
}

export function formReset() {
  setItemByKey("form", defaultSetting);
  setItemByKey("right_menu_create", 0);
}

export function getQueryTab() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      if (tabs) {
        resolve(tabs);
      } else {
        reject(false);
      }
    });
  });
}

export function getHref(data, siteURL, inputURL) {

  const url = new URL(siteURL);
  const path = url.pathname.split('/').slice(1).join('/');
  // const [userName, repository] = url.pathname.split('/').slice(1, 3);

  let href;
  const {
    web_service
  } = data;

  switch (web_service) {
    case 1:
      href = `${inputURL}/${path}`;
      break;
    case 0:
    case 2:
    case 3:
    case 4:
    case 5:
      href = `${selectBoxItems[web_service]["url"]}${path}`;
      break;
  }

  return href;
}




