chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('popup 收到消息：', message);

  // 判断消息类型，处理不同逻辑
  if (message.type === 'TO_POPUP') {
    // 模拟处理逻辑（比如读取插件存储、调用API等）
    const replyContent = `已收到你的消息「${message.data.message}」，时间：${message.data.time}`;

    // 向Content script发送响应（同步回复）
    sendResponse({
      success: true, reply: replyContent
    });
  }
});

const storageChange = async () => {
  await chrome.storage.local.set({'name': 'modify', 'age': 18});
  const {name} = await chrome.storage.local.get('name');
  console.log('name:', name);

  // await chrome.storage.sync.clear();

  await chrome.storage.local.remove('name');

  await chrome.storage.local.remove(['name', 'age']);
};

chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log(`存储区域${areaName}发生变化：`, changes);
});

storageChange();
