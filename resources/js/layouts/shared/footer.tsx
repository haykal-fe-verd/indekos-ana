import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-50">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between py-5 text-gray-500 lg:flex-row">
          <div className="flex flex-row items-start w-full gap-5 ">
            <img src="/logo-poltek.png" alt="Logo Poltek" className="h-12 " />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold leading-relaxed ">Politeknik Aceh</h1>
              <h2>{new Date().getFullYear()}</h2>
            </div>
          </div>
          <div className="flex justify-end w-full ">
            <p>&copy; {new Date().getFullYear()} NUR ANARAFIKHI. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
