import React from 'react';
import {
    RouteViewWrapper,
    RouteViewHeader,
    MapHolder,
    RouteInfoContainer,
    LeftPanel,
    RightPanel,
    DownPanel,
    TabPanel,
    Header,
    TabButton,
    CommentContainer,
    AddCommentText,
    AddCommentButton,
    ScrollPanelComments,
    CommentSeparatorLine,
    ScrollPanelMedia,
    ThumbnailContainer,
    ImageThumbnail,
    LinkMedia
} from './route-view.style';

import { RouteColor as colors } from '@constants';
import { Map, LocationMenu } from './children';
import { useTranslation } from 'react-i18next';

import { RouteMapContext } from '@components/RouteMap/route-map.component';

export const RouteViewContext = React.createContext();

const initialState = { selectedPoint: null };

const RouteView = ({ route }) => {

    const points = route.points;

    const { t } = useTranslation();

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

    const [state, setState] = React.useState(initialState);

    const [selectedTab, setSelectedTab] = React.useState(0);

    const tabs = ['route.comments', 'route.multimedia'];

    const map = React.useRef();

    points.forEach((point, index) => point.color = colors[index % colors.length]);

    const comments = [
        { content: "Comentario 1", author: "Labra", idAuthor: "1" },
        { content: "Comentario 2", author: "Jesus", idAuthor: "2" },
        { content: "Comentario 3", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 4", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 5 muyyyyyyyyyyyyyyyyyy lagroooooooooooooooooooooo sklfhsnkf sdklf shfk shnfksdh fdks fhsdjkfhsdkf shkfds hfkds fhsdkfdskjfh skf shfkds hfskjf hksjd f", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" }
    ];

    const files = [
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "linkinventado.rar" },
        { link: "https://live.staticflickr.com/65535/49693057273_67d37d186b_b.jpg" },
        { link: "https://live.staticflickr.com/380/18621040808_7434daf21f_b.jpg" },
        { link: "https://live.staticflickr.com/8578/16001301710_90ea0a7660_b.jpg" },
        { link: "linkinventado.pdf" },
        { link: "https://live.staticflickr.com/65535/33684346828_7e6958e09b_b.jpg" },
        { link: "https://live.staticflickr.com/274/19983881105_e93c2d8279_b.jpg" },
        { link: "https://live.staticflickr.com/755/22922331760_97592547a8_b.jpg" },
        { link: "https://live.staticflickr.com/7285/16457569501_dbfb5046d3_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "linkinventado.js" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "linkinventado.java" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "linkinventado.zip" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
        { link: "https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BDC86F44B-A7FF-0BC2-C969-BE37F90B0611%7D%26lang%3Den%26browser%3D3%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe" }

    ];

    const validImageExtensions = "jpg jpeg png svg";

    const onPointSelect = (point, index) => {
        const newPoint = state.selectedPoint === index ? null : index;
        setState({ selectedPoint: newPoint });
        if (newPoint !== null)
            map.current.panTo(point);
    };

    const onTabSelect = index => {
        setSelectedTab(index);
    };

    return (
        <RouteViewWrapper>
            <RouteInfoContainer>
                <RouteViewContext.Provider value={{ state, setState, onPointSelect }}>
                    <LeftPanel>
                        <Map {... { route }}
                            mapRef={map}
                            data-testid="route-map"
                            googleMapURL={googleMapURL}
                            loadingElement={<MapHolder />}
                            containerElement={<MapHolder />}
                            mapElement={<MapHolder />}
                        />
                        <DownPanel>
                            <Header>
                                {tabs.map((name, i) => {
                                    return <TabButton
                                        selected={selectedTab === i}
                                        key={i}
                                        onClick={() => onTabSelect(i)}>
                                        {t(name)}
                                    </TabButton>
                                })}
                            </Header>

                            {selectedTab ?
                                <TabPanel>
                                    <ScrollPanelMedia>
                                        {files &&
                                            files.map(f => {
                                                var splitString = f.link.split(".");
                                                var fileType = splitString[splitString.length - 1];
                                                console.log(fileType);
                                                if (validImageExtensions.includes(fileType.toLowerCase())) {
                                                    return (
                                                        <ThumbnailContainer>
                                                            <ImageThumbnail src={f.link} />
                                                        </ThumbnailContainer>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <ThumbnailContainer>
                                                            <LinkMedia>.{fileType}</LinkMedia>
                                                        </ThumbnailContainer>
                                                    );
                                                }
                                            })
                                        }
                                    </ScrollPanelMedia>

                                    {!files && <p className="no-data">{t('route.no_multimedia')}</p>}
                                </TabPanel>
                                :
                                <TabPanel>
                                    <ScrollPanelComments>
                                        {comments &&
                                            comments.map(c => {
                                                return (
                                                    <p>
                                                        <p className="element">{c.content} - {c.author}</p>
                                                        <CommentSeparatorLine />
                                                    </p>
                                                );
                                            })
                                        }
                                    </ScrollPanelComments>

                                    {!comments && <p className="no-data">{t('route.no_comments')}</p>}
                                    <CommentContainer>
                                        <AddCommentText placeholder="¿Qué opinas?" />
                                        <AddCommentButton title="Elejir punto">
                                            <img src="img/icon/choosePoint.png" />
                                        </AddCommentButton>
                                        <AddCommentButton title="Comentar">
                                            <img src="img/icon/sendMessage.png" />
                                        </AddCommentButton>
                                    </CommentContainer>
                                </TabPanel>
                            }
                        </DownPanel>

                    </LeftPanel>

                    <RightPanel>
                        <RouteViewHeader>
                            <h1>{route.name}</h1>
                            <RouteMapContext.Consumer>
                                {props => (
                                    props.myRoutes && <div><button onClick={() => props.onDeleteClick(route.id)}>{t('route.delete')}</button>
                                        <button onClick={() => props.onPublishClick(route.id)}>{t('route.publish')}</button>
                                    </div>
                                )}
                            </RouteMapContext.Consumer>
                        </RouteViewHeader>

                        <LocationMenu {...{ points }} />
                    </RightPanel>
                </RouteViewContext.Provider>
            </RouteInfoContainer>
        </RouteViewWrapper >
    );
}

export default RouteView;