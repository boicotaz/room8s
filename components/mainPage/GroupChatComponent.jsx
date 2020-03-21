import { v4 as uuidv4 } from 'uuid';
// import regeneratorRuntime from "regenerator-runtime";
import { groupMessagesAjax } from "../../ajax/groupMessagesAjax"
import Message from "./MessageComponent.jsx"

export default class GroupChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.usersInGroup = this.props.usersInGroup;
        this.state.currentUser = this.props.currentUser;
        this.state.groupMessages = this.props.groupMessages;
        this.state.groupDetails = this.props.groupDetails;

        document.addEventListener('newGroupMessageCreated', e => {
            socket.emit("broadcastNewGroupMessage", e.detail);
        });

        document.addEventListener('newGroupMessageReceived', e => {
            let newMsg = e.detail;
            this.setState({ groupMessages: [...this.state.groupMessages, newMsg] });

        });

        // $("#newMessageSound").load("../public/eventually.mp3");   
    }

    submitMessageEnterKey = (e) => {

        if (e.keyCode === 13) {
            console.log("enter key pressed_______--");
            if ($('#searchText').val() != "") {
                let messageText = $('#searchText').val();
                console.log($('#searchText').val());
                $('#searchText').val("");
                this.renderNewMessage(messageText);
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
        let date = new Date();
        let newMsg = {};
        newMsg.userId = this.state.currentUser.id;
        newMsg.messageText = msgText;
        newMsg.timeSent = date.toLocaleString().replace(",", "").replace(/:.. /, " ");
        this.broadcastMessage(newMsg);

        this.setState({ groupMessages: [...this.state.groupMessages, newMsg] });

        newMsg.timeSent = date.toMysqlFormat();
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
        console.log("I was mounted_________________", document.getElementById("groupChatBody"));
    }

    componentDidUpdate() {
        let groupChatBody = document.getElementById("groupChatBody");
        groupChatBody.scrollTop = groupChatBody.scrollHeight;
    }


    componentWillUnmount() {
        document.getElementById("searchText").removeEventListener("keydown", this.submitMessageEnterKey, false);
        document.removeEventListener('newGroupMessageCreated');
        document.removeEventListener('newGroupMessageReceived');
    }

    render() {
        // console.log("Group messages are__________________________________________", this.state.groupMessages);
        // console.log("Group Details are__________________________________________", this.state.groupDetails);
        // console.log("Group Users are__________________________________________", this.state.usersInGroup);

        let groupChat = <React.Fragment>
            <div className="container col-4" id="groupChat" style={{ height: '516px' }}>
                <div className="row">
                    <div className="col-12 bg-dark rounded-top rounded-right rounded-left border-bottom"  >
                        <div className="row justify-content-start">
                            <img src="/public/room8s_logo.png" className="col-2" />
                            <span className="text-warning mb-0" style={{ fontSize: "20px" }}> {this.state.groupDetails.groupName + " Chat"} </span>
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
                    <div className="col-12 p-0 bg-secondary rounded d-flex align-items-center">
                        {/* <div className="input-group offset-2"> */}
                        <input autocomplete="off" id="searchText" placeholder="Type le Message..." type="text" className="bg-light text-dark col-12 w-100 h-100">
                        </input>
                        {/* <div className="input-group-append">
                                <button onClick={this.submitMessageClickKey} className="btn btn-success" type="button">Send</button>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>

            </div>
        </React.Fragment >
        return groupChat;
    }

}


var twoDigits = (d) => {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString()
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};