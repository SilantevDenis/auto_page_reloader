chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and service worker registered.');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
      const intervalInMinutes = request.interval / 60000;
      chrome.alarms.create("reloadTabAlarm", { periodInMinutes: intervalInMinutes });
      console.log(`Alarm set to reload every ${intervalInMinutes} minutes.`);
      sendResponse({ message: "Reload started" });
    } else if (request.action === "stop") {
      chrome.alarms.clear("reloadTabAlarm", () => {
        console.log('Reload alarm stopped.');
        sendResponse({ message: "Reload stopped" });
      });
    }
    return true; // Для асинхронного ответа
  });
  

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reloadTabAlarm") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) { // Проверяем, есть ли активные вкладки
          chrome.tabs.reload(tabs[0].id, () => {
            console.log('Tab reloaded by alarm.');
          });
        } else {
          console.log('No active tabs to reload.');
        }
      });
    }
  });
  