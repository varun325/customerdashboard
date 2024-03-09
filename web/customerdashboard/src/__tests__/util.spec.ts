import { parseDateTime } from "@/lib/utils";

describe("parseDateTime", () => {
    it("parses date and time correctly", () => {
        const dateTimeString = "2022-01-01T00:00:00.000Z";
        const { date } = parseDateTime(dateTimeString);
        expect(date).toBe("1/1/2022");
    });
});
