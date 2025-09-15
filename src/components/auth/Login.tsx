'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { mockAccounts } from '../mockData/MockData';
import Header from '../header/Header';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userAccount = mockAccounts.find(account => account.holder.username === username);
    if (!userAccount) {
      setError('User not found');
      return;
    }
    if (userAccount.holder.password !== password) {
      setError('Invalid password');
      return;
    }
    // Store user data in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userAccount));
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#F5F3F1] h-screen relative">
      <Header />
      <div className="py-5 px-6 text-2xl">
        <h1 className="text-[#000000] pl-2 font-light">Login to Internet Banking</h1>
      </div>
      <div className="p-4 px-6 pt-0 w-full">
        <div className="w-full pb-10">
          <div className="mb-5">{error && <p className="text-[20px] text-center mx-auto max-w-[200px] rounded-md flex items-center justify-center text-red-600">{error}</p>}</div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="Customer ID" className="text-[#000000] text-[16px]">
                  Customer ID
                </label>
                <input
                  type="text"
                  value={username}
                  className="p-4 py-3 rounded-sm text-[#5c5c5c] placeholder:text-gray-600 bg-white border border-gray-500 outline-none"
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="Password" className="text-[#000000] text-[16px]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="p-4 py-3 rounded-[8px] text-[#5c5c5c] placeholder:text-gray-600 bg-white border border-gray-500 outline-none"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 mt-8">
              <button type="submit" className="p-4 py-3 bg-[#FFCD05] w-full text-black font-bold rounded-md">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full min-h-[70px] bg-[#ebf0f3] absolute bottom-0 z-50 flex flex-col gap-4 items-center justify-center px-6 py-12">
        <p className="text-base flex flex-col gap-1 text-center">
          <span>© Copyright Suncorp (Norfina Limited ABN 66 010 831 722) </span>{' '}
        </p>
        <p className="text-base flex flex-col gap-1 text-center">
          <span>The SUNCORP brand and Sun Logo are used by Suncorp under licence and Suncorp is not part of the Suncorp Group.</span>{' '}
        </p>
      </div>
    </div>
  );
}
