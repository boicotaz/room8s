var io =  require('socket.io');
const groupService = require('./groupService')();
var sequenceNumberByClient = [];

function socketInit(server){
    let serverSocket = io(server);

    serverSocket.on('connection', function(socket){
        console.log('a user connected');
        socket.on('user_connected', function(data) {  
          sequenceNumberByClient.push([socket, data.user]);  
          
          groupService.findGroupByUserId(data.user.id).then((group) => {
            groupService.findUsersInGroup(group.getGroupId()).then((users) => {
              let usersIdInGroup;
              usersIdInGroup = users.map(user => user.id);
              console.log(usersIdInGroup);
              for(const [client, userInList] of sequenceNumberByClient) {
                if (usersIdInGroup.includes(userInList.id)) {
                  client.emit("user_in_my_group_connected", data.user.firstName);
                  console.log(data.user.firstName);
                }
              }
            });
          });
        });
      });
      return serverSocket;
} 

module.exports = socketInit;