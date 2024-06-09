import { useEffect } from "react";
import gsap from "gsap";

const Hero = () => {
  useEffect(() => {
    const heroHeading = document.getElementById("hero-heading");
    const heroDescription = document.getElementById("hero-description");

    gsap.fromTo(
      heroHeading,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        color: "white",
      }
    );

    gsap.fromTo(
      heroDescription,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        color: "white",
      }
    );
  }, []);

  return (
    <div className="bg-[#b30000] pb-10 pt-2">
      <div className="container mx-auto flex flex-col gap-3 lg:px-32 px-4">
        <h1
          id="hero-heading"
          className="sm:text-4xl text-3xl text-transparent font-bold"
        >
          Discover Timeless Hospitality
        </h1>
        <p id="hero-description" className="sm:text-2xl text-xl text-white">
          Experience the essence of Indian heritage and luxury at AryaVihar.
        </p>
      </div>
    </div>
  );
};

export default Hero;
