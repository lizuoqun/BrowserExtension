chrome.runtime.onInstalled.addListener(async () => {
  await chrome.alarms.clearAll();

  await chrome.alarms.create('myAlarm1', {
    delayInMinutes: 5 / 60 //单位为分钟，5秒后执行
  });

  await chrome.alarms.create('myAlarm2', {
    when: Date.now() + 5000 // 指定时间戳，5秒后执行
  });

  await chrome.alarms.create('myAlarm3', {
    periodInMinutes: 1 // 每1分钟执行一次
  });

  const allAlarms = await chrome.alarms.getAll();
  console.log('所有定时任务：', allAlarms);

  const alarm1 = await chrome.alarms.get('myAlarm1');
  console.log('定时任务1：', alarm1);
});


chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log('定时任务执行：', alarm);
});
