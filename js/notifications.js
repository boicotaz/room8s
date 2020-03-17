
import Notifications from "../components/navbar/NotificationsComponent.jsx"

var renderNotifications = () => {
    ReactDOM.render(
        <Notifications>  </Notifications>, document.getElementById('notifications')
    );
}

renderNotifications();

