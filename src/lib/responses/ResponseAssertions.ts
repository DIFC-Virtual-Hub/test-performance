import { check } from 'k6';
import { RefinedResponse, ResponseType } from 'k6/http';

export default class ResponseAssertions {
	public static asertResponseCode(
		response: RefinedResponse<ResponseType | undefined>,
		expectedCode: number | number[],
	) {
		const expectedCodes = Array.isArray(expectedCode) ? expectedCode : [expectedCode];
		return check(response, {
			['status is expected']: (res) => expectedCodes.includes(res.status),
		});
	}

	public static assertJsonValue(
		response: RefinedResponse<ResponseType | undefined>,
		selector: string,
		expectedValue: any,
	) {
		return check(response, {
			[`${selector} is expected`]: (res) => res.json(selector) === expectedValue,
		});
	}

	public static assertJsonPathExists(response: RefinedResponse<ResponseType | undefined>, selector: string) {
		return check(response, {
			[`${selector} exists`]: (res) => res.json(selector) !== undefined,
		});
	}
}
