// 自分のユーザー情報を表す型
interface Icons {
    '150x150': string;
    '50x50': string;
}

interface Premium {
    type: string;
}

interface Existence {
    residence: {
        country: string;
        prefecture: string;
    };
    birthday: string;
    sex: string;
}

interface OwnUser {
    userId: string;
    nickname: string;
    description: string;
    language: string;
    locale: string;
    area: string;
    timezone: string;
    isExplicitlyLoginable: boolean;
    hasPremiumOrStrongerRights: boolean;
    hasSuperPremiumOrStrongerRights: boolean;
    premium: Premium;
    icons: Icons;
    existence: Existence;
}

interface Meta {
    status: number;
    errorCode?: string;
    errorMessage?: string;
}

interface OwnUserResponse {
    meta: Meta;
    data: OwnUser;
}

// 自分のユーザー情報を取得する関数
async function getOwnUser(session: string): Promise<OwnUserResponse> {
    const endpoint = 'https://public.api.nicovideo.jp/v2/user.json';

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Cookie': `user-session=${session}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch own user data: ${response.status}`);
    }

    const data: OwnUserResponse = await response.json();
    return data;
}

// 使用例
(async () => {
    try {
        const session = 'your-user-session-cookie'; // ユーザーセッションをここに入れる
        const ownUserResponse = await getOwnUser(session);
        console.log(ownUserResponse.data);
    } catch (error) {
        console.error('Error fetching own user data:', error);
    }
})();
