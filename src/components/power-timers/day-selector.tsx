import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type DayOfWeek =
	| "MONDAY"
	| "TUESDAY"
	| "WEDNESDAY"
	| "THURSDAY"
	| "FRIDAY"
	| "SATURDAY"
	| "SUNDAY";

const DAYS = [
	{ short: "Mon", full: "MONDAY" as const },
	{ short: "Tue", full: "TUESDAY" as const },
	{ short: "Wed", full: "WEDNESDAY" as const },
	{ short: "Thu", full: "THURSDAY" as const },
	{ short: "Fri", full: "FRIDAY" as const },
	{ short: "Sat", full: "SATURDAY" as const },
	{ short: "Sun", full: "SUNDAY" as const },
];

interface DaySelectorProps {
	selectedDays: DayOfWeek[];
	onDaysChange: (days: DayOfWeek[]) => void;
	error?: string;
	disabled?: boolean;
}

export default function DaySelector({
	selectedDays,
	onDaysChange,
	error,
	disabled = false,
}: DaySelectorProps) {
	return (
		<ToggleGroup
			type="multiple"
			value={selectedDays}
			onValueChange={onDaysChange}
			variant="outline"
			size="lg"
			className="w-full"
			disabled={disabled}
		>
			{DAYS.map((day) => (
				<ToggleGroupItem
					key={day.full}
					value={day.full}
					aria-label={`Toggle ${day.full.toLowerCase()}`}
					aria-errormessage={error}
					className={cn(error && "border-destructive")}
				>
					{day.short}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
