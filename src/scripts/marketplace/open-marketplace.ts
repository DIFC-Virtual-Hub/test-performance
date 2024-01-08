import { group } from 'k6';
import UserService from '../../services/UserService';
import ResponseAssertion from '../../lib/responses/ResponseAssertion';
import MarketplaceService from '../../services/MarketplaceService';

export function openMarketplace(data: any) {
	group('open marketplace', () => {
		let res = UserService.getSelf(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'id');

		res = MarketplaceService.getOffersRandomOrder(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'data');

		res = MarketplaceService.getOffers(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'data');

		res = MarketplaceService.getMarketplaceData(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'categories');

		res = MarketplaceService.serviceProvidersFilter(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
	});
}
