import { NavigationActions } from 'react-navigation';

/**
 * Go to a navigation route and reset the 'backing' stack
 * @param {Next route} targetRoute 
 */
export function resetNavigation(sender, targetRoute, props) {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: targetRoute, params: props }),
        ],
    });
    sender.props.navigation.dispatch(resetAction);
}