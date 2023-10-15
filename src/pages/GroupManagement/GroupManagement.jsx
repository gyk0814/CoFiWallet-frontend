import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFormAdd } from 'react-icons/gr';
import { useGetGroupMain } from '../../hooks/api/useGetGroupMain';
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';
import { formatPrice } from '../../utils/constant';
import InviteModal from '../AddUser/components/InviteModal';
import ContainerBox from './components/ContainerBox';
import './GroupManagement.scss';

const GroupManagement = () => {
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpenAddUserModal(true);
  };

  const closeModal = () => setIsOpenAddUserModal(false);

  const { isLoading, data: mainData } = useGetGroupMain({
    onSuccess: data => {
      if (data?.groupId === null) {
        navigate('/add-user');
      }
    },
  });

  if (isLoading) return <Loading />;

  const { members, totalIncomes, totalExpenses, cards, banks } =
    mainData.result;

  const groupCardsCount = cards?.length === undefined ? 0 : cards?.length;
  const groupAccountsCount = banks?.length === undefined ? 0 : banks?.length;

  return (
    <div className="groupContainer">
      <div className="groupContentContainer">
        <div className="header">
          <div className="profileImages">
            {members?.map(member => {
              const matchingBank = banks?.find(
                bank => bank.userId === member.userId,
              );
              const userImage = matchingBank?.userImage || member.userImage;

              return (
                <img
                  key={member.userId}
                  className="pofileImage positioned"
                  src={
                    userImage ||
                    'https://picpac.kr/common/img/default_profile.png'
                  }
                  alt="프로필"
                  onClick={() => navigate('/group/group-user')}
                />
              );
            })}
          </div>

          <GrFormAdd
            size={30}
            className="addAccount"
            onClick={() => navigate('/group/add-account')}
          />
        </div>
        <div className="totalPrice" onClick={() => navigate('/group/use')}>
          <div className="detailBox">
            <div className="detail">
              <h1 className="title">수입</h1>
              <span className="count">
                {formatPrice(totalIncomes?.totalCounts)}건
              </span>
            </div>
            <p className="price">{formatPrice(totalIncomes?.totalAmounts)}원</p>
          </div>
          <div className="detailBox">
            <div className="detail">
              <h1 className="title">지출</h1>
              <span className="count">
                {formatPrice(totalExpenses?.totalCounts)}건
              </span>
            </div>
            <p className="price">
              {formatPrice(totalExpenses?.totalAmounts)}원
            </p>
          </div>
        </div>
        <ContainerBox
          title="계좌"
          count={`${groupAccountsCount}건`}
          assets={banks}
          assetType="b"
        />
        <ContainerBox
          title="카드"
          count={`${groupCardsCount}건`}
          assets={cards}
          assetType="c"
        />
        <div className="addUserBox">
          <h1 className="title">구성원 추가하기</h1>
          <GrFormAdd
            size={30}
            className="addUserButton"
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <Navbar />
      {isOpenAddUserModal && (
        <InviteModal
          isOpenAddUserModal={isOpenAddUserModal}
          closeModal={closeModal}
          hideNavbar={true}
        />
      )}
    </div>
  );
};

export default GroupManagement;
