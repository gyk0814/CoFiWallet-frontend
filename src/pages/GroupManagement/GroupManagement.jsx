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
                  alt="Profile"
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
              <h1 className="title">Income</h1>
              <span className="count">
                {formatPrice(totalIncomes?.totalCounts)} items
              </span>
            </div>
            <p className="price">
              {formatPrice(totalIncomes?.totalAmounts)} KRW
            </p>
          </div>
          <div className="detailBox">
            <div className="detail">
              <h1 className="title">Expense</h1>
              <span className="count">
                {formatPrice(totalExpenses?.totalCounts)} items
              </span>
            </div>
            <p className="price">
              {formatPrice(totalExpenses?.totalAmounts)} KRW
            </p>
          </div>
        </div>
        <ContainerBox
          title="Accounts"
          count={`${groupAccountsCount} items`}
          assets={banks}
          assetType="b"
        />
        <ContainerBox
          title="Cards"
          count={`${groupCardsCount} items`}
          assets={cards}
          assetType="c"
        />
        <div className="addUserBox">
          <h1 className="title">Add Members</h1>
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
