var io =  require('socket.io');
const groupService = require('./groupService')();
var sequenceNumberByClient = [];

function socketInit(server){
    let serverSocket = io(server);

    serverSocket.on('connection', function(socket){

      socket.on('get_logged_in_users', function(RequestorData) {
        console.log('request for user logged in status submitted successfully', RequestorData);
        // socket.emit('sent_logged_in_users', sequenceNumberByClient);
        let userSocket;
        let loggedInData = [];
        console.log("the sockets online up till now are:",sequenceNumberByClient );
        for(const [client, userInLoggedInList] of sequenceNumberByClient) {
          if (RequestorData.usersInGroupId.includes(userInLoggedInList.id)) {
            // client.emit('user_in_my_group_added_expense', data);
            loggedInData.push(userInLoggedInList.id);
          }
          if(RequestorData.currentUserId == userInLoggedInList.id) userSocket = client;
        }

        console.log('Users online seem to be ====',loggedInData, userSocket.id);
        userSocket.emit('sent_logged_in_users',loggedInData);
      })
        
        socket.on('user_connected', function(data) {  
          sequenceNumberByClient.push([socket, data.user]);  
          console.log('a user connected with socket id: ' , socket.id);
          groupService.findGroupByUserId(data.user.id).then((group) => {
            if(!group) return;
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

        socket.on('new-expense', function (data) {
          console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx yeaaah new expense happened: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', data);
          console.log('And users registered as online are: ' , sequenceNumberByClient);
          groupService.findGroupByUserId(1).then((group) => { 
            console.log('passed 1');
            groupService.findUsersInGroup(group.getGroupId()).then((users) => { 
              console.log('passed 2');
              let usersIdInGroup;
              usersIdInGroup = users.map(user => user.id);
              for(const [client, userInLoggedInList] of sequenceNumberByClient) {
                if (usersIdInGroup.includes(userInLoggedInList.id)) {
                  client.emit('user_in_my_group_added_expense', data);
                }
              }

            })

          })


        })

        socket.on('disconnect', () => {
          console.log('user disconnected with socket id: ' , socket.id);
          for( const [client, userInLoggedInList] of sequenceNumberByClient) {
            if(socket.id == client.id){
              let disconnectedClient = client; 
              groupService.findGroupByUserId(userInLoggedInList.id).then((group) => {
                if(!group) return;
                groupService.findUsersInGroup(group.getGroupId()).then((users) => {
                  usersIdInGroup = users.map(user => user.id);

                  for(const [clientNested, userInLoggedInListNested] of sequenceNumberByClient) {
                    
                    if (usersIdInGroup.includes(userInLoggedInListNested.id)) {
                      clientNested.emit("user_in_my_group_disconnected" , userInLoggedInList.firstName );
                    }
                  } 
                  
                  sequenceNumberByClient = sequenceNumberByClient.filter( (elem) => {
                    let thisSocket = elem[0];
                    if (thisSocket.id !=  disconnectedClient.id) 
                      return elem;
                  })

                });
              })

            }
          }

        })

        
      });
      return serverSocket;
} 

module.exports = socketInit;