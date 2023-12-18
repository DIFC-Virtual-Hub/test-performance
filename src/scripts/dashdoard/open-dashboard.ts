import { group } from 'k6';
import UserService from '../../services/UserService';
import ResponseAssertion from '../../lib/responses/ResponseAssertion';
import CompanyService from '../../services/CompanyService';
import ResponseExtractor from '../../lib/responses/ResponseExtractor';
import MarketplaceService from '../../services/MarketplaceService';

export function openDashboard(data: any) {
	group('open dashboard', () => {
		let res = UserService.getSelf(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'id');
		const companyId = ResponseExtractor.extractJson(res, 'companies.0.id');

		res = CompanyService.getRandomCompaniesDashboard(data.authToken, 6);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonArrayLength(res, 6);

		res = CompanyService.getCompany(data.authToken, companyId.toString());
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonValue(res, 'id', companyId);

		res = MarketplaceService.peekPerksDashboard(data.authToken, 3);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonArrayLength(res, 3);

		res = MarketplaceService.peekRegularOffersDashboard(data.authToken, 3);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonArrayLength(res, 3);

		res = MarketplaceService.getOffersCount(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'offers');
		ResponseAssertion.assertJsonPathExists(res, 'perks');

		res = CompanyService.getCompanyEventsDashboard(data.authToken, 4);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'data');
	});
}
