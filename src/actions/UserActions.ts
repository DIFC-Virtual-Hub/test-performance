import { EnvConfig } from '../../common/envConfig';
import HttpRequest from '../lib/http/HttpRequest';

export default class UserActions {
	public static readonly userEndpoints = {
		selfEndpoint: `/api/v1/users/self`,
	};

	public static getSelf(authToken: string) {
		const getSelfRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(UserActions.userEndpoints.selfEndpoint)
			.setName(EnvConfig.VH_API_URL + UserActions.userEndpoints.selfEndpoint)
			.withAuthorizationToken(authToken)
			.build();
		return getSelfRequest.get();
	}
}
