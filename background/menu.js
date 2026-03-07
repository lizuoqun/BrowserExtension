chrome.runtime.onInstalled.addListener(async (details) => {
  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: 'menu_base', title: '🔧 我的插件功能', contexts: ['all']
  });

  chrome.contextMenus.create({
    id: 'menu_print', title: '📝 打印当前页面URL', parentId: 'menu_base', contexts: ['all']
  });

  chrome.contextMenus.create({
    id: 'menu_selected', title: '🔍 搜索选中的文本：%s', contexts: ['selection']
  });


  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log('右键菜单被点击：', {info, tab});

    const {menuItemId} = info;
    const {title, url} = tab;
    if (menuItemId === 'menu_print') {
      console.log('打印当前页面URL：', url, title);
    }
  });
});
