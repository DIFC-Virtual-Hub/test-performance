import { ConstantArrivalRateScenario } from 'k6/options';
import BaseExecutor from './BaseExecutor';

export default class ConstantExecutor extends BaseExecutor {
	public static readonly executor = 'constant-arrival-rate';
	private duration: string;
	private rate: number;
	private execFunction: string;

	constructor(scenarioName: string, duration: string, rateIterations: number, execFunction: string) {
		super(scenarioName, ConstantExecutor.executor);
		this.duration = duration;
		this.rate = rateIterations;
		this.execFunction = execFunction;
	}

	public toObject(): { [scenarioName: string]: ConstantArrivalRateScenario } {
		return {
			[this.scenarioName]: {
				executor: ConstantExecutor.executor,
				duration: this.duration,
				rate: this.rate,
				timeUnit: this.timeUnit,
				preAllocatedVUs: this.preAllocatedVUs,
				maxVUs: this.maxVUs,
				exec: this.execFunction,
			},
		};
	}
}
