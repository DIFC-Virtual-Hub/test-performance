import http from 'k6/http';
import { EnvConfig } from '../../common/EnvConfig';

export type Auth0TokenMessage = {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
};

export default class Auth0Service {
	static getAuthTokenUsingAuth0Api() {
		const body = {
			grant_type: 'password',
			username: `${EnvConfig.VH_USERNAME}`,
			password: `${EnvConfig.VH_PASSWORD}`,
			audience: `${EnvConfig.AUTH0_AUDIENCE}`,
			scope: 'openid profile email offline_access',
			client_id: `${EnvConfig.AUTH0_CLIENT_ID}`,
			client_secret: `${EnvConfig.AUTH0_CLIENT_SECRET}`,
		};

		const response = http.post(`${EnvConfig.AUTH0_DOMAIN}/oauth/token`, body);
		const res = response.json();
		if (!Auth0Service.isAuth0AccessTokenResponse(res)) throw new Error('Failed to get auth token');
		const token = res.access_token;
		return token;
	}

	public static isAuth0AccessTokenResponse(response: any): response is Auth0TokenMessage {
		if (response === null || response === undefined) return false;
		return (
			typeof response === 'object' &&
			typeof response['access_token'] === 'string' &&
			typeof response['expires_in'] === 'number' &&
			typeof response['token_type'] === 'string' &&
			typeof response['scope'] === 'string'
		);
	}
}
