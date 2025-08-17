import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { UseFormReturn, FieldArrayWithId } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";

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
		<Accordion type="single">
			{fields.map((field, index) => {
				const timer = form.watch(`powerTimers.${index}`);
				return (
					<AccordionItem key={field.id} value={`timer-${index}`}>
						<AccordionTrigger>
							{formatTimeRange(timer.powerOffTime, timer.powerOnTime)}
						</AccordionTrigger>
						<AccordionContent>
							<div className="text-sm text-muted-foreground">
								Days: {timer.daysOfWeek.join(", ")}
							</div>
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
