/**
 * 创建 El-Message 样式的提示
 * @param {string} text - 提示内容
 * @param {string} type - 类型：success, warning, error, info (默认 info)
 * @param {number} duration - 持续时间 (毫秒)，默认 3000
 */
function createMessage(text, type = 'info', duration = 3000) {
  // 1. 创建主容器 div
  const msgBox = document.createElement('div');
  msgBox.className = 'el-message';

  // 2. 定义不同状态的样式配置 (颜色、图标背景等)
  const typeConfig = {
    success: { color: '#67C23A', bg: '#f0f9eb', icon: '✔' },
    warning: { color: '#E6A23C', bg: '#fdf6ec', icon: '⚠' },
    error:   { color: '#F56C6C', bg: '#fef0f0', icon: '✖' },
    info:    { color: '#909399', bg: '#edf2fc', icon: 'ℹ' }
  };

  const config = typeConfig[type] || typeConfig['info'];

  // 3. 设置核心 CSS 样式 (完全用 JS 注入)
  Object.assign(msgBox.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)', // 水平居中
    zIndex: '9999',
    padding: '12px 20px',
    borderRadius: '4px',
    border: '1px solid #ebeef5',
    backgroundColor: '#fff',
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#606266',
    opacity: '0', // 初始透明，用于动画
    transition: 'opacity 0.3s, transform 0.3s, top 0.3s',
    whiteSpace: 'nowrap'
  });

  // 4. 创建内部内容 (图标 + 文字)
  // 图标部分
  const iconSpan = document.createElement('span');
  iconSpan.textContent = config.icon;
  iconSpan.style.color = config.color;
  iconSpan.style.fontSize = '16px';
  iconSpan.style.fontWeight = 'bold';

  // 文字部分
  const textSpan = document.createElement('span');
  textSpan.textContent = text;

  // 组装
  msgBox.appendChild(iconSpan);
  msgBox.appendChild(textSpan);

  // 5. 添加到页面
  document.body.appendChild(msgBox);

  // 6. 触发进入动画 (稍微延迟一下让浏览器渲染初始状态)
  requestAnimationFrame(() => {
    msgBox.style.opacity = '1';
    msgBox.style.transform = 'translateX(-50%) translateY(0)';
  });

  // 7. 设置定时器进行销毁
  const timer = setTimeout(() => {
    // 开始退出动画
    msgBox.style.opacity = '0';
    msgBox.style.transform = 'translateX(-50%) translateY(-20px)'; // 向上飘一点消失

    // 等待 CSS 过渡结束后真正移除 DOM
    msgBox.addEventListener('transitionend', () => {
      if (document.body.contains(msgBox)) {
        document.body.removeChild(msgBox);
      }
    }, { once: true }); // 确保事件只触发一次

  }, duration);

  // 可选：如果用户手动点击关闭，可以清除定时器（这里简化未做关闭按钮）
  return { close: () => clearTimeout(timer) };
}
