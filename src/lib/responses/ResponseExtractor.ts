import { RefinedResponse, ResponseType } from 'k6/http';

export default class ResponseExtractor {
	public static extractJson(res: RefinedResponse<ResponseType> | undefined, selector: string) {
		if (!res) throw new Error('Response is undefined');
		const extracted = res.json(selector);
		if (extracted === null) throw new Error(`Selector ${selector} not found in response ${res.url}`);
		return extracted;
	}
}
