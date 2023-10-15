import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/constant';
import './ContainerBox.scss';

const ContainerBox = ({ title, count, assets, assetType }) => {
  const navigate = useNavigate();

  const assetListLength = assets ? assets.length : 0;
  const visibleAssets = assetListLength > 2 ? assets.slice(0, 2) : assets;

  const goToDetailAsset = (financeId, year, month) => {
    const basePath = `/group/finance/detail/${
      assetType === 'b' ? 'account' : 'card'
    }`;
    const urlParams =
      assetType === 'b'
        ? `financeId=${financeId}`
        : `financeId=${financeId}&yearValue=${year}&monthValue=${month}`;
    navigate(`${basePath}?${urlParams}`);
  };

  return (
    <div className="container">
      <div
        className="boxHeader"
        onClick={() =>
          navigate(
            `/group/${
              assetType === 'b' ? 'account' : 'card'
            }?type='${assetType}'`,
          )
        }
      >
        <h1 className="title">{title}</h1>
        <p className="count">{formatPrice(count)}</p>
      </div>
      <div className="assetListBox">
        {visibleAssets?.map(asset => (
          <div
            className="assetListContainer"
            key={asset.financeId}
            onClick={() => {
              goToDetailAsset(asset.financeId);
            }}
          >
            <img
              className="userPofileImage"
              src={
                asset.userImage ||
                'https://picpac.kr/common/img/default_profile.png'
              }
              alt="프로필"
            />
            {assetType === 'account' ? (
              <img
                className="accountImage"
                src={asset.providerImage}
                alt="은행"
              />
            ) : (
              <img className="cardImage" src={asset.providerImage} alt="카드" />
            )}
            <div className="accountItemBox">
              <p className="accountName">{asset.providerName}</p>
              <p className="price">{formatPrice(asset.amount)}원</p>
            </div>
          </div>
        ))}
        {assetListLength > 2 && (
          <button
            className="moreAccount"
            onClick={() =>
              navigate(
                `/group/${
                  assetType === 'b' ? 'account' : 'card'
                }?type='${assetType}'`,
              )
            }
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default ContainerBox;
