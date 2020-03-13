
export default class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.usersInGroup = props.usersInGroup;

        this.state.groupDetails = props.groupDetails;
        let usersInGroupId = props.usersInGroup.map(elem => elem[2]);
        console.log("The log status event is: ", getUserLoggedStatusEvent);
        document.addEventListener('LoggedOffStatus', e => {
            console.log("In group component the logged of userId is_____________________ ", e.detail);
            let loggedOffUserId = e.detail;
            if (this.state.loggedInMembersId){
                if(this.state.loggedInMembersId.includes(loggedOffUserId)){
                    let loggedInMembersId = [];
                    
                    loggedInMembersId = this.state.loggedInMembersId.filter(userId=> {
                        if (userId != loggedOffUserId){
                            return userId;
                        }
                    });
                    
                    this.setState({ loggedInMembersId: loggedInMembersId })
                }
            }
        })

        if (getUserLoggedStatusEvent == undefined) {
            var getUserLoggedStatusEvent = new CustomEvent('LoggedInStatus', { detail: { currentUserId: props.currentUser.id, usersInGroupId: usersInGroupId } });

            document.addEventListener('LoggedInStatusReply', e => {
                console.log("i am in GROUP Compenent the user's ID online are", e.detail);
                this.setState({ loggedInMembersId: e.detail })
            });
        }
        document.dispatchEvent(getUserLoggedStatusEvent);

    }

    render() {
        console.log("I should be rerendered since a new user in group connected...");
        return (
            <div id="group-dashboard" className="jumbotron col-3 ml-5 mt-3">
                <h1 className="display-6"> <i className="fa fa-home"> </i> {this.state.groupDetails.groupName} </h1>
                <hr className="my-4" />
                <p className="lead"> Users in group </p>
                <div id='usersInGroup' className="lead">
                    {console.log("userInGroup var is_______________________________", this.state.usersInGroup)}
                    {this.state.usersInGroup.map(user => {
                        return <GroupMember user={user} key={user[1]} groupMemberId={user[1]} loggedInMembersId={this.state.loggedInMembersId} />
                    })}
                </div>
                <button id='add-user' type="button" data-toggle="modal" data-target="#addUserForm"
                    className="btn btn-secondary mt-5"> Add users in
                    group </button>
            </div>)
    }
}

class GroupMember extends React.Component {
    render() {
        let [userFirstName, userLastName, userId] = this.props.user;
        let loggedInStatus;
        if (this.props.loggedInMembersId === undefined) {
            loggedInStatus = "btn-danger";
        }
        else {
            if (this.props.loggedInMembersId.includes(userId)) {
                loggedInStatus = "btn-success";
            }
            else {
                loggedInStatus = "btn-danger";
            }
        }
        // btn-danger
        return (<a className={"btn btn-lg mr-1 mb-2 " + loggedInStatus} href="#" role="button">{this.props.user[0]}</a>);
    }
}