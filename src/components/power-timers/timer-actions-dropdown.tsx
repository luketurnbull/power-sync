import { MoreVertical, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TimerActionsDropdownProps {
	onDuplicate?: () => void;
	onDelete?: () => void;
}

export default function TimerActionsDropdown({
	onDuplicate,
	onDelete,
}: TimerActionsDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
					<MoreVertical className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={onDuplicate}>
					<Copy className="mr-2 h-4 w-4" />
					Duplicate
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onDelete} variant="destructive">
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}