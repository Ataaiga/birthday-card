
import { useState } from "react";
import type { GameStage } from "./game";
import { nextStage, scenes } from "./game";
import "./App.css";

const sparkles = [
  { symbol: "✦", className: "sparkle sparkle-1" },
  { symbol: "✧", className: "sparkle sparkle-2" },
  { symbol: "✿", className: "sparkle sparkle-3" },
  { symbol: "✦", className: "sparkle sparkle-4" },
  { symbol: "♡", className: "sparkle sparkle-5" },
  { symbol: "✧", className: "sparkle sparkle-6" },
];

function App() {
  const [stage, setStage] = useState<GameStage>("intro");
  const [imageFailed, setImageFailed] = useState(false);

  const scene = scenes[stage];
  const isIntro = stage === "intro";
  const isFinal = stage === "final";

  // Выбираем изображение в зависимости от этапа открытки.
  const imageSrc = isIntro
    ? "/images/character.png"
    : isFinal
      ? "/images/congratulation.png"
      : "/images/wow.png";

  const imageAlt = isIntro
    ? "Персонаж на заставке"
    : isFinal
      ? "Поздравительная иллюстрация"
      : "Персонаж во время диалога";

  function changeStage(next: GameStage) {
    // Сбрасываем ошибку при смене изображения.
    if (
      (stage === "intro" && next !== "intro") ||
      (next === "final" && stage !== "final")
    ) {
      setImageFailed(false);
    }

    setStage(next);
  }

  // Обработка основной кнопки.
  function handlePrimaryAction() {
    if (stage === "intro") {
      changeStage("confident");
      return;
    }

    const next = nextStage[stage];

    if (next) {
      changeStage(next);
    }
  }

  // Обработка второй кнопки на стартовом экране.
  function handleSecondaryAction() {
    if (stage === "intro") {
      changeStage("unsure");
    }
  }

  return (
    <main
      className={`card-page ${isFinal ? "card-page-final" : ""}`}
    >
      <div className="background-glow" aria-hidden="true" />

      {/* Декоративные эффекты показываем только в финале. */}
      {isFinal &&
        sparkles.map((sparkle) => (
          <span
            key={sparkle.className}
            className={sparkle.className}
            aria-hidden="true"
          >
            {sparkle.symbol}
          </span>
        ))}

      <section
        className={`card ${isFinal ? "card-final" : ""}`}
      >
        <div className="card-decoration" aria-hidden="true">
          <span>♡</span>
          <span>✧</span>
          <span>♡</span>
        </div>

        {/* Изображение меняется только при переходе
            между заставкой, диалогом и финалом. */}
        <div className="character-container">
          {imageFailed ? (
            <div
              className="character-placeholder"
              role="img"
              aria-label={imageAlt}
            >
              {isIntro ? "🎁" : isFinal ? "🎂🎉" : "✨"}
            </div>
          ) : (
            <img
              key={imageSrc}
              className={`character ${
                isFinal ? "character-final" : ""
              }`}
              src={imageSrc}
              alt={imageAlt}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>

        {/* При переходе обновляются текст и кнопки,
            а карточка сохраняет своё оформление. */}
        <div className="card-text" key={stage}>
          <h1>{scene.question}</h1>
          <p>{scene.description}</p>
        </div>

        {!isFinal && (
          <div className="buttons" key={`buttons-${stage}`}>
            {isIntro ? (
              <>
                <button
                  className="answer-button primary-button"
                  onClick={handlePrimaryAction}
                >
                  Я!!! 🎉
                </button>

                <button
                  className="answer-button secondary-button"
                  onClick={handleSecondaryAction}
                >
                  А что, есть варианты?
                </button>
              </>
            ) : (
              <button
                className="answer-button primary-button"
                onClick={handlePrimaryAction}
              >
                {scene.buttonLabel}
              </button>
            )}
          </div>
        )}

        {isFinal && (
          <div className="final-actions">
            <span
              className="final-heart"
              aria-hidden="true"
            >
              ♥
            </span>
          </div>
        )}
      </section>

      <footer className="card-footer">
        Сделано с любовью{" "}
        <span aria-hidden="true">♥</span>
      </footer>
    </main>
  );
}

export default App;
