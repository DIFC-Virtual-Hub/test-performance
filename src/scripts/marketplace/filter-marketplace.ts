import { group } from 'k6';
import ResponseAssertion from '../../lib/responses/ResponseAssertion';
import MarketplaceService from '../../services/MarketplaceService';
import { getRandomValuesFromArray } from '../../lib/utils/helpers';

export function filterMarketplace(data) {
	group('filter marketplace', () => {
		const serviceProviders = getRandomValuesFromArray(data.serviceProviders, 3);
		const categories = getRandomValuesFromArray(data.categories, 3);
		const res = MarketplaceService.filterOffers(data.authToken, { categories, serviceProviders });
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'data');
	});
}
