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


document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('btn-content');

  sendBtn.addEventListener('click', async () => {
    try {
      // 1. 获取当前激活的标签页（需要tabs权限）
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      if (!activeTab.id) {
        console.warn("无法获取当前标签页ID")
        return;
      }

      // 2. 向content script发送消息
      const response = await chrome.tabs.sendMessage(activeTab.id, {
        type: 'POPUP_MESSAGE',
        data: '这是来自Popup的消息',
        timestamp: new Date().getTime()
      });

      // 3. 接收content script的响应并提示
      console.log(`Content Script响应：${response.message}`)
    } catch (error) {
      // 常见错误：当前页面没有注入content script
      console.error(`Content Script响应：${error.message}`)
    }
  });

  const sendBtn2 = document.getElementById('btn-service');

  sendBtn2.addEventListener('click', async () => {
    try {
      // 2. 向content script发送消息
      const response = await chrome.runtime.sendMessage( {
        type: 'POPUP_MESSAGE',
        data: {
          message: '你好，Service Worker！',
          time: new Date().toLocaleTimeString()
        }
      });
      // 3. 接收content script的响应并提示
      console.log("Service worker 响应", response)
    } catch (error) {
      // 常见错误：当前页面没有注入content script
      console.error("Service worker 响应失败", error)
    }
  });
});
