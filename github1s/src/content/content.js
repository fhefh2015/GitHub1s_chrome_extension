import hotkeys from 'hotkeys-js';
import { fixOldVersion, getHref, getItem } from '../js/utils';


init();

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

  // const insertNode = document.querySelector('.details-overlay.d-block');
  const insertNode = document.querySelector(".btn.d-none.d-md-block");

  if (insertNode) {
    const layoutClass = insertNode.classList.contains('ml-2') ? 'ml-2' : 'mr-2';
    const btn = `
    <a class="btn ${layoutClass} d-none d-md-block" style="background: ${button_background_color}; color: ${button_title_color};" target="${target}" href="${href}" id="github1s_kkk">${button_title}</a>
    `;

    // insertNode.insertAdjacentHTML('afterend', btn);
    insertNode.insertAdjacentHTML('beforebegin', btn);
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

  const privateElems = document.querySelectorAll('#js-repo-pjax-container .Label');
  let judge_is_private = false;

  judge_is_private = Array.from(privateElems).some(item => {
    return (item.textContent.trim().toLowerCase() == "private");
  });

  if (judge_is_private) {
    if (check_box["is_private"] == 0) {
      return;
    }
  }

  const mutationObserver = new MutationObserver(() => ensureGitHub1sButtonExists(setting));
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  if (check_box["use_keyboard"]) {
    const key = keyboard_shortcuts.replace(/\s/ig, "").toLowerCase();
    hotkeys(key, function (event, handler) {
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




