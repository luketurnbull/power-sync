import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";
import TimerSlider from "./timer-slider";

interface TimerSliderControllerProps {
	index: number;
	control: Control<SavePowerTimersInput>;
}

export default function TimerSliderController({ index, control }: TimerSliderControllerProps) {
	return (
		<Controller
			control={control}
			name={`powerTimers.${index}.powerOffTime`}
			render={({ field: powerOffField, fieldState: powerOffFieldState }) => (
				<Controller
					control={control}
					name={`powerTimers.${index}.powerOnTime`}
					render={({ field: powerOnField, fieldState: powerOnFieldState }) => (
						<TimerSlider
							powerOffTime={powerOffField.value}
							powerOnTime={powerOnField.value}
							onPowerOffTimeChange={powerOffField.onChange}
							onPowerOnTimeChange={powerOnField.onChange}
							powerOffTimeError={powerOffFieldState.error?.message}
							powerOnTimeError={powerOnFieldState.error?.message}
						/>
					)}
				/>
			)}
		/>
	);
}