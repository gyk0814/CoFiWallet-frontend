import { useMutation } from '@tanstack/react-query';
import postPhoneNumber from './postPhoneNumberAPI';

const usePostPhoneNumberMutation = (
  userPhoneNumber,
  onSuccessCallback,
  onErrorCallback,
) => {
  return useMutation(() => postPhoneNumber(userPhoneNumber), {
    onSuccess: data => {
      const message = data.message;
      localStorage.setItem('userPhoneNumber', userPhoneNumber);
      if (message === 'INVALID_USER') {
        onSuccessCallback('/join');
      } else if (message === 'user is confirmed') {
        onSuccessCallback('/password');
      }
    },
    onError: error => {
      console.log(`ERROR : ${error}`);
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });
};

export default usePostPhoneNumberMutation;
