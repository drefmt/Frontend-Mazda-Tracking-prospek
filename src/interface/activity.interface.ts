

export interface Activity {
    date: string;
    activityType: string;
    description: string;
    isDone: boolean;
    location: string;
    notes: string;    
    id: string;
}

// export interface GetActivity extends Activity {
//     id: string;
// }