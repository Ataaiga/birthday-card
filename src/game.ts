
export type GameStage =
  | "intro"
  | "confident"
  | "confidentMood"
  | "unsure"
  | "unsureGift"
  | "sharedGift"
  | "sharedFinal"
  | "final";

export interface Scene {
  question: string;
  description: string;
  buttonLabel?: string;
}

export const scenes: Record<GameStage, Scene> = {
  intro: {
    question: "Так-так, у меня тут важный вопрос… Кто сегодня именинница?",
    description: "Кажется, у нас есть одна подозреваемая...",
  },

  // Ветка 1: именинница уверенно заявляет о себе.
  confident: {
    question: "Ого, какая уверенность! А доказательства будут?",
    description: "Это обязательно надо проверить...",
    buttonLabel: "У меня сегодня день рождения! 🎂",
  },

  confidentMood: {
    question: "Хорошо, принято. А где праздничное настроение?",
    description: "Почему я должна делать всю работу?",
    buttonLabel: "Я сейчас настраиваюсь 😌",
  },

  // Ветка 2: именинница делает вид, что ничего не знает.
  unsure: {
    question:
      "Так, подозрительно. Ты либо скромничаешь, либо забыла какой сегодня день.",
    description: "А день-то сегодня особенный!",
    buttonLabel: "Я просто проверяю систему!",
  },

  unsureGift: {
    question:
      "Система работает. Именинница обнаружена, уровень наглости в пределах нормы.",
    description: "Но я вижу, тебя интересует кое-что другое...",
    buttonLabel: "А подарки система выдаёт? 🎁",
  },

  // Общая сцена для обеих веток.
  sharedGift: {
    question: "Вообще-то у меня для тебя кое-что есть.",
    description:
      "Только не жми куда попало.",
    buttonLabel: "Обещаю ничего не сломать!",
  },

  sharedFinal: {
    question: "Приготовься! Одииин, двааа, два с половинкой, два и три четверти...",
    description:
      "",
    buttonLabel: "Ну давай уже!",
  },

  final: {
    question: "С днём рождения! 🎉",
    description:
      "Желаю счастья, здоровья, исполнения желаний и побольше поводов для улыбок! Пусть впереди будет много счастливых моментов, приятных сюрпризов и всего, что делает тебя по-настоящему счастливой!",
  },
};

export const nextStage: Partial<Record<GameStage, GameStage>> = {
  confident: "confidentMood",
  confidentMood: "sharedGift",

  unsure: "unsureGift",
  unsureGift: "sharedGift",

  sharedGift: "sharedFinal",
  sharedFinal: "final",
};
