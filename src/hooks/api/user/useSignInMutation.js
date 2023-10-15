import { useMutation } from '@tanstack/react-query';
import signIn from './signInAPI';

const useSignInMutation = (onSuccessCallback, onErrorCallback) => {
  return useMutation(signIn, {
    onSuccess: data => {
      if (data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('userName', data.data.userName);
        localStorage.setItem('phoneNumber', data.data.phoneNumber);
        localStorage.setItem('profileImage', data.data.profileImage);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('groupId', data.data.grouping_id);
        localStorage.removeItem('userPhoneNumber');
        onSuccessCallback();
      } else {
        alert('비밀번호를 확인해주세요.');
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

export default useSignInMutation;
