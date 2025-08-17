import { describe, it, expect } from "vitest";
import { powerTimerSchema, savePowerTimersInputSchema } from "./schema";
import type { PowerTimer } from "./schema";

describe("powerTimerSchema", () => {
	const validTimer: PowerTimer = {
		timerNumber: 1,
		enabled: true,
		powerOffTime: "22:00",
		powerOnTime: "08:00",
		daysOfWeek: ["MONDAY", "TUESDAY"],
	};

	describe("when timer is enabled", () => {
		it("should pass validation with all required fields", () => {
			const result = powerTimerSchema.safeParse(validTimer);
			expect(result.success).toBe(true);
		});

		it("should fail validation when no days are selected", () => {
			const timer = { ...validTimer, daysOfWeek: [] };
			const result = powerTimerSchema.safeParse(timer);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(issue => issue.path.includes("daysOfWeek"));
				expect(error?.message).toBe("Please select at least one day");
				expect(error?.path).toEqual(["daysOfWeek"]);
			}
		});

		it("should fail validation when power off time is empty", () => {
			const timer = { ...validTimer, powerOffTime: "" };
			const result = powerTimerSchema.safeParse(timer);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(issue => issue.path.includes("powerOffTime"));
				expect(error?.message).toBe("Power off time is required");
				expect(error?.path).toEqual(["powerOffTime"]);
			}
		});

		it("should fail validation when power on time is empty", () => {
			const timer = { ...validTimer, powerOnTime: "" };
			const result = powerTimerSchema.safeParse(timer);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(issue => issue.path.includes("powerOnTime"));
				expect(error?.message).toBe("Power on time is required");
				expect(error?.path).toEqual(["powerOnTime"]);
			}
		});

		it("should fail validation with invalid time format for power off time", () => {
			const timer = { ...validTimer, powerOffTime: "25:00" };
			const result = powerTimerSchema.safeParse(timer);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(issue => issue.path.includes("powerOffTime"));
				expect(error?.message).toBe("Power off time is required");
			}
		});

		it("should fail validation with invalid time format for power on time", () => {
			const timer = { ...validTimer, powerOnTime: "12:60" };
			const result = powerTimerSchema.safeParse(timer);
			
			expect(result.success).toBe(false);
			if (!result.success) {
				const error = result.error.issues.find(issue => issue.path.includes("powerOnTime"));
				expect(error?.message).toBe("Power on time is required");
			}
		});

		it("should pass validation with valid time formats", () => {
			const testCases = [
				{ powerOffTime: "00:00", powerOnTime: "23:59" },
				{ powerOffTime: "9:30", powerOnTime: "17:45" },
				{ powerOffTime: "12:00", powerOnTime: "13:00" },
			];

			testCases.forEach(({ powerOffTime, powerOnTime }) => {
				const timer = { ...validTimer, powerOffTime, powerOnTime };
				const result = powerTimerSchema.safeParse(timer);
				expect(result.success).toBe(true);
			});
		});
	});

	describe("when timer is disabled", () => {
		const disabledTimer = { ...validTimer, enabled: false };

		it("should pass validation even with empty times", () => {
			const timer = { 
				...disabledTimer, 
				powerOffTime: "", 
				powerOnTime: "" 
			};
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(true);
		});

		it("should pass validation even with no days selected", () => {
			const timer = { ...disabledTimer, daysOfWeek: [] };
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(true);
		});

		it("should pass validation even with invalid time formats", () => {
			const timer = { 
				...disabledTimer, 
				powerOffTime: "invalid", 
				powerOnTime: "25:99" 
			};
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(true);
		});

		it("should pass validation with all empty/invalid fields", () => {
			const timer = {
				...disabledTimer,
				powerOffTime: "",
				powerOnTime: "",
				daysOfWeek: [],
			};
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(true);
		});
	});

	describe("timer number validation", () => {
		it("should pass with positive timer number", () => {
			const timer = { ...validTimer, timerNumber: 5 };
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(true);
		});

		it("should fail with timer number less than 1", () => {
			const timer = { ...validTimer, timerNumber: 0 };
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(false);
		});
	});

	describe("days of week validation", () => {
		it("should pass with valid day names", () => {
			const validDays = ["MONDAY", "WEDNESDAY", "FRIDAY", "SUNDAY"];
			const timer = { ...validTimer, daysOfWeek: validDays };
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(true);
		});

		it("should fail with invalid day names", () => {
			const timer = { ...validTimer, daysOfWeek: ["INVALID_DAY"] as any };
			const result = powerTimerSchema.safeParse(timer);
			expect(result.success).toBe(false);
		});
	});
});

describe("savePowerTimersInputSchema", () => {
	const validTimer: PowerTimer = {
		timerNumber: 1,
		enabled: true,
		powerOffTime: "22:00",
		powerOnTime: "08:00",
		daysOfWeek: ["MONDAY"],
	};

	it("should pass validation with valid timers array", () => {
		const input = { powerTimers: [validTimer] };
		const result = savePowerTimersInputSchema.safeParse(input);
		expect(result.success).toBe(true);
	});

	it("should pass validation with empty timers array", () => {
		const input = { powerTimers: [] };
		const result = savePowerTimersInputSchema.safeParse(input);
		expect(result.success).toBe(true);
	});

	it("should pass validation with maximum 7 timers", () => {
		const timers = Array.from({ length: 7 }, (_, i) => ({
			...validTimer,
			timerNumber: i + 1,
		}));
		const input = { powerTimers: timers };
		const result = savePowerTimersInputSchema.safeParse(input);
		expect(result.success).toBe(true);
	});

	it("should fail validation with more than 7 timers", () => {
		const timers = Array.from({ length: 8 }, (_, i) => ({
			...validTimer,
			timerNumber: i + 1,
		}));
		const input = { powerTimers: timers };
		const result = savePowerTimersInputSchema.safeParse(input);
		
		expect(result.success).toBe(false);
		if (!result.success) {
			const error = result.error.issues.find(issue => issue.message.includes("Maximum"));
			expect(error?.message).toBe("Maximum 7 timers allowed");
		}
	});

	it("should fail validation when individual timer validation fails", () => {
		const invalidTimer = { 
			...validTimer, 
			powerOffTime: "", // Invalid for enabled timer
		};
		const input = { powerTimers: [invalidTimer] };
		const result = savePowerTimersInputSchema.safeParse(input);
		
		expect(result.success).toBe(false);
		if (!result.success) {
			const error = result.error.issues.find(issue => issue.path.includes("powerOffTime"));
			expect(error?.message).toBe("Power off time is required");
		}
	});

	it("should pass validation with mix of enabled and disabled timers", () => {
		const enabledTimer = validTimer;
		const disabledTimer = {
			timerNumber: 2,
			enabled: false,
			powerOffTime: "", // Should be OK when disabled
			powerOnTime: "",  // Should be OK when disabled
			daysOfWeek: [],   // Should be OK when disabled
		};
		
		const input = { powerTimers: [enabledTimer, disabledTimer] };
		const result = savePowerTimersInputSchema.safeParse(input);
		expect(result.success).toBe(true);
	});
});