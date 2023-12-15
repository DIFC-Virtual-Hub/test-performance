import { EnvConfig } from '../../common/envConfig';
import HttpRequest from '../lib/http/HttpRequest';

export default class CompanyService {
	public static readonly companyEndpoints = {
		randomCompaniesDashboard: `/api/v1/companies/random?count=6`,
	};

	public static getRandomCompaniesDashboard(authToken: string) {
		const getRandomCompaniesDashboardRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(CompanyService.companyEndpoints.randomCompaniesDashboard)
			.setName(EnvConfig.VH_API_URL + CompanyService.companyEndpoints.randomCompaniesDashboard)
			.withAuthorizationToken(authToken)
			.build();
		return getRandomCompaniesDashboardRequest.get();
	}
}
