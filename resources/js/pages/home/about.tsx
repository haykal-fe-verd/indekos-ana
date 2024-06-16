import React from "react";
import { Head, usePage } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";
import Footer from "@/layouts/shared/footer";
import { Instagram, Phone } from "lucide-react";

function About() {
  return (
    <GuestLayout>
      <Head title="About" />
      <section id="about" className="bg-white">
        <div className="container flex flex-col items-center mx-auto md:px-24 md:py-10 md:flex-row">
          <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className="w-full mb-5 lg:max-w-lg">
            <h1 className="text-2xl font-semibold underline decoration-wavy">Indekos</h1>
            <p className="mt-5 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores porro sit dolorum nihil laborum
              aspernatur error sint animi numquam maxime dicta, minima vitae obcaecati unde explicabo aut ipsum natus
              cumque iusto dolorem. Quas facere repellendus tenetur placeat totam aliquam explicabo. Id sequi saepe
              voluptates reprehenderit error sit necessitatibus amet et, inventore dolore repellendus quo quisquam
              itaque possimus, ut vero aperiam totam odit voluptatem. Distinctio maxime dolorum unde corrupti illo,
              similique ipsam neque ad et, sit molestias vitae. Quaerat aspernatur dolorum ex obcaecati quasi voluptates
              eaque libero recusandae temporibus veritatis alias, at natus, unde illum distinctio cum! Accusamus,
              corporis! Fuga, explicabo.
            </p>
            <div className="flex flex-row gap-10 mt-20">
              <a href="#" target="_blank" className="flex flex-row items-center gap-3">
                <Instagram /> Instagram
              </a>
              <a href="#" target="_blank" className="flex flex-row items-center gap-3">
                <Phone /> Whatsapp
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </GuestLayout>
  );
}

export default About;
