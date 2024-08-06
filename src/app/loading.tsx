"use client";

import { useEffect } from "react";
import Header from "@/components/header/Header";
import ShortFooter from "@/components/footer/ShortFooter";

const Loader = () => {
  useEffect(() => {
    async function getLoader() {
      const { bouncy } = await import("ldrs");
      bouncy.register();
    }
    getLoader();
  }, []);
  return <l-bouncy size="60" speed="1.7" color="#FD7E2D" />;
};

export default function Loading() {
  return (
    <>
      <Header />
      <main className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2">
        <div className="flex flex-col items-center justify-center gap-8 h-full p-20 rounded-4xl shadow bg-gray-0">
          <div className="flex items-center justify-center w-[100px] h-[100px]">
            <Loader />
          </div>
          <div className="space-y-3">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"잠시만 기다려주세요"}
            </h2>
            <div className="text-center body-1 font-normal text-gray-500">
              {"사내 워크숍도 코모와 함께"}
            </div>
          </div>
        </div>
      </main>
      <ShortFooter />
    </>
  );
}
