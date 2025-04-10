import { motion } from "framer-motion"; // Importer framer-motion
import React, { useEffect, useRef, useState } from "react";

interface CaptchaProps {
  onChange: (value: string) => void;
}

enum VALIDATION_STATE {
  PENDING = "PENDING",
  INVALID = "INVALID",
  VALID = "VALID",
}

// Fonction de génération de texte aléatoire
const generateRandomText = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const Captcha: React.FC<CaptchaProps> = ({ onChange }) => {
  const [captchaText, setCaptchaText] = useState<string>(generateRandomText(6));
  const [userInput, setUserInput] = useState<string>("");
  const [validationState, setValidationState] = useState<VALIDATION_STATE>(
    VALIDATION_STATE.PENDING
  );
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>(""); // Couleur du message
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dessiner le CAPTCHA sur le canvas
  const drawCaptcha = (captchaText: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer l'ancien CAPTCHA
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fond gris clair

    // Dessiner le texte du CAPTCHA
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(captchaText, 50, 35);

    // Ajouter du bruit (lignes et points aléatoires)
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  };

  // Vérifier la réponse de l'utilisateur
  const verifyCaptcha = () => {
    const isValid = userInput === captchaText;
    setValidationState(
      isValid ? VALIDATION_STATE.VALID : VALIDATION_STATE.INVALID
    );

    setMessage(
      isValid ? "CAPTCHA validé !" : "CAPTCHA incorrect. Essayez encore."
    );

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    setMessageColor(isValid ? "green" : "red");

    // Regénérer un nouveau CAPTCHA
    const newCaptchaText = generateRandomText(6);
    setCaptchaText(newCaptchaText);
    setUserInput("");

    // Passer le résultat au parent via onChange
    onChange(isValid ? "valid" : "invalid");
  };

  // Redessiner le CAPTCHA lorsque le texte change
  useEffect(() => {
    drawCaptcha(captchaText);
  }, [captchaText]);

  return (
    <div className="text-center mt-12 px-2">
      {validationState !== VALIDATION_STATE.VALID && (
        <>
          <h2 className="text-md py-2 font-semibold">
            Veuillez entrer le texte du CAPTCHA
          </h2>
          <canvas
            ref={canvasRef}
            height="50"
            className="m-auto w-full max-w-lg border border-gray-300 mt-4"
          />
          <div className="flex gap-2 justify-center max-w-lg items-center flex-nowrap mt-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Entrez le texte ici"
              className="p-2 grow-[2] text-lg border border-indigo-600"
            />
            <button
              type="button"
              onClick={verifyCaptcha}
              className="p-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"
                />
              </svg>
            </button>
          </div>
        </>
      )}
      <motion.p
        className={`mt-3 text-sm ${
          messageColor === "green" ? "text-green-500" : "text-red-500"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // Animation de disparition
        transition={{ duration: 0.5 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Captcha;
