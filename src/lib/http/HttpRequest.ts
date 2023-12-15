import http, { Params } from 'k6/http';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { group } from 'k6';
import RequestBuilder from './RequestBuilder';

enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
}

export default class HttpRequest {
	constructor(
		public readonly url: URL,
		public readonly name: string,
		public readonly headers?: any,
		public readonly body?: Record<string, any> | string,
	) {}

	public static get builder() {
		return new RequestBuilder();
	}

	public toString() {
		return `${this.name}(${JSON.stringify({
			url: this.url,
			headers: this.headers,
			body: this.body,
		})})`;
	}

	public get() {
		return this.makeRequest(HttpMethod.GET);
	}

	public post() {
		return this.makeRequest(HttpMethod.POST);
	}

	public put() {
		return this.makeRequest(HttpMethod.PUT);
	}

	public patch() {
		return this.makeRequest(HttpMethod.PATCH);
	}

	private makeRequest(method: HttpMethod) {
		const params: Params = {
			headers: this.headers,
			tags: { name: this.name },
		};

		const rs = group(this.name, () => {
			switch (method) {
				case HttpMethod.GET:
					return http.get(this.url.toString(), params);
				case HttpMethod.POST:
					return http.post(this.url.toString(), this.body, params);
				case HttpMethod.PUT:
					return http.put(this.url.toString(), this.body, params);
				case HttpMethod.PATCH:
					return http.patch(this.url.toString(), this.body, params);
				default:
					throw new Error(`Unsupported method ${method}`);
			}
		});
		console.debug(`${this.name} response: ${JSON.stringify(rs)}`);
		return rs;
	}
}
