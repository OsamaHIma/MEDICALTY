'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { usePhoto } from '@/context/PhotoContext';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddNewSection = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const { uploadedPhoto } = usePhoto();

  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    section_id: '',
  });

  const { name, description, section_id } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields({
      name: '',
      description: '',
      section_id: '',
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        toast.success('Specialization department saved successfully');
        console.log({ ...formFields, image: uploadedPhoto });
        resetFormFields();
      } else {
        toast.error(
          `Failed to save specialization department: ${data.message}`
        );
        console.error(data);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error('Error:', error);
    }
  };

  const [isValid, setIsValid] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity() || !uploadedPhoto) {
      event.stopPropagation();
      setIsValid('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }

    setIsValid('validated');
    handlePostRequest();
  };
  return (
    <section>
      <Header
        headerText={`Adding new section`}
        chooseInput
        chooseInputText="Choose Employee"
        imageUploader
      />
      <div className="px-10 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className={`${isValid}`} noValidate>
          <div className="flex flex-row gap-[52px] flex-wrap justify-between">
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Name"
                icon={<FaUserAlt />}
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="flex flex-col gap-[23px] mb-5 flex-1">
              <Input
                labelText="Section id"
                name="section_id"
                value={section_id}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <Input
            labelText="Job description"
            placeHolder="Job description"
            type="textarea"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
          <div className="flex justify-between flex-wrap gap-3 !my-11">
            <Button
              content="Cancel"
              additionalClasses="w-full md:w-auto"
            />
            <div className="saveBtns flex flex-wrap gap-2">
              <Button
                content="save an create another one"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
              <Button
                content="save now"
                buttonType="filled"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewSection
    ;
