import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as chatActionCreators from '../slice/chat'
import * as authActionCreators from '../slice/auth'
import * as profileActionCreators from '../slice/profile';
import * as settingsActionsCreators from '../slice/settings'


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({
        ...chatActionCreators,
        ...authActionCreators,
        ...profileActionCreators,
        ...settingsActionsCreators
    }, dispatch)
}