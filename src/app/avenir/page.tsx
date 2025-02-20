import Link from "next/link";

export default function Primaire() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-black relative">
      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold z-10"
      >
        Retour
      </Link>

      {/* Section Titre */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          À Venir
        </h1>
      </div>

      <div className="block">
        {/* Première Animation */}
        <div className="first-motion">
          <div className="circle"></div>
          <div className="ball"></div>
        </div>

        {/* Deuxième Animation */}
        <div className="flex items-center justify-center second-motion overflow-hidden">
          <div className="base"></div>
          <div className="ball"></div>
          <div className="first-circle base-cir"></div>
          <div className="second-circle base-cir"></div>
          <div className="third-circle base-cir"></div>
          <div className="fourth-circle base-cir"></div>
        </div>

        {/* Troisième Animation */}
        <div className="h-full w-full flex items-center justify-center third-motion overflow-hidden">
          <div className="cube shrink">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
          </div>
          <div className="ball"></div>
        </div>

        {/* Quatrième Animation */}
        <div className="h-full w-full flex items-center justify-center fourth-motion overflow-hidden">
          <div className="ball-container relative">
            <div className="first-line ray"></div>
            <div className="second-line ray"></div>
            <div className="third-line ray"></div>
            <div className="fourth-line ray"></div>
            <div className="fifth-line ray"></div>
            <div className="ball"></div>
          </div>
          <div className="logo absolute text-white flex flex-col text-4xl items-center text-center">
            <p>CSS Animations</p>
          </div>

          {/* Instagram Icon */}
          <div className="flex items-center mt-8 text-5xl insta">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 -0.5 25 25" fill="#ef4444">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="15.5" y="9" width="2" height="2" rx="1" transform="rotate(-90 15.5 9)" fill="#000000"></rect>
              <rect x="16" y="8.5" width="1" height="1" rx="0.5" transform="rotate(-90 16 8.5)" stroke="#000000" strokeLinecap="round"></rect>
            </svg>
            <p className="pb-2 text-pink">alaa.alaff</p>
          </div>
        </div>
      </div>
    </div>
  );
}
