"use client";

import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full min-h-[70px] bg-white relative flex items-center justify-between p-[20px] py-4">
      <Image src="https://i.imgur.com/UAfCEgg.png" width={200} height={200} className="w-[180px] h-[40px]" alt="logo" />
      <p className="text-[#004346] text-base">Internet Banking</p>
    </div>
  );
}
