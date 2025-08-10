import { Controller, Control, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";

/**
 * Props for the TimePickerField component.
 */
interface TimePickerFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
  description?: string;
}

/**
 * TimePickerField
 */
const TimePickerField = ({
  control,
  name,
  label,
  error,
  disabled = false,
  className = "",
  description,
}: TimePickerFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const timeString = field.value
          ? typeof field.value === "string"
            ? field.value
            : new Date(field.value).toISOString().substring(11, 16)
          : "";

        return (
          <div className={` ${className}`}>
            {label && (
              <Label htmlFor={name} className="sr-only">
                {label}
              </Label>
            )}

            <div className="relative rounded-md shadow-sm">
              <input
                id={name}
                type="time"
                value={timeString}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={disabled}
                className={`
                  block w-full px-3 py-2 border rounded-md text-sm transition-colors
                  ${error
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }
                  ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-gray-200"}
                `}
              />
            </div>

            {error ? (
              <p className="text-xs text-red-600">{error.message}</p>
            ) : (
              description && <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default TimePickerField;
