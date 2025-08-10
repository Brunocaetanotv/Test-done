import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";

/**
 * Props for the InputField component.
 */
interface Props {
  name: string;
  control: Control<any>;
  label: string;
  /** Input type (e.g., "text", "password", "number") */
  type?: string;
  description?: string;
  error?: string;
  /** HTML autocomplete attribute (e.g., "email", "off", etc.) */
  autocomplete?: string;
}

/**
 * A reusable controlled input field component with support for password visibility toggle,
 * error messages, and optional descriptions. Designed to work with react-hook-form.
 *
 * @param {Props} props - Input field configuration
 */
const InputField = ({
  name,
  control,
  label,
  error,
  description,
  type = "text",
  autocomplete,
}: Props) => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative z-0 w-full group">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div className="flex items-center justify-between">
              <Input
                id={name}
                type={type === "password" && !showPassword ? "password" : "text"} // Toggle input type for passwords
                {...field}
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(type === "number" ? Number(e.target.value) : e.target.value)
                }
                className={`block py-2.5 px-3 pr-6 w-full text-sm bg-transparent focus:outline-none text-black peer mt-2 ${
                  error ? "border-red-500" : ""
                }`}
                placeholder={label}
                autoComplete={autocomplete}
              />

              {/* Toggle password visibility button */}
              {type === "password" && (
                <button
                  type="button"
                  className="text-gray-500 absolute right-[10px]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {/* Floating label (visually unnecessary here since placeholder is shown) */}
            <label
              htmlFor={name}
              className="pl-3 peer-focus:font-medium absolute top-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[black] peer-focus:dark:text-[#C8E870] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            ></label>
          </>
        )}
      />

      {/* Optional description below input */}
      {description && <p className="mt-2 text-xs text-gray-600">{description}</p>}

      {/* Optional error message below input */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
