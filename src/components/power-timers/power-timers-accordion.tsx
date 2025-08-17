import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { UseFormReturn, FieldArrayWithId } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";
import TimerSlider from "./timer-slider";
import DaySelector from "./day-selector";

interface PowerTimersAccordionProps {
	fields: FieldArrayWithId<SavePowerTimersInput, "powerTimers", "id">[];
	form: UseFormReturn<SavePowerTimersInput>;
}

export default function PowerTimersAccordion({
	fields,
	form,
}: PowerTimersAccordionProps) {
	const formatTimeRange = (powerOffTime: string, powerOnTime: string) => {
		return `${powerOffTime} - ${powerOnTime}`;
	};

	return (
		<Accordion type="single" collapsible>
			{fields.map((field, index) => {
				const timer = form.watch(`powerTimers.${index}`);
				return (
					<AccordionItem key={field.id} value={`timer-${index}`}>
						<AccordionTrigger>
							{formatTimeRange(timer.powerOffTime, timer.powerOnTime)}
						</AccordionTrigger>
						<AccordionContent className="space-y-4">
							<TimerSlider
								powerOffTime={timer.powerOffTime}
								powerOnTime={timer.powerOnTime}
								onPowerOffTimeChange={(time) => 
									form.setValue(`powerTimers.${index}.powerOffTime`, time)
								}
								onPowerOnTimeChange={(time) => 
									form.setValue(`powerTimers.${index}.powerOnTime`, time)
								}
								powerOffTimeError={form.formState.errors.powerTimers?.[index]?.powerOffTime?.message}
								powerOnTimeError={form.formState.errors.powerTimers?.[index]?.powerOnTime?.message}
								onValidate={() => form.trigger([`powerTimers.${index}.powerOffTime`, `powerTimers.${index}.powerOnTime`])}
							/>
							
							<DaySelector
								selectedDays={timer.daysOfWeek}
								onDaysChange={(days) => 
									form.setValue(`powerTimers.${index}.daysOfWeek`, days)
								}
								error={form.formState.errors.powerTimers?.[index]?.daysOfWeek?.message}
							/>
							
							<div className="text-sm text-muted-foreground">
								Enabled: {timer.enabled ? "Yes" : "No"}
							</div>
						</AccordionContent>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
