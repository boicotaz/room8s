import Group from "./GroupComponent.jsx"

export default class MainPage extends React.Component {
    // state = {}

    constructor(props) {
        super(props);
        this.state = {}
        this.state.usersInGroup = props.usersInGroup;
        this.state.groupDetails = props.groupDetails;
        this.state.currentUser = props.currentUser;

        let usersInGroupMap = new Map();

        props.usersInGroup.forEach(user => {
            usersInGroupMap.set(user[2],`${user[0]} ${user[1]}`);
        });

        for (let key of usersInGroupMap.keys()){
            console.log(usersInGroupMap.get(key));
        } 
    }

    render() {
        return (<div className="row"> 
            <Group usersInGroup={this.state.usersInGroup} groupDetails={this.state.groupDetails} currentUser={this.state.currentUser} > </Group>
        </div>) 
    }

}