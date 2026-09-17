import AuthenticatedSessionController from './AuthenticatedSessionController'
import PsgcController from './PsgcController'
import UserController from './UserController'
const Controllers = {
    AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
PsgcController: Object.assign(PsgcController, PsgcController),
UserController: Object.assign(UserController, UserController),
}

export default Controllers