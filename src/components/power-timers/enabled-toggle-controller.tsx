import { Switch } from "@/components/ui/switch";
import type { Control, UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";

interface EnabledToggleControllerProps {
	index: number;
	control: Control<SavePowerTimersInput>;
	form: UseFormReturn<SavePowerTimersInput>;
	timerNumber: number;
	className?: string;
}

export default function EnabledToggleController({ 
	index, 
	control, 
	form, 
	timerNumber,
	className 
}: EnabledToggleControllerProps) {
	return (
		<Controller
			control={control}
			name={`powerTimers.${index}.enabled`}
			render={({ field }) => (
				<div className={className}>
					<Switch
						checked={field.value}
						onCheckedChange={(value) => {
							field.onChange(value);
							// Re-validate dependent fields when enabled state changes
							form.trigger(`powerTimers.${index}.daysOfWeek`);
						}}
						aria-label={`${field.value ? "Disable" : "Enable"} timer ${timerNumber}`}
					/>
				</div>
			)}
		/>
	);
}