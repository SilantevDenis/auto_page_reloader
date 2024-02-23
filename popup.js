document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const intervalInput = document.getElementById('inputInterval');
  
    startButton.addEventListener('click', () => {
      const interval = parseInt(intervalInput.value, 10);
      if (interval > 0) {
        console.log(`Requesting to start auto-reload every ${interval} seconds.`);
        chrome.runtime.sendMessage({ action: "start", interval: interval * 1000 }, (response) => {
          console.log(response.message);
        });
      } else {
        console.log('Invalid interval. Please enter a positive number.');
        alert('Please enter a positive number.');
      }
    });
  
    stopButton.addEventListener('click', () => {
      console.log('Requesting to stop auto-reload.');
      chrome.runtime.sendMessage({ action: "stop" }, (response) => {
        console.log(response.message);
      });
    });
  });
  