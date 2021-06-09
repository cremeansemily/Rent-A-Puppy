const userMessageEl = function (message, date) {
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

const ownerMessageUserViewEl = function (message, date, id) {

  return `<div id='ownerMessage-${id} 'class="flex justify-start mb-1">

  <img src="/assets/images/profile-icons/dog1.png"
    class="object-cover h-8 w-8 rounded-full mt-4" alt="" />
  <div
    class="ml-2 py-3 px-4 bg-yellow-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-gray-500 shadow-inner">
    ${message}
  </div>
</div>
<div class="mr-l flex flex-row justify-start flex-wrap">
  <span id='sent'
    class="w-15 px-5 py-1 h-8 flex flex-wrap justify-start text-sm text-start font-medium   text-gray-400 rounded-full">Received
    ${new Date(date).toLocaleTimeString()}
  </span>
</div>`
}