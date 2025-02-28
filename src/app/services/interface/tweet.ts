export interface Tweet {
    id: string;
    uid: string;
    body: string;
    createdAt: string;
    likes: number;
    retweets: number;
    comments: number;
    imageUrl?: string;
    hashtags?: string[];
    mentions?: string[];
    user?: UserData;
}

export interface UserData {
    displayName: string;
    username: string;
}
