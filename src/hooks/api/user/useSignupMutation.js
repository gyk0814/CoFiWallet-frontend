import { useMutation } from '@tanstack/react-query';
import { signupUser } from './JoinAPI';

const useSignupMutation = (onSuccessCallback, onErrorCallback) => {
  const signupMutation = useMutation(signupUser, {
    onSuccess: data => {
      const message = data.data.message;
      if (message === 'user is created') {
        localStorage.removeItem('userPhoneNumber');
        alert('회원가입이 완료되었습니다.');
        onSuccessCallback();
      } else {
        alert(`회원가입에 실패했습니다. (에러 : ${message})`);
      }
    },
    onError: error => {
      console.log(`ERROR : ${error}`);
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });

  return signupMutation;
};

export default useSignupMutation;
