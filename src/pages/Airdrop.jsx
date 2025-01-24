import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cl from "../styles/friends.module.css";
import ButtonWallet from "../components/UI/ButtonWallet/ButtonWallet";
import { usePlayerStore } from '../store/playerStore.mjs';
import { useTranslation } from '../hooks/useTranslation';
import AirdropHeader from '../components/UI/AirdropHeader/AirdropHeader';
import AirdropTabs from '../components/UI/AirdropTabs/AirdropTabs';
import nftIcon from '../components/images/nft.gif';
import tonIcon from '../components/images/ton.png';
import succses from '../components/images/telegramSuccses.svg';
import AirdropContent from '../components/UI/AirdropContent/AirdropContent';
import TonConnect from "@tonconnect/sdk";


const Airdrop = ({ url }) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    const { player } = usePlayerStore((state) => state);
    const [activeTab, setActiveTab] = useState('tasks');
    const [walletAddress, setWalletAddress] = useState(player?.wallet || null);

    const [transactionHash, setTransactionHash] = useState(null);
    const connector = new TonConnect();

    const handleTransaction = async () => {
        const amount = "100000000";
        const senderAddress = walletAddress
        const recipientAddress = "UQAvov8DULNd5pvnAVAE-KyBVJYgOg4T8YJUZbfHSqE609VF"
        // Отправляем данные на сервер для подготовки транзакции
        const response = await fetch(url+"api/prepare-transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderAddress,
            recipientAddress,
            amount,
            userId: "user123",
          }),
        });
      
        const { transactionId } = await response.json();
      
        // Подписание транзакции через TonConnect
        const signedTransaction = await connector.sendTransaction({
          to: recipientAddress,
          value: amount,
        });
      
        // Отправляем подписанную транзакцию обратно на сервер
        const responseFeed = await fetch(url+"api/submit-transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionId,
            signedTransaction,
          }),
        });
        const { transactionHash } = await responseFeed.json();
        setTransactionHash(transactionHash);
      };


    const renderContent = () => {
        if (!walletAddress) {
            return (
                <>
                    <div className={cl.friends__container__title}>
                        {t('airdrop.title')}
                    </div>
                    <div className={cl.friends__container__description}>
                        {t('airdrop.description')}
                    </div>
                    <ButtonWallet ton={true} connect={player?.wallet} />
                </>
            );
        }

        return (
            <>
                <AirdropHeader walletAddress={walletAddress} />
                <AirdropTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'tasks' ? (
                    <>
                        <div className={cl.cards_horizontal}>
                            {[
                                { number: 1, text: t('airdrop.cards.transactions') },
                                { number: 17, text: t('airdrop.cards.tasksCompleted') },
                                { image: nftIcon, alt: 'Icon' },
                            ].map((card, index) => (
                                <div key={index} className={cl.card_horizontal}>
                                    {card.number !== undefined && (
                                        <div className={cl.card_number}>{card.number}</div>
                                    )}
                                    {card.text && <div className={cl.card_text}>{card.text}</div>}
                                    {card.image && (
                                        <div className={cl.card_icon}>
                                            <img src={card.image} alt={card.alt} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={cl.task_lists}>
                            <div className={cl.daily_tasks}>
                                <h3>{t('airdrop.taskLists.daily.title')}</h3>
                                <div className={cl.card_vertical}>
                                    <div className={cl.task_card}>
                                        <div className={cl.card_texts}>
                                            <div className={cl.card_title}>
                                                {t('airdrop.taskLists.daily.task.title')}
                                            </div>
                                            <hr className={cl.divider} />
                                            <div className={cl.card_reward}>
                                                {t('airdrop.taskLists.daily.task.reward')}
                                            </div>
                                        </div>
                                        <div className={cl.task_icon} onClick={handleTransaction}>
                                            <img src={tonIcon} alt="Icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cl.airdrop_tasks}>
                                <h3>{t('airdrop.taskLists.airdrop.title')}</h3>
                                <div className={cl.card_vertical}>
                                    <div className={cl.task_card}>
                                        <div className={cl.card_texts}>
                                            <div className={cl.card_title}>
                                                {t('airdrop.taskLists.airdrop.task.title')}
                                            </div>
                                            <hr className={cl.divider} />
                                            <div className={cl.card_reward}>
                                                {t('airdrop.taskLists.airdrop.task.reward')}
                                            </div>
                                        </div>
                                        <div className={cl.task_icon} onClick={handleTransaction}>
                                            <img src={tonIcon} alt="Icon" />
                                        </div>
                                    </div>
                                    <Link to="/farm" style={{textDecoration: 'none'}} className={cl.task_card}>
                                        <div className={cl.card_texts}>
                                            <div className={cl.card_title}>
                                                {t('airdrop.taskLists.airdrop.task.combo')}
                                            </div>
                                            <hr className={cl.divider} />
                                            <div className={cl.card_reward}>
                                                {t('airdrop.taskLists.airdrop.task.reward')}
                                            </div>
                                        </div>
                                        <div className={cl.task_icon}>
                                            {localStorage.getItem('combo') && localStorage.getItem('combo').date === new Date().toISOString() && (
                                                <img src={succses} alt="Icon" />
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <AirdropContent />
                )}
            </>
        );
    };

    return (
        <div className={`${cl.airdrop__container} ${cl.mt_20} ${cl.mb_30}`}>
            {renderContent()}
        </div>
    );
};

export default Airdrop;
