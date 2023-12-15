import { group } from 'k6';
import UserService from '../../services/UserService';
import ResponseAssertion from '../../lib/responses/ResponseAssertion';
import CompanyService from '../../services/CompanyService';
import ResponseExtractor from '../../lib/responses/ResponseExtractor';

export function openDashboard(data: any) {
	group('open dashboard', () => {
		let res = UserService.getSelf(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonPathExists(res, 'id');
		const companyId = ResponseExtractor.extractJson(res, 'companies.0.id');

		res = CompanyService.getRandomCompaniesDashboard(data.authToken);
		ResponseAssertion.asertResponseCode(res, 200);
		ResponseAssertion.assertJsonArrayLength(res, 6);

		if (companyId) {
			res = CompanyService.getCompany(data.authToken, companyId.toString());
			ResponseAssertion.asertResponseCode(res, 200);
			ResponseAssertion.assertJsonValue(res, 'id', companyId);
		}
	});
}
