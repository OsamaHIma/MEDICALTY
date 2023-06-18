import Image from "next/image";
import Link from "next/link";

const TypeOfUser = () => {
  const images = [
    { src: "/assets/patient.svg", text: "Patient", link: "patient" },
    { src: "/assets/doctor.svg", text: "Doctor", link: "doctor" },
    { src: "/assets/nurse.svg", text: "Nurse", link: "nurse" },
    {
      src: "/assets/physiotherapy.svg",
      text: "Physiotherapy",
      link: "physiotherapy",
    },
    { src: "/assets/pharmacy.svg", text: "Pharmacy", link: "pharmacy" },
    { src: "/assets/hospital.svg", text: "Hospital", link: "hospital" },
    { src: "/assets/center.svg", text: "Center", link: "center" },
    // { src: "/assets/lab.jpg", text: "Lab", link: "lab" },
  ];

  return (
    <section className="px-4 flex flex-col py-20 gap-8 relative">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-500 text-transparent bg-clip-text">
        Pick one up to start now!
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href={`/auth/signUp/${image.link}`}>
              <Image
                width={0}
                height={0}
                src={image.src}
                alt={image.text}
                className="w-full object-contain rounded-full bg-gradient-to-br from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                style={{ aspectRatio: "1 / 1" }}
                priority
              />
            </Link>
            <p className="mt-2 text-slate-700 dark:text-slate-300 text-center text-lg font-medium">
              I'm a {image.text}
            </p>
          </div>
        ))}
      </div>
      <div className="gradient absolute w-[80%] h-96 bg-gradient-to-r bottom-0 from-green-500/50 to-indigo-600/50 blur-[100px] left-[100px] -z-[1]" />
    </section>
  );
};

export default TypeOfUser;
