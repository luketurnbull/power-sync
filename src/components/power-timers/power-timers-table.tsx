import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { PowerTimer } from "@/orpc/schema";

interface PowerTimersTableProps {
	powerTimers: PowerTimer[];
}

export default function PowerTimersTable({
	powerTimers,
}: PowerTimersTableProps) {
	return (
		<Table>
			<TableBody>
				{powerTimers.map((timer) => (
					<TableRow key={timer.timerNumber}>
						<TableCell>{timer.timerNumber}</TableCell>
						<TableCell>{timer.powerOffTime}</TableCell>
						<TableCell>{timer.powerOnTime}</TableCell>
						<TableCell>{timer.daysOfWeek.join(", ")}</TableCell>
						<TableCell>{timer.enabled ? "Yes" : "No"}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
