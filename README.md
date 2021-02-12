# GitHub1s_chrome_extension

Easier and faster to use Github1s

Based on conwnet/github1s, Thanks!

One second to read GitHub code with VS Code. 

https://github.com/conwnet/github1s 

----------

[![Page Views Count](https://badges.toozhao.com/badges/01EYB0JV8TJM3A7E0TK240SB29/green.svg)](https://badges.toozhao.com/stats/01EYB0JV8TJM3A7E0TK240SB29 "Get your own page views count badge on badges.toozhao.com")

# History

v0.2.1

add customization options


v0.2.2

add  'Open with new tab' option

v0.2.3

add 'Open with Right-click menu' option

v0.2.4

add 'Allow use of GitHub1s in private repositories' option

v0.2.5

add 'Switching to use Gitpod' option


# Noted

```
Why does my chrome extension ask for history permissions?

This is the standard warning for the "tabs" permission.
It allows you to query, and be notified of changes, to URLs of all tabs. This allows you to spy on the user's history in real time - even if you don't have access to the browser's own history log.

Note that "tabs" permission is not required in most cases. Providing access to URLs is basically the only reason to include it. You can use most of the tabs API without it, and can get access to current tab without warning using the "activeTab" permission.
```

manifest - Why does my chrome extension ask for history permissions? - Stack Overflow 

https://stackoverflow.com/questions/40660407/why-does-my-chrome-extension-ask-for-history-permissions 

I'm so sorry for that, i have changed the permission to activeTab.

----------


# chrome extension
https://chrome.google.com/webstore/detail/github1s/lodjfmkfbfkpdhnhkcdcoonghhghbkhe

![bQrnNlT](https://raw.githubusercontent.com/fhefh2015/GitHub1s_chrome_extension/main/2021-02-11%2012.11.26.gif)


# Tampermonkey
https://greasyfork.org/zh-CN/scripts/421412-%E4%B8%80%E9%94%AE%E5%BC%80%E5%90%AFgithub1s%E9%A1%B5%E9%9D%A2

# Bookmarklet 
```javascript
javascript: window.location.href = window.location.href.replace('github.com', 'github1s.com')
```


# Preview
![kX1istY](https://i.imgur.com/kX1istY.png)
![NXNTz7P](https://i.imgur.com/NXNTz7P.png)
![iNomSiR](https://i.imgur.com/iNomSiR.png)
![BU6atl0](https://i.imgur.com/BU6atl0.png)
