import hotkeys from 'hotkeys-js';
import { fixOldVersion, getItem, getHref } from '../js/utils';


init();


// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   if (msg === 'url-update') {
//     const github1s = document.querySelector("#github1s_kkk");
//     if (!github1s) {
//       init();
//     }
//   }
// });

function insertGitHub1sButton(setting) {
  const {
    input_url,
    button_title,
    button_title_color,
    button_background_color,
    check_box,
  } = setting;

  const localURL = window.location.href;
  const href = getHref(setting, localURL, input_url);

  const target = (check_box["new_tab"] == 1) ? "_blank" : "_self";

  const btn = `
  <a class="btn ml-2 d-none d-md-block" style="background: ${button_background_color}; color: ${button_title_color};" target="${target}" href="${href}" id="github1s_kkk">${button_title}</a>
  `;
  const insertNode = document.querySelector('.btn.ml-2.d-none.d-md-block');

  if (insertNode) {
    insertNode.insertAdjacentHTML('beforeBegin', btn);
  }
}

function ensureGitHub1sButtonExists(setting) {
  if (!document.getElementById('github1s_kkk')) {
    insertGitHub1sButton(setting);
  }
}

async function init() {
  let setting = await fixOldVersion();
  const localURL = window.location.href;

  const {
    input_url,
    button_title,
    check_box,
    keyboard_shortcuts
  } = setting;

  const href = getHref(setting, localURL, input_url);

  console.log("setting: ", setting);

  const privateElems = document.querySelectorAll('#js-repo-pjax-container .Label');
  let judge_is_private = false;

  judge_is_private = Array.from(privateElems).some(item => {
    return (item.textContent.trim().toLowerCase() == "private");
  });

  console.log("judge_is_private:", judge_is_private, " is_private:", check_box["is_private"]);

  if (judge_is_private) {
    if (check_box["is_private"] == 0) {
      return;
    }
  }

  const mutationObserver = new MutationObserver(() => ensureGitHub1sButtonExists(setting));
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  if (check_box["use_keyboard"]) {
    console.log("use_keyboard");
    const key = keyboard_shortcuts.replace(/\s/ig, "").toLowerCase();
    hotkeys(key, function (event, handler) {
      console.log("hotkey: ", handler);
      // Prevent the default refresh event under WINDOWS system
      event.preventDefault();
      chrome.extension.sendRequest({
        "action": "keyboard",
        "href": href,
        "key": key,
      });
    });
  }

  if (check_box["right_menu"]) {
    console.log("right_menu");
    const right_menu_create = await getItem("right_menu_create");

    if (right_menu_create == 1) {
      return;
    } else {
      chrome.extension.sendRequest({
        "action": "createContextMenuItem",
        "href": href,
        "button_title": button_title
      });
    }
  }
}




