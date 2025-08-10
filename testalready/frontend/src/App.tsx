import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';

import CreateSaveDateForm from './forms/SaveDateForm';
import { SaveDateFormValues, saveDateSchema } from './forms/schemas/SaveDateSchema';
import { Button } from './components/ui/button';
import './App.css';

function App() {
  // Form configuration with zod
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SaveDateFormValues>({
    resolver: zodResolver(saveDateSchema),
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Function when submitting the form
  const onSubmit = async (data: SaveDateFormValues) => {
    setLoading(true);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/save-date/', data);
      if(response.status === 201){
        setSuccessMessage(response.data.message); // show message
        console.log('Form submitted successfully:', response.data);
        reset(); // clear form
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Here you can show an error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[70%] mx-auto">
      {successMessage && (
          <div className="my-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded">
            {successMessage}
          </div>
      )}


      <CreateSaveDateForm control={control} errors={errors} />

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={loading || !isValid}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? 'Submitting...' : 'Save Changes'}
        </Button>
      </div>
    
    </section>
  );
}

export default App;
