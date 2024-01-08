import { EnvConfig } from '../../common/EnvConfig';
import HttpRequest from '../lib/http/HttpRequest';

export default class CompanyService {
	public static readonly companyEndpoints = {
		getCompany: (companyId: string) => `/api/v1/companies/${companyId}`,
		randomCompaniesDashboard: `/api/v1/companies/random`,
		companyEvents: '/api/v1/companies/events',
	};

	public static getRandomCompaniesDashboard(authToken: string, companiesCount = 6) {
		const getRandomCompaniesDashboardRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(CompanyService.companyEndpoints.randomCompaniesDashboard)
			.setParams({ count: companiesCount })
			.setName(EnvConfig.VH_API_URL + CompanyService.companyEndpoints.randomCompaniesDashboard)
			.withAuthorizationToken(authToken)
			.build();
		return getRandomCompaniesDashboardRequest.get();
	}

	public static getCompany(authToken: string, companyId: string) {
		const getCompanyRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(CompanyService.companyEndpoints.getCompany(companyId))
			.setName(EnvConfig.VH_API_URL + CompanyService.companyEndpoints.getCompany(companyId))
			.withAuthorizationToken(authToken)
			.build();
		return getCompanyRequest.get();
	}

	public static getCompanyEventsDashboard(authToken: string, eventsCount = 4) {
		const getCompanyEventsDashboardRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(CompanyService.companyEndpoints.companyEvents)
			.setParams({ count: eventsCount })
			.setName(EnvConfig.VH_API_URL + CompanyService.companyEndpoints.companyEvents)
			.withAuthorizationToken(authToken)
			.build();
		return getCompanyEventsDashboardRequest.get();
	}
}
