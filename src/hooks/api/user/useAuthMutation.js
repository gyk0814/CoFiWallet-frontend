import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from './JoinAPI';

const useAuthMutation = onSuccessCallback => {
  const navigate = useNavigate();
  const authMutation = useMutation(authenticateUser, {
    onSuccess: data => {
      if (data.CI) {
        alert('Verification completed.');
        onSuccessCallback(data);
      } else {
        alert('Verification failed. Please enter a valid phone number');
      }
    },
    onError: error => {
      alert('Verification failed. Please enter a valid phone number');
      navigate('/login');
      console.log(`ERROR : ${error.message}`);
    },
  });

  return authMutation;
};

export default useAuthMutation;
