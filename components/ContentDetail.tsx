import React, {EventHandler} from "react";
import ContentDetailStyle from "./styles/ContentDetailStyle";
import Drawer from '@material-ui/core/Drawer';
import Rating from "@material-ui/lab/Rating";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';

import {theme} from '../style';

const {colors, fonts} = theme;

interface Poster {
    xlarge: string;
    large: string;
    medium: string;
    small: string;
    tizen_preview: string;
    original: string;
}

interface Nation {
    name: string;
}

interface Photo {
    medium: string;
    small: string;
}

interface Person {
    id: number;
    name: string;
    photo: Photo;
}

interface Result {
    type: string;
    department: string;
    job: string;
    character?: any;
    person: Person;
}

interface Credits {
    prev_uri?: any;
    next_uri?: any;
    result: Result[];
}

interface ExternalService {
    id: string;
    name: string;
    icon: string;
    action: string;
    href: string;
    alt_href?: any;
    description: string;
    price?: any;
}

interface Photo2 {
    large: string;
    small: string;
}

interface User {
    code: string;
    name: string;
    photo: Photo2;
    watcha_play_user: boolean;
    official_user: boolean;
}

interface UserContentAction {
    rating?: number;
    status?: any;
    mehed: boolean;
    watched_at?: any;
    user_code: string;
    content_code: string;
}

interface Result2 {
    code: string;
    content_code: string;
    user_code: string;
    user: User;
    text: string;
    watched_at?: any;
    likes_count: number;
    replies_count: number;
    spoiler: boolean;
    improper: boolean;
    replyable: boolean;
    created_at: Date;
    user_content_action: UserContentAction;
}

interface Comments {
    prev_uri?: any;
    next_uri?: any;
    result: Result2[];
}

interface RatingsDistribution {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
}

interface Photo3 {
    original: string;
    large: string;
    small: string;
}

interface User2 {
    code: string;
    name: string;
    photo: Photo3;
    watcha_play_user: boolean;
    official_user: boolean;
}

interface PosterImage {
    content_type: string;
    url: string;
}

interface Result3 {
    code: string;
    title: string;
    description?: any;
    contents_count: number;
    likes_count: number;
    replies_count: number;
    created_at: Date;
    user: User2;
    poster_images: PosterImage[];
    current_context?: any;
}

interface Decks {
    prev_uri?: any;
    next_uri?: any;
    result: Result3[];
}

interface Similars {
    prev_uri?: any;
    next_uri?: any;
    result: any[];
}

interface PreviewImage {
    id: number;
    aladin_book_id: number;
    digest_code: string;
    filename: string;
    page_type_desc: string;
    view_type: string;
    order: number;
    created_at: Date;
    updated_at: Date;
}

interface ContentDetailData {
    code: string;
    content_type: string;
    title: string;
    year: number;
    poster: Poster;
    on_watchaplay: boolean;
    background_color: string;
    ratings_avg: number;
    author_names?: string[];
    director_names?: string[];
    channel_name?: string;
    stillcut?: any;
    nations: Nation[];
    genres: any[];
    current_context?: any;
    ratings_count: number;
    description: string;
    short_description?: any;
    videos: any[];
    credits: Credits;
    external_services: ExternalService[];
    comments: Comments;
    comments_count: number;
    display_comments_count: string;
    ratings_distribution: RatingsDistribution;
    gallery: any[];
    decks: Decks;
    decks_count: number;
    similars: Similars;
    ranking?: any;
    subtitle: string;
    content: string;
    publisher_description: string;
    author_description: string;
    pages: number;
    preview_images: PreviewImage[];
}


const ContentDetail = ({isOpen, closeModal, contentDetailData}: { isOpen: boolean, closeModal: EventHandler<any>, contentDetailData: ContentDetailData }) => {
    const baseStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
            width: '60%',
            margin: '0 auto',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            outline: 'none',
            padding: '20px'
        }
    };

    const renderComments = (comments) => {
        return comments.map(comment => {
            return (
                <div className={"comment"} key={comment.user.code}>
                    <div className="comment__user">
                        <div className="comment__user__photo" style={{
                            backgroundImage: `URL(${comment.user.photo.large})`,
                        }}></div>
                        <div className="comment__user__name">{comment.user.name}</div>
                    </div>
                    <div className="comment__text">
                        <p>{comment.text}</p>
                    </div>
                    <div className="comment__reaction">
                        <ThumbUpIcon/><span className="comment__reaction__like">{comment.likes_count}</span>
                        <CommentIcon/><span className="comment__reaction__reply">{comment.replies_count}</span>

                    </div>
                </div>
            )
        })
    }

    const getAuthor = (content: ContentDetailData) => {
        const {content_type} = content
        if (content_type == "books") {
            return content.author_names.join(', ')
        } else if (content_type == "movies") {
            return content.director_names.join(', ')
        } else {
            return content.channel_name
        }
    }

    return (
        <>
            <Drawer
                anchor={"right"}
                open={isOpen}
                onClose={closeModal}
            >
                <ContentDetailStyle>
                    <header>
                        <h2>{contentDetailData.title}</h2>
                        <span className="contentYear">({contentDetailData.year})</span></header>
                    <div className="contentRating">
                        <Rating name="half-rating" defaultValue={(contentDetailData.ratings_avg / 2)}
                                precision={0.1}
                                readOnly style={{color: colors.yellow}}/>
                        <span
                            className="contentRatingScore"> {(contentDetailData.ratings_avg / 2).toFixed(1)} ({contentDetailData.ratings_count} 명)</span>

                    </div>
                    <img className={"poster"} src={contentDetailData.poster.xlarge} alt={contentDetailData.title}/>
                    <h3>Description</h3>
                    <div className={"description"}>{contentDetailData.description}</div>
                    <h3>Author</h3>
                    <div className="author">{getAuthor(contentDetailData)}</div>
                    <div className={"author description"}>{contentDetailData.author_description}</div>
                    {/*<div>{contentDetailData.ratings_distribution}</div>*/}
                    <h3>Comments</h3>
                    {renderComments(contentDetailData.comments.result)}
                </ContentDetailStyle>
            </Drawer>
        </>


    )
}

export default ContentDetail;