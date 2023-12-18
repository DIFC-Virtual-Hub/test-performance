import { Scenario } from 'k6/options';

export default abstract class BaseExecutor {
	public preAllocatedVUs = 1;
	public maxVUs = 1000;

	constructor(public scenarioName: string, public executor: string, public timeUnit: '1s') {}

	public abstract toObject(): { [scenarioName: string]: Scenario };
}
`