import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TimerErrorAlertProps {
	errorMessages: string[];
}

export default function TimerErrorAlert({
	errorMessages,
}: TimerErrorAlertProps) {
	if (errorMessages.length === 0) {
		return null;
	}

	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Please fix the following errors:</AlertTitle>
			<AlertDescription>
				<ul className="list-disc list-inside space-y-1 mt-2 font-light">
					{errorMessages.map((error) => (
						<li key={error}>{error}</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	);
}
