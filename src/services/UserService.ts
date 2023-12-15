import { EnvConfig } from '../../common/EnvConfig';
import HttpRequest from '../lib/http/HttpRequest';

export default class UserService {
	public static readonly userEndpoints = {
		selfEndpoint: `/api/v1/users/self`,
	};

	public static getSelf(authToken: string) {
		const getSelfRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(UserService.userEndpoints.selfEndpoint)
			.setName(EnvConfig.VH_API_URL + UserService.userEndpoints.selfEndpoint)
			.withAuthorizationToken(authToken)
			.build();
		return getSelfRequest.get();
	}
}
