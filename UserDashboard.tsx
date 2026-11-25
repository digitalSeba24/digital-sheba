import React from 'react';
import { ArrowUpRight, ClipboardList, Download, LogOut, PlusCircle, UserCheck, Wallet } from 'lucide-react';
import { formatBDT } from './seedData';
import { BrandLogo } from './BrandLogo';
import { UserTab } from './Navbar';

interface UserDashboardProps {
  onNavigateTab: (tab: UserTab) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onNavigateTab,
}) => {
  const { currentUser, state, language, logout } = useApp();
  const { isInstalledMode, isInstalling, installUnsupported, installApp } =
    useAppInstall();
  const estésIsEn = language === 'en';

  const userOrders = currentUser
    ? state.orders.filter((o) => o.userId === currentUser.id)
    : [];
  const pendingOrders = userOrders.filter(
    (o) => o.status === 'Pending' || o.status === 'Processing'
  ).length;
  const completedOrders = userOrders.filter(
    (o) => o.status === 'Completed'
  ).length;
  const pendingRecharges = currentUser
    ? state.recharges.filter(
        (r) => r.userId === currentUser.id && r.status === 'Pending'
      ).length
    : 0;

  const bannerSubtitle = estésIsEn
    ? state.settings.bannerSubtitleEn || state.settings.bannerSubtitle
    : state.settings.bannerSubtitle;

  const renderDownloadButton = () => {
    if (isInstalledMode) return null;
    return (
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <button
          type="button"
          disabled={isInstalling}
          onClick={installApp}
          className="min-h-[42px] sm:min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span>
            {isInstalling
              ? estésIsEn
                ? 'Installing...'
                : 'ইনস্টল হচ্ছে...'
              : estésIsEn
              ? 'Install App'
              : 'অ্যাপ ইনস্টল'}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-9 h-9" />
          <div>
            <h1 className="font-bold text-base text-white">
              {currentUser?.name || 'User'}
            </h1>
            <p className="text-xs text-slate-400">{currentUser?.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {renderDownloadButton()}
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-slate-800/80 text-rose-400 hover:bg-slate-800 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-4">
        <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium">
                {estésIsEn ? 'Available Balance' : 'মূল ব্যালেন্স'}
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('recharge')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1 hover:bg-indigo-600/40 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              {estésIsEn ? 'Add Money' : 'ব্যালেন্স রিচার্জ'}
            </button>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {formatBDT(currentUser?.balance || 0)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => onNavigateTab('orders')}
            className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">
                {estésIsEn ? 'My Orders' : 'আমার অর্ডার'}
              </span>
              <ClipboardList className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {userOrders.length}
            </div>
            {pendingOrders > 0 && (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                {pendingOrders} {estésIsEn ? 'Pending' : 'টি পেন্ডিং'}
              </span>
            )}
          </div>

          <div
            onClick={() => onNavigateTab('recharge')}
            className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">
                {estésIsEn ? 'Recharges' : 'রিচার্জ হিস্ট্রি'}
              </span>
              <UserCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {pendingRecharges}
            </div>
            <span className="text-[10px] text-slate-400 inline-block mt-1">
              {estésIsEn ? 'Pending requests' : 'পেন্ডিং রিচার্জ'}
            </span>
          </div>
        </div>

        {bannerSubtitle && (
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-300 text-center">
            {bannerSubtitle}
          </div>
        )}
      </main>
    </div>
  );
};
