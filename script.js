const messageContent = $('.msgs-content');
const meessageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = 'logo.png';
const fakeMessages = [
    'Hi there, I\'m Chat bot and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'That\'s awesome',
    'Github is a nice place to share code',
    'First make a repository',
    'Then add all your code in the repository',
    'After adding code go to settings',
    'In the pages section you can deploy your webpage',
    'It was a pleasure chat with you',
    'Follow the steps and you will be fine',
    'Bye',
    ':)'
  ];

  let minutes = 0;

  //initializing scrollbar and display fake message on window load
  $(window).on('load', function(){
    messageContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
  });

  //update scrollbar to bottom and add timestamp
  function updateScrollbar(){
    messageContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia:10,
        timeout:0
    })
  };

  function addTimestamp(){
    const date = new Date();
    const minutesnow = date.getMinutes();

    if(minutes !== minutesnow){
        minutes = minutesnow;
        const timestamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg:last').append(timestamp);
    }
  };

  function addMessageToPage(msg, isPersonal = false){
    const message = $('<div class="msg"></div>').text(msg);
    if(isPersonal){
        message.addClass('msg-personal');
    }else{
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    };
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
  };

//Method to insert users message and send site messages after 1 sec
function insertMessage(){
    const messageText = meessageInput.val().trim();
    if(messageText === ''){
        return false;
    };
    addMessageToPage(messageText, true);
    meessageInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20)*100);
};

// Message input and submit button  events
meessageInput.on('keydown', function(e){
    // If user press enter to send the message
    if(e.which === 13){
        insertMessage();
        return false;
    };
});

messageSubmit.on('click', insertMessage);

//method to display loading and replace with site message after 1 or 2 sec
function fakeMessage(){
    if(meessageInput.val() !== ''){
        return false;
    };

    const loadingMessage = $('<div class = "msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($('<span></span>'));
    $('.mCSB_container').append(loadingMessage);
    updateScrollbar();

    setTimeout(function(){
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 + (Math.random() * 20)*100);

}