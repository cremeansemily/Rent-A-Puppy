const alertContainer = document.getElementById('alert-container');
function alertUser(message) {
    // need alert message
    const msg = message

    // return message with div to dom
    alertContainer.innerHTML =
        `<div id ='alert' role="alert">
    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
    Warning
    </div>
    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>${msg}</p>
    </div>
    </div> 
    `
    const alert = document.getElementById('alert');
    const script = document.createElement('script');
    script.textContent = `
    function removeAlert(){
        const alert = document.getElementById('alert');
    
        setTimeout(function(){
            alert.remove();
        },5000)
    }
    removeAlert();
    `
    alert.appendChild(script)
}