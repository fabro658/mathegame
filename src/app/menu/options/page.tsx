"use client"; // Assurez-vous que ce fichier soit rendu côté client

// Si tu ne prévois pas d'utiliser ces hooks, tu peux supprimer ces imports
// import { useState, useEffect } from "react";
// import Link from "next/link";

export default function Option() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-8">Option</h1>

      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Présentation du site</h2>
          <p className="text-lg">
            Bienvenue sur notre site ! Notre objectif est de vous offrir une expérience
            agréable et facile à utiliser. Nous vous proposons des fonctionnalités innovantes 
            pour vous aider à [insère ici l&apos;objectif spécifique du site]. Que vous soyez 
            ici pour [décrire les principales actions sur le site], nous espérons que vous
            trouverez ce que vous cherchez.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Foire aux questions (FAQ)</h2>
          <ul className="list-disc pl-6 text-lg">
            <li><strong>Comment m&apos;inscrire ?</strong> Pour vous inscrire, cliquez sur le bouton &quot;S&apos;inscrire&quot; en haut à droite de la page d&apos;accueil.</li>
            <li><strong>Comment réinitialiser mon mot de passe ?</strong> Si vous avez oublié votre mot de passe, cliquez sur &quot;Mot de passe oublié&quot; sur la page de connexion.</li>
            <li><strong>Comment signaler un bug ?</strong> Si vous rencontrez un problème, vous pouvez nous en informer via le formulaire de contact ci-dessous.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contacter l&apos;équipe</h2>
          <p className="text-lg mb-4">
            Si vous avez des questions ou si vous rencontrez un problème, n&apos;hésitez pas à nous
            contacter en remplissant le formulaire ci-dessous. Nous nous efforçons de répondre
            dans les plus brefs délais.
          </p>

          {/* Formulaire de contact */}
          <form className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-lg">Votre nom :</label>
              <input
                type="text"
                id="nom"
                name="nom"
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Envoyer
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
