import { getQueryTab, getItem, getHref, setItemByKey } from './utils';

// chrome.browserAction.onClicked.addListener(async () => {

//   const tabs = await getQueryTab();
//   const form = await getItem("form");
//   const url = tabs[0]["url"];

//   const href = await getHref(form, url);
//   createTab(href);
// });

chrome.extension.onRequest.addListener((request) => {

  const { href, action } = request;

  console.log("chrome runtime: ", request);

  if (action == 'createContextMenuItem') {

    const { button_title, href } = request;

    setItemByKey("right_menu_create", 1);

    chrome.contextMenus.create({
      title: `Open with ${button_title}`,
      type: 'normal',
      contexts: ['page'],
      onclick: function (data) {

        const pageUrl = data['pageUrl'];
        createTab(href);

      },
      documentUrlPatterns: ['https://*.github.com/*/*']
    });
  }

  if (action == 'keyboard') {
    createTab(href);
  }
});

async function createTab(href) {

  const tabs = await getQueryTab();

  if (tabs) {
    const index = tabs[0]['index'];
    chrome.tabs.create({
      index: index + 1,
      url: href
    });
  } else {
    chrome.tabs.create({
      url: href
    });
  }
}