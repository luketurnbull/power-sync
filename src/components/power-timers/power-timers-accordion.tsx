import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useFieldArray } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";

interface PowerTimersAccordionProps {
	form: UseFormReturn<SavePowerTimersInput>;
}

export default function PowerTimersAccordion({
	form,
}: PowerTimersAccordionProps) {
	const { fields } = useFieldArray({
		control: form.control,
		name: "powerTimers",
	});

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
