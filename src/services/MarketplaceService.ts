import { EnvConfig } from '../../common/EnvConfig';
import HttpRequest from '../lib/http/HttpRequest';

export type Category = {
	id: number;
	name: string;
};
export type ServiceProvider = {
	id: string;
	name: string;
};
export default class MarketplaceService {
	public static readonly marketplaceEndpoints = {
		offers: `/api/v1/marketplace/offers`,
		data: `/api/v1/marketplace/data`,
		serviceProvidersFilter: `/api/v1/marketplace/service-providers/filters`,
		peekOffers: `/api/v1/marketplace/offers/peek`,
		offersCount: '/api/v1/marketplace/offers/count',
	};

	public static getOffers(authToken: string) {
		const getOffersRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.offers)
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.offers)
			.withAuthorizationToken(authToken)
			.build();
		return getOffersRequest.get();
	}

	public static getOffersRandomOrder(authToken: string) {
		const getRandomOffersRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.offers)
			.setParams({ order: 'random' })
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.offers)
			.withAuthorizationToken(authToken)
			.build();
		return getRandomOffersRequest.get();
	}

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

	public static getMarketplaceData(authToken: string) {
		const getMarketplaceDataRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.data)
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.data)
			.withAuthorizationToken(authToken)
			.build();
		return getMarketplaceDataRequest.get();
	}

	public static serviceProvidersFilter(authToken: string) {
		const filterServiceProvidersRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.serviceProvidersFilter)
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.serviceProvidersFilter)
			.withAuthorizationToken(authToken)
			.build();
		return filterServiceProvidersRequest.get();
	}

	public static filterOffers(
		authToken: string,
		{ categories, serviceProviders }: { categories?: Category[]; serviceProviders?: ServiceProvider[] } = {},
	) {
		const categoriesFormatted = categories?.reduce((acc, category, index) => {
			return { ...acc, [`categories[${index}]`]: category.id };
		}, {});

		const serviceProvidersFormatted = serviceProviders?.reduce(
			(acc, serviceProvider, index) => ({
				...acc,
				[`serviceProvidersIds[${index}]`]: serviceProvider.id,
			}),
			{},
		);
		const filterOffersRequest = HttpRequest.builder
			.setBaseUrl(EnvConfig.VH_API_URL)
			.setEndpoint(MarketplaceService.marketplaceEndpoints.offers)
			.setParams({ ...categoriesFormatted, ...serviceProvidersFormatted })
			.setName(EnvConfig.VH_API_URL + MarketplaceService.marketplaceEndpoints.offers)
			.withAuthorizationToken(authToken)
			.build();
		return filterOffersRequest.get();
	}
}
