import { Options } from 'k6/options';
import Auth0Service from '../src/services/Auth0Service';
import { EnvConfig } from '../common/EnvConfig';
import ConstantExecutor from '../src/lib/executors/ConstantExecutor';
export { openDashboard } from '../src/scripts/dashdoard/open-dashboard';

export function setup() {
	const authToken = Auth0Service.getAuthTokenUsingAuth0Api();
	return { authToken };
}

const scenarioName = 'openDashboard';
const executor = new ConstantExecutor(scenarioName, '2m', 10, scenarioName);

export const options: Options = {
	tags: {
		testid: 'dashboard-get-' + Date.now(),
		env: EnvConfig.VH_ENV,
	},
	scenarios: executor.toObject(),
};
