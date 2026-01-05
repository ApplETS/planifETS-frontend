'use client';
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full z-[9999] bg-secondary">
      <div className="flex-col items-center text-center">
        <div className="flex items-center justify-center p-6">
          <h4>Contactez-nous</h4>
          <div className="ml-4 flex items-center space-x-2">
            <a
              href="https://github.com/ApplETS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="flex items-center p-1"
            >
              <FaGithub size={28} />
            </a>

            <a
              href="https://www.facebook.com/ApplETS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center p-1"
            >
              <FaFacebook size={28} />
            </a>

            <a
              href="https://www.linkedin.com/company/applets"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center p-1"
            >
              <FaLinkedin size={28} />
            </a>

            <a
              href="https://discord.gg/applets"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="flex items-center p-1"
            >
              <FaDiscord size={28} />
            </a>

            <a
              href="https://www.instagram.com/applets.ets/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center p-1"
            >
              <FaInstagram size={28} />
            </a>
          </div>
        </div>
        <div className="bg-primary align-middle items-center p-1">
          <p>@{new Date().getFullYear()} APPlETS - Tous les droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
