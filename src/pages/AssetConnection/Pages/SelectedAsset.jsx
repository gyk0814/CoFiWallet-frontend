import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useSelectedAccount } from '../../../hooks/api/userAccount/useSelectedAccount';
import Loading from '../../../components/Loading/Loading';
import useSaveSelectedAsset from '../../../hooks/api/userAccount/useSaveSelectedAsset';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import './SelectedAsset.scss';

const SelectedAsset = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [selectedList, setSelectedList] = useState([]);

  const banks = searchParams.get('b');
  const cards = searchParams.get('c');

  const { data, error, isLoading } = useSelectedAccount(banks, cards);

  const mutation = useSaveSelectedAsset();

  const handlePostSelectedList = () => {
    mutation.mutate({ data: selectedList });
  };

  if (isLoading) return <Loading />;
  if (error) {
    console.log(error);
  }

  const handleCheckbox = item => {
    setSelectedList(prev => {
      if (prev.includes(item)) {
        return prev.filter(existingItem => existingItem !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className="selectedAsset">
      <header>
        <BiArrowBack
          className="toBack"
          onClick={() => {
            navigate(-1);
          }}
        />
      </header>

      <p className="announceMessage">
        <span className="highlight">불러올 자산을 선택</span>해주세요
      </p>

      <main className="assetListSection">
        {data.map(
          (asset, i) =>
            asset.items.length > 0 && (
              <div className="assetBox" key={i}>
                <div className="assetTitle">
                  <img
                    className="bankImage"
                    src={asset.imageUrl}
                    alt={asset.providerName}
                  />
                  <h3>{asset.providerName}</h3>
                </div>
                <div className="assetList">
                  {asset.items.map(item => (
                    <div className="assetCard" key={item.providerID}>
                      <div className="assetInfo">
                        <h5 className="assetName">{item.financeName}</h5>
                        <p className="assetNumber">{item.financeNumber}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedList.includes(item)}
                        onChange={() => {
                          handleCheckbox(item);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ),
        )}
      </main>

      <DefaultButton text="저장하기" onClick={handlePostSelectedList} />
    </div>
  );
};

export default SelectedAsset;
