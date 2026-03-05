// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 打印收到的消息和发送者信息
  console.log("收到content script的消息：", message);
  console.log("发送者信息：", sender); // sender包含标签页、frame等信息

  // 验证消息类型（可选，用于区分不同业务的消息）
  if (message.type === "TO_BACKGROUND") {
    // 构造回复数据
    const reply = {
      status: "success",
      message: "你好，我是service worker！已收到你的消息",
      receivedData: message.data // 回显收到的数据
    };

    // 发送回复（注意：如果是异步操作，需要返回true保持端口开放）
    sendResponse(reply);
  }

  // 🌟 重要：如果 sendResponse 在异步操作中调用，必须返回 true
  // 示例（异步场景）：
  // setTimeout(() => {
  //   sendResponse({ status: "success", message: "异步回复" });
  // }, 1000);
  // return true;
});
