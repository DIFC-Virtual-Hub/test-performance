import { RefinedResponse, ResponseType } from 'k6/http';

export default class ResponseExtractor {
	public static extractJson(res: RefinedResponse<ResponseType> | undefined, selector: string) {
		if (!res) throw new Error('Response is undefined');
		return res.json(selector);
	}
}
