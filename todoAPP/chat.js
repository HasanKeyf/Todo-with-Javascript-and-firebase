var chatApp = {
    user: 'huseyin',
    fireBaseUrl: 'https://hccsport.firebaseio.com/chat/.json',
    messageArray: [],
   
};

chatApp.QueryObject = function () {
    this.url = chatApp.fireBaseUrl ,
     this.verb = 'GET';
    this.success = chatApp.getMessages;
    this.error = chatApp.showErrors;
    }

chatApp.ChatMessage = function (message) {
    this.user = chatApp.user;
    this.message = message;
    this.timestamp = new Date();
}

chatApp.sendMessage = function () {
    var message = $('#messageInput');
    var newMessage = new this.ChatMessage(message.val());
    this.sendToFB(newMessage);

}
chatApp.sendToFB = function (msg) {
   var obj = {
        url : chatApp.fireBaseUrl,
        verb : 'POST',
        success : chatApp.getMessages,
        error: chatApp.showErrors,
       data:msg
    }
   chatApp.createRequest(obj);
   $('#messageInput').val('');
}

chatApp.createRequest = function (configObj) {
    
    if (!configObj) {
        alert('config object null or empty !');
        return;
    }

    else {
        var that = this;
        var request = new XMLHttpRequest();
        request.open(configObj.verb, configObj.url, true);
        //console.log(configObj);
        request.onload = function () {
            if (this.status >= "200" && this.status < "400") {
                $('#messages').html('');
                var data = JSON.parse(this.response);
                //console.log(configObj);
                configObj.success(data);

            }
            else {
                if (configObj.error && typeof(configObj.error) == 'function') {
                    configObj.error('not200', 'Something went wrong!', data.status);
                }
            }
        }
        
        request.onerror = function () {
            if (configObj.error && typeof (configObj.error) == 'function') {
                configObj.error('terrible', 'Something went wrong!', data.status);
            }
            
        }

        if (configObj.data) {
            request.send(JSON.stringify(configObj.data));
        }
        else {
            request.send();
        }
       
    }


}

chatApp.getMessages = function (data) {

    if (data) {
        // alert('got data');
    
        for (m in data) {
            var message = data[m];
            message.id = m;
            // console.log(message);
            chatApp.messageArray.push(message);
            chatApp.addMesageToPanel(message);

        }
    } else {
       // alert('no data');
        //console.log(chatApp.QueryObject);
        chatApp.createRequest(new chatApp.QueryObject());
    }
}




chatApp.gotData = function (data) {
    // console.log(data);
    $('#loading').hide();
}
chatApp.addMesageToPanel = function (msg) {
    var target = $('#messages');
    var h = '';
   
    h = '<div class="list-group-item">';
  
          h +='<h4 class="list-group-item-heading">';
    h+=msg.message +' </h4>';
    h+='<p class="list-group-item-text"><span class="badge bg-info">';
    h += $.format.date(msg.timestamp, 'dd/MM/yyyy HH:mm:ss') + '</span>';
    if (msg.user ==='huseyin') {
        h+='<span class="label label-warning">';
    } else if(msg.user.toLowerCase() ==='jim') {
        h += '<span class="label label-primary">';
    } else if (msg.user === 'Nick') {
        h += '<span class="label label-danger">';
    }
    else {
        h += '<span class="label label-success">';
    }
    h += msg.user + '</span></p></div>';
    target.prepend(h);

   
}


                      
                           
                       
                     