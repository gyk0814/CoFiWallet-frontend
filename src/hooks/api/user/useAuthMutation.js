import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from './JoinAPI';

const useAuthMutation = onSuccessCallback => {
  const authMutation = useMutation(authenticateUser, {
    onSuccess: data => {
      if (data.CI) {
        alert('본인인증에 성공했습니다.');
        onSuccessCallback(data);
      } else {
        alert('본인인증에 실패했습니다.');
      }
    },
    onError: error => {
      console.log(`ERROR : ${error.message}`);
    },
  });

  return authMutation;
};

export default useAuthMutation;
