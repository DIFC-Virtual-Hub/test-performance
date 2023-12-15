import { group } from 'k6';
import UserService from '../../services/UserService';
import ResponseAssertions from '../../lib/responses/ResponseAssertions';
import CompanyService from '../../services/CompanyService';

export function openDashboard(data: any) {
	group('open dashboard', () => {
		let res = UserService.getSelf(data.authToken);
		ResponseAssertions.asertResponseCode(res, 200);
		ResponseAssertions.assertJsonPathExists(res, 'id');

		res = CompanyService.getRandomCompaniesDashboard(data.authToken);
		ResponseAssertions.asertResponseCode(res, 200);
		ResponseAssertions.assertJsonArrayLength(res, 6);
	});
}
