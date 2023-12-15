import { Options } from 'k6/options';
import Auth0Actions from '../src/services/Auth0Service';
import { EnvConfig } from '../common/EnvConfig';

export { openDashboard } from '../src/scripts/dashdoard/open-dashboard';

export function setup() {
	const authToken = Auth0Actions.getAuthTokenUsingAuth0Api();
	return { authToken };
}

export const options: Options = {
	tags: {
		testid: 'dashboard-get-' + Date.now(),
		env: EnvConfig.VH_ENV,
	},
	scenarios: {
		openDashboard: {
			executor: 'ramping-arrival-rate',
			stages: [{ target: 1, duration: '10s' }],
			timeUnit: '1s',
			preAllocatedVUs: 1,
			maxVUs: 1,
			exec: 'openDashboard',
		},
	},
};
