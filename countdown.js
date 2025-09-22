 document.addEventListener('DOMContentLoaded', function() {
            // Get DOM elements
            const inputPage = document.getElementById('input-page');
            const countdownPage = document.getElementById('countdown-page');
            const startBtn = document.getElementById('start-btn');
            const newTimerBtn = document.getElementById('new-timer-btn');
            const targetDateInput = document.getElementById('target-date');
            const targetTimeInput = document.getElementById('target-time');
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            const messageEl = document.getElementById('message');
            
            // Set minimum date to today
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            targetDateInput.min = `${year}-${month}-${day}`;
            
            let countdownInterval;
            
            // Start countdown when the Start button is clicked
            startBtn.addEventListener('click', function() {
                const targetDate = targetDateInput.value;
                const targetTime = targetTimeInput.value;
                
                if (!targetDate || !targetTime) {
                    alert('Please select both date and time');
                    return;
                }
                
                // Switch to countdown page
                inputPage.classList.remove('active');
                countdownPage.classList.add('active');
                
                // Start the countdown
                startCountdown(targetDate, targetTime);
            });
            
            // Set a new timer
            newTimerBtn.addEventListener('click', function() {
                // Switch to input page
                countdownPage.classList.remove('active');
                inputPage.classList.add('active');
                
                // Clear any existing countdown
                clearInterval(countdownInterval);
                messageEl.textContent = '';
            });
            
            // Countdown function
            function startCountdown(date, time) {
                const target = new Date(`${date}T${time}`);
                
                function updateCountdown() {
                    const now = new Date();
                    const difference = target - now;
                    
                    if (difference <= 0) {
                        clearInterval(countdownInterval);
                        daysEl.textContent = '00';
                        hoursEl.textContent = '00';
                        minutesEl.textContent = '00';
                        secondsEl.textContent = '00';
                        messageEl.textContent = 'The countdown has ended!';
                        return;
                    }
                    
                    // Calculate time units
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                    
                    // Update DOM
                    daysEl.textContent = days.toString().padStart(2, '0');
                    hoursEl.textContent = hours.toString().padStart(2, '0');
                    minutesEl.textContent = minutes.toString().padStart(2, '0');
                    secondsEl.textContent = seconds.toString().padStart(2, '0');
                }
                
                // Initial update
                updateCountdown();
                
                // Update every second
                countdownInterval = setInterval(updateCountdown, 1000);
            }
        });