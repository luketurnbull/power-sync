import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";
import DaySelector from "./day-selector";

interface DaySelectorControllerProps {
	index: number;
	control: Control<SavePowerTimersInput>;
	disabled?: boolean;
}

export default function DaySelectorController({ index, control, disabled = false }: DaySelectorControllerProps) {
	return (
		<Controller
			control={control}
			name={`powerTimers.${index}.daysOfWeek`}
			render={({ field, fieldState }) => (
				<DaySelector
					selectedDays={field.value}
					onDaysChange={field.onChange}
					error={fieldState.error?.message}
					disabled={disabled}
				/>
			)}
		/>
	);
}