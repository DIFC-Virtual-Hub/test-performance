import { EnvConfig } from '../../common/EnvConfig';
import HttpRequest from '../lib/http/HttpRequest';

export default class MarketplaceService {
	public static readonly marketplaceEndpoints = {
		peekOffers: `/api/v1/marketplace/offers/peek`,
		offersCount: '/api/v1/marketplace/offers/count',
	};

	public static peekPerksDashboard(authToken: string, perksCount = 3) {
		const peekPerksDashboardRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.peekOffers)
			.setParams({ count: perksCount, perksOnly: true })
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.peekOffers)
			.withAuthorizationToken(authToken)
			.build();
		return peekPerksDashboardRequest.get();
	}

	public static peekRegularOffersDashboard(authToken: string, offersCount = 3) {
		const peekRegularRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.peekOffers)
			.setParams({ count: offersCount, regularsOnly: true })
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.peekOffers)
			.withAuthorizationToken(authToken)
			.build();
		return peekRegularRequest.get();
	}

	public static getOffersCount(authToken: string) {
		const getOffersCountRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.offersCount)
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.offersCount)
			.withAuthorizationToken(authToken)
			.build();
		return getOffersCountRequest.get();
	}
}
