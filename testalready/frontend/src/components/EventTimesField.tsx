import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import InputField from "./InputField";
import TimePickerField from "./TimePickerField";
import { Button } from "@/components/ui/button";
import { SaveDateFormValues } from "@/forms/schemas/SaveDateSchema";

/**
 * Props for the EventTimesField component.
 */
interface EventTimesFieldProps {
  control: Control<SaveDateFormValues>;          // React Hook Form control object
  errors: FieldErrors<SaveDateFormValues>;       // Validation errors from react-hook-form
}

/**
 * EventTimesField
 *
 * A reusable component to manage multiple event times.
 * Each event time consists of a "label" (e.g., "Ceremony", "Dinner")
 * and a "time" (formatted in 24-hour HH:mm).
 *
 * Integrates with react-hook-form using useFieldArray to dynamically
 * add or remove event times, and supports error display from Zod validation.
 *
 * Example usage:
 * <EventTimesField control={control} errors={errors} />
 */
const EventTimesField = ({ control, errors }: EventTimesFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "event_times",
  });

  return (
   <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Event Times</h3>
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() => append({ label: "", time: "" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Time
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500">
          No event times added. Click "Add Time" to create one.
        </p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative border p-4 rounded-lg bg-gray-50"
        >
          {/* Remove button positioned top right */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <InputField
              name={`event_times.${index}.label`}
              control={control}
              label="Label"
              description="E.g., Ceremony, Dinner, Reception"
              error={errors.event_times?.[index]?.label?.message}
            />

            <TimePickerField
              control={control}
              name={`event_times.${index}.time`}
              label="Time"
              description="Select a time in 24-hour format"
              error={errors.event_times?.[index]?.time}
            />
          </div>
        </div>
      ))}

      {errors.event_times?.message && (
        <p className="text-sm text-red-600">{errors.event_times.message as string}</p>
      )}
    </div>
  );
};

export default EventTimesField;