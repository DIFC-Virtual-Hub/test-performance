import { EnvConfig } from '../../../common/EnvConfig';
import HttpRequest from './HttpRequest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export default class RequestBuilder {
	private baseUrl: string;
	private endpoint: string;
	private name?: string;
	private headers: any;
	private body?: Record<string, any> | string;
	private params?: Record<string, any>;

	constructor() {
		this.baseUrl = EnvConfig.VH_API_URL;
		this.endpoint = '';
	}

	public setBaseUrl(baseUrl: string) {
		this.baseUrl = baseUrl;
		return this;
	}

	public setEndpoint(endpoint: string) {
		this.endpoint = endpoint;
		return this;
	}

	public setHeaders(headers: any) {
		this.headers = { ...headers };
		return this;
	}

	public setName(name: string) {
		this.name = name;
		return this;
	}

	public setBody(body: Record<string, any> | string) {
		this.body = body;
		return this;
	}

	public setParams(params: Record<string, any>) {
		this.params = params;
		return this;
	}

	public withAuthorizationToken(token: string) {
		this.headers = {
			...this.headers,
			Authorization: `Bearer ${token}`,
		};
		return this;
	}

	public build() {
		const url = this.getUrl();
		const requestName = this.getName();
		return new HttpRequest(url, requestName, this.headers, this.body);
	}

	private getUrl() {
		const url = new URL(this.baseUrl);
		url.pathname = this.endpoint;
		if (this.params) {
			url.search = new URLSearchParams(this.params).toString();
		}
		return url;
	}

	private getName() {
		return this.name ? this.name : this.endpoint;
	}
}
