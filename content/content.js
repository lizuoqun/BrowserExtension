console.log('modify-plugin js注入');

// 监听body下的所有DOM变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // console.log('DOM变化：', mutation, mutation.addedNodes);
  });
});
observer.observe(document.body, {childList: true, subtree: true});

const leftTerminal = document.querySelector('#leftTerminal');
console.log('在vue框架，直接取leftTerminal:', leftTerminal);

// 目标元素选择器
const targetSelector = '#leftTerminal';

// 监听DOM变化的函数
function waitForElement(selector, callback) {
  // 先检查元素是否已存在
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }

  // 创建DOM观察者
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // 检查新增的节点中是否包含目标元素
      const addedNodes = Array.from(mutation.addedNodes);
      for (const node of addedNodes) {
        // 节点是元素，且自身/子节点包含目标元素
        if (node.nodeType === 1) {
          const target = node.matches(selector) ? node : node.querySelector(selector);
          if (target) {
            observer.disconnect(); // 找到元素后停止监听
            callback(target);
            return;
          }
        }
      }
    });
  });

  // 配置监听规则：监听body下所有子节点变化
  observer.observe(document.body, {
    childList: true, // 监听子节点添加/删除
    subtree: true,   // 监听所有后代节点
    attributes: false,
    characterData: false
  });
}

// 调用函数，等待元素出现后绑定事件
waitForElement(targetSelector, (my_site) => {
  console.log('找到目标元素：', my_site);
  my_site.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('我被点了');
  });
});
