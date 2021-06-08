const userMessageEl = function(message,date){
    return `
    <div class="flex justify-end mb-4">
    <div 
      class="mr-2 py-3 px-4 bg-indigo-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white shadow-inner">
    
      ${message}
    
    </div>
    <img src="/assets/images/profile-icons/dog1.png" class="object-cover h-8 w-8 rounded-full mt-4"
      alt="" />
    </div>
    <div class="mr-4 flex flex-row justify-end flex-wrap">
    <span id='sent'
      class="w-15 px-5 py-1 h-8 flex flex-wrap justify-end text-sm text-end font-medium text-gray-400 rounded-full">Sent ${new Date(date).toLocaleTimeString()}
    </span>
    </div>
    `
} 