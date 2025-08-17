import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { UseFormReturn, FieldArrayWithId } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";

interface PowerTimersTableProps {
	fields: FieldArrayWithId<SavePowerTimersInput, "powerTimers", "id">[];
	form: UseFormReturn<SavePowerTimersInput>;
}

export default function PowerTimersTable({
	fields,
	form,
}: PowerTimersTableProps) {
	return (
		<Table>
			<TableBody>
				{fields.map((field, index) => {
					const timer = form.watch(`powerTimers.${index}`);
					return (
						<TableRow key={field.id}>
							<TableCell>{timer.timerNumber}</TableCell>
							<TableCell>{timer.powerOffTime}</TableCell>
							<TableCell>{timer.powerOnTime}</TableCell>
							<TableCell>{timer.daysOfWeek.join(", ")}</TableCell>
							<TableCell>{timer.enabled ? "Yes" : "No"}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
