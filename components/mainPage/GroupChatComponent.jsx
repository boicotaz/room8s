import { v4 as uuidv4 } from 'uuid';
// import regeneratorRuntime from "regenerator-runtime";
import {groupMessagesAjax} from "../../ajax/groupMessagesAjax"
// import moment from "moment";

export default class GroupChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.usersInGroup = props.usersInGroup;
        this.state.currentUser = props.currentUser;
        this.state.groupMessages = props.groupMessages;
        this.state.groupDetails = props.groupDetails;
        // this.state.scrollToBottom = false;
        // console.log("I am called many times or no?");

        document.addEventListener('newGroupMessageCreated', e => {
            // console.log("NEW MSG IS_____________________________", e.detail);
            socket.emit("broadcastNewGroupMessage", e.detail);
        });

        document.addEventListener('newGroupMessageReceived', e => {
            // console.log("NEW MSG IS_____________________________", e.detail);
            // socket.emit("broadcastNewGroupMessage", e.detail);
            let newMsg = e.detail;
            this.setState({groupMessages:[...this.state.groupMessages, newMsg]});
        });


    }
    submitMessageEnterKey = (e) => {
        
        if (e.keyCode === 13) {
            console.log("enter key pressed_______--");
            if ($('#searchText').val() != "") {
                let messageText = $('#searchText').val();
                console.log($('#searchText').val());
                $('#searchText').val("");
                this.renderNewMessage(messageText);
                // this.storeNewMessage(messageText);
            }
        }

    }

    submitMessageClickKey = (e) => {
        
        if ($('#searchText').val() != "") {
            console.log("click pressed_______--");
            let messageText = $('#searchText').val();
            console.log($('#searchText').val());
            $('#searchText').val("");
            this.renderNewMessage(messageText);
        }
    }

    storeNewMessage = (newMsg) => {
        console.log("in store newMsg:", newMsg);
        newMsg.groupId = this.state.groupDetails.groupId;
        groupMessagesAjax.storeNewMessage(newMsg);
    }


    renderNewMessage = (msgText) => {
        let newMsg = {};
        let date = new Date();
        // "dd/MM/yyyy hh:mm TT"
        newMsg.userId = this.state.currentUser.id;
        newMsg.messageText = msgText;
        newMsg.timeSent = date.toLocaleString().replace(",","").replace(/:.. /," ");
        // this.state.scrollToBottom = true;
        this.broadcastMessage(newMsg);

        this.setState({ groupMessages: [...this.state.groupMessages, newMsg] });

        newMsg.timeSent =date.toMysqlFormat();
        this.storeNewMessage(newMsg);

    }


    processUsersInGroup = (usersInGroup) => {
        let [firstName, lastName, userId] = usersInGroup;
        let userNames = new Map();

        usersInGroup.forEach(userName => {
            userNames.set(userName[2], userName[0] + " " + userName[1]);
        })

        return userNames;
    }

    broadcastMessage = (newMsg) => {

        let newMsgDetails = {};
        newMsgDetails.message = newMsg;

        let groupUsers = this.processUsersInGroup(this.state.usersInGroup);
        groupUsers.delete(this.state.currentUser.id);

        let groupUsersIds = [];

        for (let key of groupUsers.keys()) {
            groupUsersIds.push(key);
        }
        newMsgDetails.groupUsersIds = groupUsersIds;

        let broadcastMessageEvent = new CustomEvent('newGroupMessageCreated', { detail: newMsgDetails });
        document.dispatchEvent(broadcastMessageEvent);

    }

    componentDidMount() {
        document.getElementById("searchText").addEventListener("keydown", this.submitMessageEnterKey, false);
        // document.getElementById("submitButton").addEventListener("onclick", this.submitMessage, false);
    }

    componentDidUpdate() {
        // if (this.state.scrollToBottom == true) {
            let groupChatBody = document.getElementById("groupChatBody");
            groupChatBody.scrollTop = groupChatBody.scrollHeight;
            // this.state.scrollToBottom = false;
        // }
    }


    componentWillUnmount() {
        document.getElementById("searchText").removeEventListener("keydown", this.submitMessageEnterKey, false);
        document.removeEventListener('newGroupMessageCreated');
        document.removeEventListener('newGroupMessageReceived');
        // document.getElementById("submitButton").removeEventListener("onclick", this.submitMessage, false);
    }

    render() {
        console.log("Group messages are__________________________________________", this.state.groupMessages);
        console.log("Group Details are__________________________________________", this.state.groupDetails);
        console.log("Group Users are__________________________________________", this.state.usersInGroup);
        // this.state.usersInGroup
        // let messages = 
        let groupChat = <React.Fragment>
            <div className="container" style={{ height: '516px' }}>
                <div className="row" style={{ height: '15%' }}>
                    <div className="col-12 bg-dark rounded">
                        <div className="row mt-3 justify-content-center">
                            <img src="/public/room8s_logo.png" className="col-1" />
                            <h1 className="text-warning"> {this.state.groupDetails.groupName + " Chat"} </h1>
                        </div>
                    </div>
                </div>

                <div className="row scrollbar scrollbar-primary" id="groupChatBody" style={{ height: '70%', overflowY: 'scroll' }}>
                    <div className="col-12 bg-light rounded">
                        {this.state.groupMessages.map(message => {
                            return <Message key={uuidv4()} message={message} currentUser={this.state.currentUser} groupDetails={this.state.groupDetails} usersInGroup={this.state.usersInGroup}></Message>
                        })}
                    </div>
                </div>

                <div className="row" style={{ height: '15%' }}>
                    <div className="col-12 bg-secondary rounded d-flex align-items-center">
                        <div className="input-group offset-2">
                            <input id="searchText" placeholder="Type le Message..." type="text" className="bg-light text-dark col-10">
                            </input>
                            <div className="input-group-append">
                                <button onClick={this.submitMessageClickKey} className="btn btn-success" type="button">Send</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment >
        return groupChat;
    }

}


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.message = props.message;
        this.state.currentUser = props.currentUser;
        this.state.groupDetails = props.groupDetails;
        this.state.usersInGroup = props.usersInGroup;
    }
    processUsersInGroup = (usersInGroup) => {
        let [firstName, lastName, userId] = usersInGroup;
        let userNames = new Map();

        usersInGroup.forEach(userName => {
            userNames.set(userName[2], userName[0] + " " + userName[1]);
        })

        return userNames;
    }

    render() {
        let message = this.state.message;
        let currentUser = this.state.currentUser;
        let renderedMessage;
        // let date = new Date(message.timeSent).toDateString();
        let date = new Date(message.timeSent).toLocaleString().replace(",","").replace(/:.. /," ");
        let userNames = this.processUsersInGroup(this.state.usersInGroup);
        let popUpText = userNames.get(message.userId) + " - " + date;

        if (message.userId == currentUser.id) {
            renderedMessage =
                (<div className="row mt-2 mb-2">
                    <p style={{ width: '60%' }} data-toggle="tooltip" data-placement="right" data-html="false"
                        title={popUpText} className="text-light bg-primary rounded p-3 offset-6">
                        {message.messageText}
                    </p>
                </div>);
        }
        else {
            renderedMessage =
                (<div className="row mt-2 mb-2">
                    <img src="/public/info.png" data-toggle="tooltip" data-placement="right" data-html="false"
                        title={popUpText} className="mr-2 ml-2" style={{ width: '4%', height: '4%' }} alt="UserImg" />
                    <p style={{ width: '60%' }} className="text-light bg-dark rounded p-3">{message.messageText}</p>
                </div>);
        }
        return (<React.Fragment> {renderedMessage} </React.Fragment>)

    }
}

var twoDigits = (d) => {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString()
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};