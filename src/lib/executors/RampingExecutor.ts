import { RampingArrivalRateScenario } from 'k6/options';
import BaseExecutor from './BaseExecutor';

export default class RampingExecutor extends BaseExecutor {
	public static readonly executor = 'ramping-arrival-rate';
	private duration: string;
	private targetIterations: number;
	private execFunction: string;

	constructor(scenarioName: string, duration: string, targetIterations: number, execFunction: string) {
		super(scenarioName, RampingExecutor.executor);
		this.duration = duration;
		this.targetIterations = targetIterations;
		this.execFunction = execFunction;
	}

	public toObject(): { [scenarioName: string]: RampingArrivalRateScenario } {
		return {
			[this.scenarioName]: {
				executor: RampingExecutor.executor,
				startRate: 1,
				stages: [{ target: this.targetIterations, duration: this.duration }],
				timeUnit: this.timeUnit,
				preAllocatedVUs: this.preAllocatedVUs,
				maxVUs: this.maxVUs,
				exec: this.execFunction,
			},
		};
	}
}
