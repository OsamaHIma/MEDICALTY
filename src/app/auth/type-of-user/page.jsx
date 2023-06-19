import Translate from "@/components/Translate";
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
    <section className="relative flex flex-col gap-8 px-4 py-20">
      <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-3xl font-bold text-transparent">
        <Translate>Select your Specialty to start now!</Translate>
      </h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href={`/auth/signUp/${image.link}`}>
              <Image
                width={0}
                height={0}
                src={image.src}
                alt={image.text}
                className="w-full transform rounded-full bg-gradient-to-br from-green-500 to-blue-500 object-contain transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:from-blue-500 hover:to-green-500"
                style={{ aspectRatio: "1 / 1" }}
                priority
              />
            </Link>
            <p className="mt-2 text-center text-lg font-medium text-slate-700 dark:text-slate-300">
              <Translate>I'm a {image.text}</Translate>
            </p>
          </div>
        ))}
      </div>
      <div className="gradient absolute bottom-0 left-[100px] -z-[1] h-96 w-[80%] bg-gradient-to-r from-green-500/50 to-indigo-600/50 blur-[100px]" />
    </section>
  );
};

export default TypeOfUser;
