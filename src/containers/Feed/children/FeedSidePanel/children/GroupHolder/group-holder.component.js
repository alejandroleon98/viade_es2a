import React from 'react';

import { useTranslation } from 'react-i18next';
import { userService } from '@services';

import {
    GroupHolderHeader,
    GroupHolderWrapper,
    RouteContainer,
    GroupButtonContainer,
    GroupOptionButton
} from './group-holder.style';

import { FeedContext } from '../../../../feed.component';
import { RouteCard } from '..';

const GroupHolder = ({ friend }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = React.useState(false);
    const [routes, setRoutes] = React.useState([]);
    const [friendName, setFriendName] = React.useState("");

    const onFriendClick = async props => {
        if (!loading) {
            setLoading(true);
            const loadedRoutes = await props.onFriendSelect(friend, routes);
            setRoutes(loadedRoutes);
            setLoading(false);
        }
    };

    userService.getUserName(friend).then(name => setFriendName(name));

    return (
        <FeedContext.Consumer>
            {props => (
                !props.isDeletedFriend(friend) &&
                <GroupHolderWrapper selected={props.isSelectedFriend(friend)}>
                    <GroupHolderHeader onClick={() => onFriendClick(props)}>
                        <span className="friend-title">{friendName}</span>
                    </GroupHolderHeader>

                    {!loading && props.isSelectedFriend(friend) && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <GroupButtonContainer>
                                <GroupOptionButton onClick={() => props.deleteFriend(friend, routes)}>
                                    {t('friends.delete')}
                                </GroupOptionButton>
                                <GroupOptionButton onClick={() => window.open(friend, '_blank')}>
                                    {t('friends.profile')}
                                </GroupOptionButton>
                            </GroupButtonContainer>

                            {routes.length ?
                                <RouteContainer>
                                    {routes.map(route => <RouteCard key={route.id} {... { route }} />)}
                                </RouteContainer>
                                :
                                <span className="no-routes">{t('feed.no_routes')}</span>
                            }
                        </div>
                    )}

                    {loading && <span className="loading">{t('feed.loading')}</span>}
                </GroupHolderWrapper>
            )}
        </FeedContext.Consumer>
    );
};

export default GroupHolder;