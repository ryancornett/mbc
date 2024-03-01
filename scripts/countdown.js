export default function() {
    function getTargetTime() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        let targetTime = new Date(now);
    
        if (dayOfWeek === 0) {
          if (hour > 10) {
            targetTime.setHours(18, 0, 0, 0);
          } else {
            targetTime.setHours(10, 0, 0, 0);
          }
        } else if (dayOfWeek >= 1 && dayOfWeek <= 3) {
          targetTime.setDate(now.getDate() + (3 - dayOfWeek));
          targetTime.setHours(18, 0, 0, 0);
        } else if ((dayOfWeek === 3 && hour >= 19) || (dayOfWeek > 3)) {
          targetTime.setDate(now.getDate() + (7 - dayOfWeek));
          targetTime.setHours(10, 0, 0, 0);
        } else if (dayOfWeek === 3 && (hour < 18 || (hour === 18 && minute < 0))) {
          targetTime.setDate(now.getDate() + (3 - dayOfWeek));
          targetTime.setHours(18, 0, 0, 0);
        }
    
        return targetTime;
      }
      
      function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        const now = new Date();
        const targetTime = getTargetTime();
        const timeDifference = targetTime - now;
    
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        const hoursFormatted = (hours < 10 ? '0' : '') + hours;
        const minutesFormatted = (minutes < 10 ? '0' : '') + minutes;
        const secondsFormatted = (seconds < 10 ? '0' : '') + seconds;
      
        countdownElement.textContent = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
      
        if (timeDifference < 0) {
          clearInterval(interval);
          countdownElement.textContent = '00:00:00';
        }
      }
      
    const interval = setInterval(updateCountdown, 1000);
}
