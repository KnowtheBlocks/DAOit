import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWallet } from '@solana/wallet-adapter-react';

const NewProposal = () => {
  const { publicKey: walletAddress } = useWallet();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      endDate: Yup.date().required('Required'),
    }),
    onSubmit: testFormValues,
  });

  const testFormValues = async (values) => {
    try {
      if (!walletAddress) {
        throw new Error('Please connect your wallet first');
      }

      // Create proposal data object
      const proposalData = {
        proposalTitle: values.title,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        userAddress: walletAddress,
        proposalId: `proposal_${Date.now()}`, // Generate unique ID
        timestamp: new Date().toISOString()
      };

      // Send proposal directly to the server
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create proposal');
      }

      const result = await response.json();
      console.log('Proposal created successfully:', result);

      // Reset form and show success message
      formik.resetForm();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

    } catch (error) {
      console.error('Error sending test data:', error);
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // ... rest of the component code ...
};

export default NewProposal;