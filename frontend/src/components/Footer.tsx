import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary-500 py-10">
      <div className="container mx-auto flex flex-row justify-between items-center lg:px-32 px-4">
        <span className="text-2xl md:text-3xl text-text-50 font-bold tracking-tight cursor-pointer">
          <Link to="/">AryaVihar.com</Link>
        </span>
        <span className="text-text-50 font-bold tracking-tight flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
