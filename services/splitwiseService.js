'use strict';
const OAuth = require('oauth');


const CONSUMER_KEY = 'qTCtiZU6bLXzGnWUapZxRak7WjkN3O7TgP6inD7C';
const CONSUMER_SECRET = 'V9xv6kSpUmuC90xhHQ2spmj4xSge94Ui7OlRNLb4';
const TOKEN_URL = '/oauth/token';
const AUTHORIZE_URL = '/oauth/authorize';
const MY_CALLBACK_URL = 'http://localhost:8082/splitwise_callback';
const BASE_SITE = 'https://www.splitwise.com';


var authURL;
const client = new OAuth.OAuth2(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    BASE_SITE,
    AUTHORIZE_URL,
    TOKEN_URL,
    null);

authURL = client.getAuthorizeUrl({
    redirect_uri: MY_CALLBACK_URL,
    response_type: 'code'
});


///////////////////////////////////////


const CONSUMER_KEY = 'qTCtiZU6bLXzGnWUapZxRak7WjkN3O7TgP6inD7C';
const CONSUMER_SECRET = 'V9xv6kSpUmuC90xhHQ2spmj4xSge94Ui7OlRNLb4';

const Splitwise = require('splitwise')
const sw = Splitwise({
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET
})

Splitwise({
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET
}).getAccessToken().then(console.log)

// sw.getCurrentUser().then(console.log)
// sw.getFriends().then(console.log)
sw.getGroups().then(console.log);
// sw.getExpenses({ group_id: '9810782' }).then(console.log);

// sw.getCurrentUser().then(console.log);
// sw.createFriend({ user_email: 'mplampla@mail.com', user_first_name: 'testName', user_last_name: 'boicotaz' }).then(console.log);

sw.addUserToGroup({ group_id: '9810782', user_id: '30850852', first_name: 'testName', last_name: 'boicotaz', email: 'mplampla@mail.com' }).then(console.log);