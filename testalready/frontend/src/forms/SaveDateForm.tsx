import { Info } from "lucide-react";
import { Control, FieldErrors } from "react-hook-form";
import InputField from "@/components/InputField";
import { SaveDateFormValues } from "./schemas/SaveDateSchema";
import EventTimesField from "@/components/EventTimesField";

/**
 * Props for the CreateSaveDateForm component.
 */
interface CreateSaveDateFormProps {
  control: Control<SaveDateFormValues>;
  errors: FieldErrors<SaveDateFormValues>;
}

/**
 * CreateSaveDateForm
 *
 * A dynamic form to create a "Save the Date" invitation.
 * - Collects event details (title, summary, image, location).
 * - Allows selecting a single event date.
 * - Allows adding **multiple event times** with labels (e.g., "Ceremony", "Reception").
 * - Fully integrated with react-hook-form and Zod for validation.
 *
 * @param control - React Hook Form control
 * @param errors - Validation errors
 */
const CreateSaveDateForm = ({ control, errors }: CreateSaveDateFormProps) => {
  // Store and hooks

 
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Event Information</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in all the details for your event invitation.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Event Details + Image */}
        <div className="space-y-6">
          {/* Event Details */}
          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-lg border-b pb-2 w-full font-medium text-gray-900 flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-500" />
                Event Details
              </h3>
            </div>

            <div className="space-y-4">
              <InputField
                name="title"
                control={control}
                label="Event Title"
                description="Enter the main title of your event. This will be the headline on the invitation."
                error={errors.title?.message}
              />

              <InputField
                name="event_subtitle"
                control={control}
                label="Subtitle"
                description="Optional secondary title or tagline to give more context."
                error={errors.event_subtitle?.message}
              />

              <InputField
                name="event_summary"
                control={control}
                label="Description"
                description="Provide a brief summary or overview of your event to inform guests."
                error={errors.event_summary?.message}
              />
            </div>
          </div>
            <EventTimesField control={control} errors={errors} />
        </div>

        {/* RIGHT COLUMN: Date/Times + Location */}
        <div className="space-y-6">


  
          {/* Location Details */}
          <div>
            <h3 className="text-lg font-medium pb-2 border-b text-gray-900 mb-4">Location Details</h3>
            <p className="text-sm text-gray-500 mb-4">
              Provide accurate location details so your guests can find the event venue easily.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="event_venue"
                control={control}
                label="Venue Name"
                description="For example: Grand Ballroom, Central Park, etc."
                error={errors.event_venue?.message}
              />

              <InputField
                name="event_address"
                control={control}
                label="Full Address"
                description="Street address including building number and street name."
                error={errors.event_address?.message}
              />

              <InputField
                name="event_city"
                control={control}
                label="City"
                description="City where the event will be held."
                error={errors.event_city?.message}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSaveDateForm;

