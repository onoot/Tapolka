import React from 'react';
import cl from './AirdropTabs.module.css';
import { useTranslation } from '../../../hooks/useTranslation';

const AirdropTabs = ({ activeTab, setActiveTab }) => {
  const language = localStorage.getItem('language') || 'en';
  const { t } = useTranslation(language);

  return (
    <div className={cl.tabs}>
      <button
        className={`${cl.tab} ${activeTab === 'tasks' ? cl.active : ''}`}
        onClick={() => setActiveTab('tasks')}
      >
        {t('airdrop.tabs.tasks')}
      </button>
      <button
        className={`${cl.tab} ${activeTab === 'airdrop' ? cl.active : ''}`}
        onClick={() => setActiveTab('airdrop')}
      >
        {t('airdrop.tabs.airdrop')}
      </button>
    </div>
  );
};

export default AirdropTabs;
