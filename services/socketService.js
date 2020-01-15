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
              let clientSockets = [];
              let userNamesThatAreLoggedIn = []; 

              for(const [client, userInLoggedInList] of sequenceNumberByClient) {

                if (usersIdInGroup.includes(userInLoggedInList.id)) {
                  clientSockets.push(client);
                  userNamesThatAreLoggedIn.push(userInLoggedInList.firstName);
                }
              }

              clientSockets.map( clientSocket => clientSocket.emit("user_in_my_group_connected", userNamesThatAreLoggedIn  ));
              
            });
          });
        });



        socket.on('disconnect', () => {
          console.log('user disconnected' , socket.id);
          let res 
          for( const [client, userInLoggedInList] of sequenceNumberByClient) {
            if(socket.id == client.id){
              console.log('Found dc!!', client.id);
              groupService.findGroupByUserId(userInLoggedInList.id).then((group) => {
                // console.log()
                groupService.findUsersInGroup(group.getGroupId()).then((users) => {
                  usersIdInGroup = users.map(user => user.id);

                  for(const [clientNested, userInLoggedInListNested] of sequenceNumberByClient) {
                    
                    if (usersIdInGroup.includes(userInLoggedInListNested.id)) {
                      clientNested.emit("user_in_my_group_disconnected" , userInLoggedInList.firstName );
                    }
                  } 

                });
              })

            }
          }

        })
      });
      return serverSocket;
} 

module.exports = socketInit;