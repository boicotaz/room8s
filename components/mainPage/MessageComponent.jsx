export default class Message extends React.Component {
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
        // let date = new Date(message.timeSent).toLocaleString().replace(",","").replace(/:.. /," ");
        let date = formatDate(new Date(message.timeSent));

        let userNames = this.processUsersInGroup(this.state.usersInGroup);
        let popUpText = userNames.get(message.userId) + " - " + date;

        if (message.userId == currentUser.id) {
            renderedMessage =

                (<React.Fragment>
                    <p style={{ overflow: "auto", wordWrap: "break-word" }} data-toggle="tooltip" data-placement="right" data-html="false"
                        title={popUpText} className="text-light bg-primary rounded p-3 offset-6">
                        {message.messageText}
                    </p> </React.Fragment >);
        }
        else {
            renderedMessage =
                (<div className="row mt-2 mb-2">
                    <img src="/public/info.png" data-toggle="tooltip" data-placement="right" data-html="false"
                        title={popUpText} className="mr-2 ml-2" style={{ width: '4%', height: '4%' }} alt="UserImg" />
                    <p style={{ width: '40%', overflow: "auto", wordWrap: "break-word" }} className="text-light bg-dark rounded p-3">{message.messageText}</p>
                </div>);
        }
        return (<React.Fragment> {renderedMessage} </React.Fragment>)

    }
}


/**
 * 
 * @param {Date} date 
 * @return {string} - the formatted date E.g. "6 March 2020 - 14:58"
 */
function formatDate(date) {

    let month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    let hourSent = date.getHours();
    let minuteSent = date.getMinutes();

    if (hourSent < 10) {
        hourSent = '0' + hourSent;
    }

    if (minuteSent < 10) {
        minuteSent = '0' + minuteSent;
    }

    let customDateHoursMins = " - " + hourSent + ":" + minuteSent;

    let customDate = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear() + customDateHoursMins;

    return customDate

}