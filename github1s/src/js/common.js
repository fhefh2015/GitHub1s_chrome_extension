export const validateMessages = {
  required: "${name} is a required field",
};

export const checkBoxItems = [
  {
    name: "new_tab",
    desc: "Open with new tab",
    note: "",
  },
  {
    name: "right_menu",
    desc: "Open with Right-click menu",
    note: "This feature requires a browser restart",
  },
  {
    name: "is_private",
    desc: "Allow use it in private repositories",
    note: "Please make sure your project is a private repository, otherwise the settings will not take effect"
  },
  {
    name: "use_keyboard",
    desc: "Allow use it with keyboard_shortcuts",
    note: "Keyboard shortcuts disabled by default"
  },
];

export const selectBoxItems = [
  {
    name: "CodeSandbox",
    url: "https://codesandbox.io/s/github/",
    index: 0,
  },
  {
    name: "Github1s",
    url: "https://github1s.com/",
    index: 1,
  },
  {
    name: "Gitpod",
    url: "https://gitpod.io/#https://github.com/",
    index: 2,
  },
  {
    name: "Repl.it",
    url: "https://repl.it/github/",
    index: 3,
  },
  {
    name: "Vscode",
    url: "vscode://vscode.git/clone?url=https://github.com/",
    index: 4,
  },
  {
    name: "Stackblitz",
    // url: "https://githubblitz.com/",
    url: "https://stackblitz.com/github/",
    index: 5,
  },
  {
    name: "GitHub.Dev",
    url: "https://github.dev/",
    index: 6,
  }
];

export const defaultSetting = {
  "input_url": "https://github1s.com",
  "button_title": "Github1s",
  "button_title_color": "#ffffff",
  "button_background_color": "#2ea44f",
  "check_box": {
    "new_tab": 1,
    "right_menu": 0,
    "is_private": 0,
    "use_keyboard": 0,
  },
  "web_service": 1,
  "keyboard_shortcuts": "alt+shift+g",
};