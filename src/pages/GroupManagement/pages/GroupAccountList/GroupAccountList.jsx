import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useGetGroupAssets } from '../../../../hooks/api/group/useGetAccountList';
import Loading from '../../../../components/Loading/Loading';
import { formatPrice } from '../../../../utils/constant';
import './GroupAccountList.scss';

const GroupAccountList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const assets = searchParams.get('type');
  const memberIdParam = searchParams.get('memberId');
  const memberId = parseInt(memberIdParam);

  const [activeTab, setActiveTab] = useState('Shared');
  const navigate = useNavigate();

  const { isLoading, data: accountList } = useGetGroupAssets(assets, memberId);

  const handleTabClick = (tabName, tabUserId) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (tabName === 'Shared') {
      setActiveTab('Shared');
      newSearchParams.set('type', assets);
      newSearchParams.delete('memberId');
    } else {
      setActiveTab(tabName);
      newSearchParams.set('type', assets);
      newSearchParams.set('memberId', tabUserId);
    }

    setSearchParams(newSearchParams);
  };

  const totalRest = accountList
    ? accountList.info.reduce((sum, account) => sum + Number(account.total), 0)
    : 0;

  if (isLoading) return <Loading />;

  return (
    <div className="groupAccountListContainer">
      <div className="accountListHeader">
        <div className="accountListTitleBox">
          <BiArrowBack
            size={20}
            className="arrowBack"
            onClick={() => navigate('/group')}
          />
          <h1 className="title">Accounts</h1>
        </div>
        <div className="groupUser">
          <button
            className={`groupTab ${activeTab === 'Shared' ? 'bold' : ''}`}
            onClick={() => handleTabClick('Shared')}
          >
            Shared
          </button>
          {accountList?.members.map(tab => (
            <button
              key={tab.userId}
              className={`groupTab ${activeTab === tab.userName ? 'bold' : ''}`}
              onClick={() => handleTabClick(tab.userName, tab.userId)}
            >
              {tab.userName}
            </button>
          ))}
        </div>
      </div>
      <div className="totalAccountPriceContainer">
        <div className="totalAccountPriceContentContainer">
          <div className="header">
            <p>Total Balance</p>
            <p>
              <b className="price">{formatPrice(totalRest)}</b>KRW
            </p>
          </div>
          <div className="accountItemContainer">
            {accountList?.info.map((account, i) => (
              <div className="accountItemBox" key={i}>
                <div className="accontTitleHeader">
                  <p>{account.providerName}</p>
                  <p>
                    <b className="price">
                      {formatPrice(Number(account.total))}
                    </b>
                    KRW
                  </p>
                </div>
                {account.finances.map(finance => (
                  <div className="accountList" key={i}>
                    <img
                      src={account.providerImage}
                      alt="Accounts"
                      className="accountImage"
                    />
                    <div className="accountTitleBox">
                      <p className="accountNumber">{finance.financeNumber}</p>
                      <span className="price">
                        {formatPrice(finance.sum)}KRW
                      </span>
                    </div>
                    <img
                      src={finance.userProfile}
                      alt="Profile"
                      className="profile"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupAccountList;
