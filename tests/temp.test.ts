import { Options } from 'k6/options';
import Auth0Actions from '../src/actions/Auth0Actions';
import UserActions from '../src/actions/UserActions';
import ResponseAssertions from '../src/lib/responses/ResponseAssertions';

export const options: Options = {
	vus: 1,
	duration: '10s',
};

export function setup() {
	const authToken = Auth0Actions.getAuthTokenUsingAuth0Api();
	return { authToken };
}

export default (data) => {
	const res = UserActions.getSelf(data.authToken);
	ResponseAssertions.asertResponseCode(res, 200);
	ResponseAssertions.assertJsonPathExists(res, 'id');
};
