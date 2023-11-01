import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useAccountData } from '../../hooks/api/userAccount/useAccountData';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import Loading from '../../components/Loading/Loading';
import CardList from './Pages/CardList';
import './AssetConnection.scss';

const AssetConnection = () => {
  const navigate = useNavigate();

  const [myCards, setMyCards] = useState([]);
  const [myBanks, setMyBanks] = useState([]);
  const [cardClick, setCardClick] = useState(true);
  const [bankClick, setBankClick] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);

  const handleItemClick = (type, providerID) => {
    if (type === 'card') {
      setSelectedCards(prev =>
        prev.includes(providerID)
          ? prev.filter(item => item !== providerID)
          : [...prev, providerID],
      );
    } else if (type === 'bank') {
      setSelectedBanks(prev =>
        prev.includes(providerID)
          ? prev.filter(item => item !== providerID)
          : [...prev, providerID],
      );
    }
  };

  const handleSave = () => {
    navigate(
      `/select-asset?b=${selectedBanks.join(',')}&c=${selectedCards.join(',')}`,
    );
  };

  const { data, isError, isLoading, error } = useAccountData();

  useEffect(() => {
    if (data) {
      setMyBanks(data.bank);
      setMyCards(data.card);
    } else if (isError) {
      console.error(`Data communication failed: (${error.message})`);
    } else {
      console.log('Retrying communication');
    }
  }, [data, isError]);

  const handleCardClick = () => {
    setCardClick(true);
    setBankClick(false);
  };
  const handlebankClick = () => {
    setCardClick(false);
    setBankClick(true);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="assetConnection">
      <header>
        <BiArrowBack
          className="toBack"
          onClick={() => {
            navigate(-1);
          }}
        />
      </header>

      <main className="">
        <section className="announcementMessage">
          <h5>Select institutions to connect</h5>
          <h5>
            <span className="highlight">by category</span>
          </h5>
        </section>

        <section className="categories">
          <button
            className={`categoryButton ${cardClick ? 'bold' : ''}`}
            onClick={handleCardClick}
          >
            Cards
          </button>
          <button
            className={`categoryButton ${bankClick ? 'bold' : ''}`}
            onClick={handlebankClick}
          >
            Banks
          </button>
        </section>

        {cardClick && (
          <CardList
            data={myCards}
            type="card"
            onItemSelect={handleItemClick}
            selectedItems={selectedCards}
          />
        )}
        {bankClick && (
          <CardList
            data={myBanks}
            type="bank"
            onItemSelect={handleItemClick}
            selectedItems={selectedBanks}
          />
        )}

        <DefaultButton text="Save" onClick={handleSave} />
      </main>
    </div>
  );
};

export default AssetConnection;
