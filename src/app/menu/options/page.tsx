"use client";

import { useState } from "react";
import Link from "next/link";

export default function Option() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour envoyer un email via mailto
  const handleMailto = () => {
    const subject = `${formData.nom} - ${formData.objet}`;
    const body = `${formData.message}`;
    const mailtoLink = `mailto:exploremathgestion@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="h-screen overflow-y-auto flex justify-center items-start bg-gray-100 text-gray-900 p-4 relative">
      <Link
        href="/"
        className="absolute top-4 right-4 bg-orange-500 text-white py-3 px-8 rounded font-bold"
      >
        Retour
      </Link>
  
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg space-y-12">
  
        {/* Section À propos */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">À propos de notre site</h2>
          <p className="text-lg">
            Bienvenue sur <strong>ExploreMath</strong> ! Notre mission est de rendre les mathématiques 
            plus accessibles et captivantes pour tous. Nous croyons que les mathématiques sont 
            un outil puissant pour comprendre le monde et résoudre des problèmes.
          </p>
          <p className="text-lg mt-4">
            Sur ce site, nous encourageons la <strong>pratique</strong> et la <strong>réussite </strong> 
            en offrant des exercices interactifs et des leçons engageantes. Que vous soyez étudiant, 
            parent ou enseignant, nous sommes ici pour vous aider à découvrir le plaisir d&apos;apprendre 
            et de maîtriser les mathématiques.
          </p>
        </section>
  
        {/* Section FAQ */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Foire aux questions (FAQ)</h2>
          <ul className="list-disc pl-6 text-lg space-y-4">
            <li>
              <strong>Dois-je créer un compte pour utiliser le site ? </strong> 
              Non, il n&apos;est pas nécessaire de créer un compte pour accéder aux contenus et exercices proposés.
            </li>
            <li>
              <strong>À qui s&apos;adresse ce site ? </strong> 
              Ce site s&apos;adresse à tous ceux qui souhaitent améliorer leurs compétences en mathématiques.
            </li>
            <li>
              <strong>Les ressources sont-elles gratuites ? </strong> 
              Oui, toutes les ressources disponibles sur le site sont entièrement gratuites.
            </li>
            <li>
              <strong>Puis-je signaler une erreur ou un bug ? </strong> 
              Oui, utilisez la section &quot;Nous joindre&quot; pour nous envoyer un message.
            </li>
          </ul>
        </section>
  
        {/* Section Contacter */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contacter l&apos;équipe</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="nom" className="block text-lg">Votre nom :</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="objet" className="block text-lg">Objet :</label>
              <input
                type="text"
                id="objet"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg">Votre e-mail :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg">Votre message :</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleMailto}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Envoyer
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}