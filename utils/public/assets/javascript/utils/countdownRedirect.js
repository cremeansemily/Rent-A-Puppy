const timeEl = document.getElementById('time');
    let time = 5;
    setInterval(function () {
        let url = '/';
        if (document.getElementById('msg')) {
            url = document.getElementById('msg').getAttribute('data-url');
        }
        let timeRemaining = time--;
        timeEl.textContent = timeRemaining;
        if (time === 0) {

            window.location.replace(url);


        }
    }, 1000);