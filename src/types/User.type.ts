export interface User  {
    id: string;
    name: string;
    surname: string;
    avatar?: string;
}
export interface UserWithFollowersCount extends User {
    followersCount: number;
  }  

export interface UserProfile {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatar?: string;
    username: string;
    address: string;
    gender: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    images?: string[];
    user: User;
  }