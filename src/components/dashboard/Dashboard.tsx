'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Account, Transaction } from '@/utils/types';
import Link from 'next/link';
import TransactionHistory from './TransactionHistory';
import Header from './header/Header';
import { formatCurrency } from '../formatCurrency';
import { IoIosArrowForward } from 'react-icons/io';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from '../Loader';
import { BillIcon, CardIcon } from '../svgIcons';
import Image from 'next/image';

const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  const today = new Date();
  return today.toLocaleDateString('en-US', options);
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Account | null>(null);
  const [hideBalance, setSideBalance] = useState(false);

  const toggleHideBalance = () => {
    setSideBalance(true);
  };

  const toggleShowBalance = () => {
    setSideBalance(false);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/');
  };

  if (!user) {
    return <Loader />;
  }

  const date = new Date();
  const hour = date.getHours();

  const formattedDate = getFormattedDate();

  return (
    <div className="">
      <Header handleLogout={handleLogout} user={user} />
      <div className="flex flex-col">
        <div className="p-[16px] py-[15px] flex flex-col">
          <span>{formattedDate}</span>
          <span className="font-medium text-xl">Hi, {user.holder.fullName}</span>
        </div>
        <div className="px-[16px] mb-4">
          {/* Checking Account */}
          {user.bank_details.isChecking && (
            <div className="border flex flex-col gap-6 bg-[#999999] text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-[14px] flex items-center gap-1">
                  Available balance
                  {hideBalance ? <FiEyeOff onClick={toggleShowBalance} /> : <FiEye onClick={toggleHideBalance} />}
                </span>
                <Link href="/dashboard/transactions" className="text-[14px] flex items-center gap-1">
                  <span>Transaction History</span> <IoIosArrowForward className="relative top-[2px]" />
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-[400] text-[20px]">{hideBalance ? '******' : formatCurrency(user.bank_details.balance_usd ?? 0)}</span>
                <Link href="/dashboard/transfer" className="p-[5px_20px] rounded-full bg-white text-[#000000] text-[14px]">
                  Send money
                </Link>
              </div>
            </div>
          )}

          {/* Savings Account */}
          {user.bank_details.isSavings && (
            <div className="border flex flex-col gap-2 bg-[#999999] text-white p-4 rounded-lg rounded-t-none">
              <div className="flex items-center justify-between">
                <span className="text-[14px] flex items-center gap-1">
                  Business Savings Account
                  {hideBalance ? <FiEyeOff onClick={toggleShowBalance} /> : <FiEye onClick={toggleHideBalance} />}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-[400] text-[20px]">{hideBalance ? '******' : formatCurrency(user.bank_details.saving_balance_usd ?? 0)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-[16px] hidden border py-8">
          <div className="flex items-center justify-center gap-3">
            <Link href="/dashboard/cards" className="border flex items-center gap-1 p-4 py-2 text-[13px] max-w-max bg-white text-[#999999] rounded-full">
              <CardIcon className="w-5 h-5" /> <span>Cards</span>
            </Link>
            <Link href="/dashboard/bill-payment" className="border flex items-center gap-1 p-4 py-2 text-[13px] max-w-max bg-white text-[#999999] rounded-full">
              <BillIcon className="w-5 h-5" />
              <span>Pay Bills</span>
            </Link>
          </div>
        </div>
        <TransactionHistory user={user} hideBalance={hideBalance} />

        <div className="border flex flex-col gap-4 p-6 px-4">
          <div className="border rounded-xl flex flex-col gap-4 bg-white overflow-hidden">
            <Image src="https://i.imgur.com/q6QcqwG.jpeg" width={5000} height={5000} className="" alt="sjsusbnnsn" />

            <div className="text-center flex flex-col gap-2 text-black p-3 px-7 pb-7">
              <span className="font-bold">Home Loans</span>
              <span>Find a range of guides, calculators and FAQs to help you manage your home loan.</span>
            </div>
          </div>
          <div className="border rounded-xl flex flex-col gap-4 bg-white overflow-hidden">
            <Image src="https://i.imgur.com/eLzLF4G.jpeg" width={5000} height={5000} className="" alt="sjsusbnnsn" />

            <div className="text-center flex flex-col gap-2 text-black p-3 px-7 pb-7">
              <span className="font-bold">Business Banking</span>
              <span>A dedicated area with comprehensive support for your business banking needs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
