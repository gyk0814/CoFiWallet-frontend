import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineUser } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { config } from '../../../utils/constant';
import { useGetProfileImage } from '../../../hooks/api/useGetProfileImage';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import './ChangeProfileImage.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;

const ChangeProfileImage = () => {
  const [file, setFile] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState(
    localStorage.getItem('profileImage') || '',
  );

  const onChangeImageInput = async e => {
    e.preventDefault();
    const { files } = e.target;
    const formData = new FormData();

    if (files) {
      formData.append('profileImage', files[0]);
      setFile(files[0]);
      setProfileImageUrl(URL.createObjectURL(files[0]));
    }
  };

  const onSubmitChange = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const headers = {
      ...config.headers,
      Authorization: localStorage.getItem('accessToken'),
    };

    try {
      const response = await axios.post(
        `${baseUrl}/user/profileimage`,
        formData,
        { headers },
      );
      const imageUrl = response.data.profileImage;
      setProfileImageUrl(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
      alert('프로필이 변경되었습니다.');
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };

  return (
    <>
      <div className="avatar">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="프로필" className="profileImage" />
        ) : (
          <AiOutlineUser className="profileImage" />
        )}

        <span className="editBox">
          <MdModeEditOutline size={30} className="editBtn" />
          <p>변경</p>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="fileUp"
            onChange={onChangeImageInput}
          />
        </span>
      </div>

      <DefaultButton text="저장" onClick={onSubmitChange} />
    </>
  );
};

export default ChangeProfileImage;
