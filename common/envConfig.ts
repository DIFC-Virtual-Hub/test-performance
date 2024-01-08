/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as dotenv from 'k6/x/dotenv';

export class EnvConfig {
	public static readonly VH_ENV: string = __ENV['VH_ENV'] || 'dev';
	private static readonly LOCAL_VH_USERNAME = __ENV['DEV_VH_USERNAME'];
	private static readonly LOCAL_VH_PASSWORD = __ENV['DEV_VH_PASSWORD'];
	private static readonly LOCAL_API_URL = 'https://api-dev.leapbydifc.com';
	private static readonly LOCAL_AUTH0_DOMAIN = 'https://difc-virtual-hub-dev.eu.auth0.com';
	private static readonly LOCAL_AUTH0_AUDIENCE = 'https://api-dev.leapbydifc.com';
	private static readonly LOCAL_AUTH0_CLIENT_ID = __ENV['DEV_AUTH0_CLIENT_ID'];
	private static readonly LOCAL_AUTH0_CLIENT_SECRET = __ENV['DEV_AUTH0_CLIENT_SECRET'];
	private static readonly DEV_VH_USERNAME = __ENV['DEV_VH_USERNAME'];
	private static readonly DEV_VH_PASSWORD = __ENV['DEV_VH_PASSWORD'];
	private static readonly DEV_API_URL = 'https://api-dev.leapbydifc.com';
	private static readonly DEV_AUTH0_DOMAIN = 'https://difc-virtual-hub-dev.eu.auth0.com';
	private static readonly DEV_AUTH0_AUDIENCE = 'https://api-dev.leapbydifc.com';
	private static readonly DEV_AUTH0_CLIENT_ID = __ENV['DEV_AUTH0_CLIENT_ID'];
	private static readonly DEV_AUTH0_CLIENT_SECRET = __ENV['DEV_AUTH0_CLIENT_SECRET'];
	private static readonly STAGING_VH_USERNAME = __ENV['STAGING_VH_USERNAME'];
	private static readonly STAGING_VH_PASSWORD = __ENV['STAGING_VH_PASSWORD'];
	private static readonly STAGING_API_URL = 'https://api-staging.leapbydifc.com';
	private static readonly STAGING_AUTH0_DOMAIN = 'https://difc-virtual-hub-staging.eu.auth0.com';
	private static readonly STAGING_AUTH0_AUDIENCE = 'https://api-staging.leapbydifc.com';
	private static readonly STAGING_AUTH0_CLIENT_ID = __ENV['STAGING_AUTH0_CLIENT_ID'];
	private static readonly STAGING_AUTH0_CLIENT_SECRET = __ENV['STAGING_AUTH0_CLIENT_SECRET'];
	private static readonly PROD_API_URL = 'https://api.leapbydifc.com';

	private static readonly ENV_PREFIX = this.VH_ENV.toUpperCase();

	public static VH_USERNAME: string = getValue(`${EnvConfig.ENV_PREFIX}_VH_USERNAME`);
	public static VH_PASSWORD: string = getValue(`${EnvConfig.ENV_PREFIX}_VH_PASSWORD`);
	public static VH_API_URL: string = getValue(`${EnvConfig.ENV_PREFIX}_API_URL`);
	public static AUTH0_DOMAIN: string = getValue(`${EnvConfig.ENV_PREFIX}_AUTH0_DOMAIN`);
	public static AUTH0_AUDIENCE: string = getValue(`${EnvConfig.ENV_PREFIX}_AUTH0_AUDIENCE`);
	public static AUTH0_CLIENT_ID: string = getValue(`${EnvConfig.ENV_PREFIX}_AUTH0_CLIENT_ID`);
	public static AUTH0_CLIENT_SECRET: string = getValue(`${EnvConfig.ENV_PREFIX}_AUTH0_CLIENT_SECRET`);
}

function getValue(name: string): string {
	const fieldIndex = Object.keys(EnvConfig).indexOf(name);
	if (fieldIndex < 0) throw new Error(`Failed to find variable ${name}`);
	return Object.values(EnvConfig)[fieldIndex];
}
