import Group from "./GroupComponent.jsx"
import GroupChat from "./GroupChatComponent.jsx"

/**
 * @typedef groupMessages
 * @type {object}
 * @property {number} groupMessages.id 
 * @property {number} groupMessages.groupId - the group that the chat belongs
 * @property {string} groupMessages.messageText 
 * @property {number} groupMessages.userId 
 * @property {date} groupMessages.timeSent
 */

export default class MainPage extends React.Component {
    // state = {}

    constructor(props) {
        super(props);
        this.state = {}
        this.state.usersInGroup = props.usersInGroup;
        this.state.groupDetails = props.groupDetails;
        this.state.currentUser = props.currentUser;
        this.state.groupMessages = props.groupMessages;

        let usersInGroupMap = new Map();

        props.usersInGroup.forEach(user => {
            usersInGroupMap.set(user[2], `${user[0]} ${user[1]}`);
        });

        for (let key of usersInGroupMap.keys()) {
            console.log(usersInGroupMap.get(key));
        }
    }

    render() {

        return (<React.Fragment>
            <div className="row mt-5">
                <Group usersInGroup={this.state.usersInGroup} groupDetails={this.state.groupDetails} currentUser={this.state.currentUser} > </Group>
                <GroupChat usersInGroup={this.state.usersInGroup} currentUser={this.state.currentUser} groupMessages={this.state.groupMessages} groupDetails={this.state.groupDetails} ></GroupChat>
            </div>
        </React.Fragment>)
    }

}