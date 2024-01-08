import { Options } from 'k6/options';
import Auth0Service from '../src/services/Auth0Service';
import MarketplaceService, { Category, ServiceProvider } from '../src/services/MarketplaceService';
import { EnvConfig } from '../common/EnvConfig';
import ConstantExecutor from '../src/lib/executors/ConstantExecutor';
import ResponseExtractor from '../src/lib/responses/ResponseExtractor';
export { filterMarketplace } from '../src/scripts/marketplace/filter-marketplace';

export function setup() {
	const authToken = Auth0Service.getAuthTokenUsingAuth0Api();
	let res = MarketplaceService.serviceProvidersFilter(authToken);
	const serviceProviders = JSON.parse(res.body as string) as ServiceProvider[];

	res = MarketplaceService.getMarketplaceData(authToken);
	const categories = ResponseExtractor.extractJson(res, 'categories') as Category[];

	return { authToken, serviceProviders, categories };
}

const scenarioName = 'filterMarketplace';
const executor = new ConstantExecutor(scenarioName, '2m', 10, scenarioName);

export const options: Options = {
	tags: {
		testid: 'marketplace-get-' + Date.now(),
		env: EnvConfig.VH_ENV,
	},
	scenarios: executor.toObject(),
};
