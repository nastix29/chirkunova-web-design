// Скрипт подключён с defer: HTML уже разобран, элементы доступны.

const root = document.documentElement;

// Класс js сообщает стилям, что скрипт загрузился
root.classList.add("js");

/* ===== Данные ===== */

const districts = [
  {
    id: "queens",
    color: "#5aaae0",
    name: "Куинс",
    x: 272,
    y: 184,
    note: "Дом, школа и первая работа.",
    entries: [
      { type: "Образование", title: "Мидтаунская школа науки и технологий", text: "Победитель научных ярмарок, команда академического десятиборья." },
      { type: "Опыт", title: "Доставщик пиццы", text: "Научился планировать маршрут и понял, что дороги не всегда самый быстрый путь." },
      { type: "Проект", title: "Помощь соседям", text: "Снятые с деревьев коты, возвращённые велосипеды, донесённые сумки." }
    ],
    events: ["вернул велосипед владельцу", "снял кота с дерева", "подсказал дорогу туристам"]
  },
  {
    id: "manhattan",
    color: "#a99bdc",
    name: "Манхэттен",
    x: 172,
    y: 70,
    note: "Работа, учёба и лучшие виды на город.",
    entries: [
      { type: "Опыт", title: "Фотограф-фрилансер, «Дейли Бьюгл»", text: "Репортажная съёмка городских происшествий. Кадры приходят раньше всех." },
      { type: "Образование", title: "Университет Эмпайр-Стейт, биофизика", text: "Курсовые по свойствам белковых волокон. Параллельно лаборант-исследователь." },
      { type: "Проект", title: "Серия «Город сверху»", text: "Панорамы с точек, куда не пускают экскурсии." }
    ],
    events: ["остановил угон такси", "сделал кадр для первой полосы", "поймал падающую люльку мойщика окон"]
  },
  {
    id: "brooklyn",
    color: "#cfc7b6",
    name: "Бруклин",
    x: 288,
    y: 332,
    note: "Мосты, доки и ночные смены.",
    entries: [
      { type: "Проект", title: "Ночной патруль", text: "Собственный маршрут обхода по заявкам жителей. Время реакции: с десяти минут до двух." },
      { type: "Проект", title: "Формула паутинной жидкости", text: "Полимер, который держит большие нагрузки и растворяется через два часа." }
    ],
    events: ["проверил доки", "разнял драку у моста", "помог заглохшему автобусу"]
  },
  {
    id: "bronx",
    color: "#f0a05c",
    name: "Бронкс",
    x: 240,
    y: 52,
    note: "Полигон для испытаний снаряжения.",
    entries: [
      { type: "Проект", title: "Веб-шутеры, версия 3", text: "Вес меньше на треть, быстрая смена картриджей. Испытаны на местных крышах." },
      { type: "Опыт", title: "Волонтёр спортивной школы", text: "Показывает акробатику и объясняет, почему физика важнее мышц." }
    ],
    events: ["испытал новые картриджи", "вернул мяч со стадионной крыши", "проводил школьников через перекрёсток"]
  },
  {
    id: "staten",
    color: "#ee93b5",
    name: "Статен-Айленд",
    x: 104,
    y: 330,
    note: "Сюда добираются на пароме. Или иначе.",
    entries: [
      { type: "Проект", title: "Патруль паромной переправы", text: "Дежурство в часы пик и помощь пассажирам." }
    ],
    events: ["встретил утренний паром", "нашёл потерянный рюкзак", "помог рыбакам вытащить лодку"]
  }
];

const skills = {
  sense: { title: "Паучье чутьё", level: 98, text: "Предупреждает об опасности за доли секунды. На экзамены, к сожалению, не распространяется." },
  grip: { title: "Цепкость", level: 95, text: "Удерживается на стекле, бетоне и потолке. Лифт нужен только с пакетами из магазина." },
  strength: { title: "Сила и акробатика", level: 92, text: "Останавливает автобус и приземляется на флагшток. Главное рассчитать усилие." },
  web: { title: "Паутина", level: 90, text: "Собственная формула и веб-шутеры. Перемещение, страховка и аккуратная упаковка нарушителей." }
};

const villains = [
  { name: "Зелёный Гоблин", weakness: "Слабость: Норман Озборн", text: "Безумный гений на глайдере. Опасен на расстоянии и в ближнем бою.", threat: 5, district: "manhattan" },
  { name: "Доктор Осьминог", weakness: "Слабость: механические щупальца", text: "Гениальный учёный с четырьмя механическими конечностями. Невероятная сила.", threat: 5, district: "manhattan" },
  { name: "Веном", weakness: "Слабость: звук и огонь", text: "Инопланетный симбиот, усиливающий агрессию носителя. Почти неуязвим.", threat: 4, district: "brooklyn" },
  { name: "Электро", weakness: "Слабость: изоляция", text: "Живой электрический разряд. Может вырубить целый квартал.", threat: 4, district: "queens" },
  { name: "Скорпион", weakness: "Слабость: броня", text: "Кибернетический охотник с ядовитым хвостом. Работает на заказ.", threat: 3, district: "bronx" },
  { name: "Мистерио", weakness: "Слабость: иллюзии", text: "Мастер спецэффектов и гипноза. Реальность под вопросом.", threat: 3, district: "staten" }
];

// Маленький помощник: создаёт элемент с классом и текстом.
// Текст всегда вставляется через textContent, а не innerHTML.
function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function getDistrict(id) {
  return districts.find((district) => district.id === id);
}

/* ===== 0. Картинки ===== */

// Если файла нет в папке images, убираем картинку, чтобы не было «битой» иконки
function handleMissingPicture(picture) {
  const frame = picture.closest(".comic-strip, .poster");

  if (frame) {
    frame.classList.add("is-empty");
  }

  picture.remove();
}

for (const picture of document.querySelectorAll(".pic")) {
  // Картинка могла не загрузиться ещё до запуска скрипта
  if (picture.complete && picture.naturalWidth === 0) {
    handleMissingPicture(picture);
  } else {
    picture.addEventListener("error", () => handleMissingPicture(picture));
  }
}

// Фигура на нити появляется, только когда её файл загрузился
const threadFigure = document.querySelector(".thread__figure");

function markThreadFigure() {
  document.querySelector(".thread").classList.add("has-figure");
}

if (threadFigure && threadFigure.complete && threadFigure.naturalWidth > 0) {
  markThreadFigure();
} else if (threadFigure) {
  threadFigure.addEventListener("load", markThreadFigure);
}

/* ===== 1. Выключатель света ===== */

const THEME_KEY = "board-light";
const themeToggle = document.querySelector("#themeToggle");

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Хранилище недоступно: страница работает, просто ничего не запомнит
  }
}

function setLight(isOn) {
  root.setAttribute("data-theme", isOn ? "light" : "dark");
  themeToggle.textContent = isOn ? "Выключить свет" : "Включить свет";
  themeToggle.setAttribute("aria-pressed", String(!isOn));
}

setLight(readStorage(THEME_KEY) !== "off");

themeToggle.addEventListener("click", () => {
  const isOn = root.getAttribute("data-theme") === "dark";

  setLight(isOn);
  writeStorage(THEME_KEY, isOn ? "on" : "off");
});

/* ===== 2. Мобильное меню ===== */

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

function setMenuOpen(isOpen) {
  nav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

for (const link of nav.querySelectorAll(".nav__link")) {
  link.addEventListener("click", () => setMenuOpen(false));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

/* ===== 3. Паук на нити: индикатор прокрутки ===== */

function updateThread() {
  const scrollable = root.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

  root.style.setProperty("--progress", progress.toFixed(3));
}

window.addEventListener("scroll", updateThread, { passive: true });
window.addEventListener("resize", updateThread);
updateThread();

/* ===== 4. Досье: точки-навыки ===== */

const hotspots = document.querySelectorAll(".mark");
const skillTitle = document.querySelector("#skillTitle");
const skillText = document.querySelector("#skillText");
const skillMeter = document.querySelector("#skillMeter");
const skillLevel = document.querySelector("#skillLevel");

function showSkill(id) {
  const skill = skills[id];

  skillTitle.textContent = skill.title;
  skillText.textContent = skill.text;
  skillLevel.textContent = `Уровень: ${skill.level} из 100`;
  skillMeter.style.width = `${skill.level}%`;

  for (const hotspot of hotspots) {
    hotspot.classList.toggle("is-active", hotspot.dataset.skill === id);
  }
}

for (const hotspot of hotspots) {
  hotspot.addEventListener("click", () => showSkill(hotspot.dataset.skill));
}

showSkill("sense");

/* ===== 5. Карта районов ===== */

const districtPaths = document.querySelectorAll(".district");
const districtTabs = document.querySelector("#districtTabs");
const districtCard = document.querySelector("#districtCard");
const districtSelect = document.querySelector("#userDistrict");

function renderDistrictCard(district) {
  const fragment = document.createDocumentFragment();

  fragment.append(
    createElement("h3", "card__name", district.name),
    createElement("p", "card__note", district.note)
  );

  for (const entry of district.entries) {
    const item = createElement("div", "entry");

    item.append(
      createElement("p", "entry__type", entry.type),
      createElement("h4", "entry__title", entry.title),
      createElement("p", "entry__text", entry.text)
    );
    fragment.append(item);
  }

  districtCard.replaceChildren(fragment);
}

function selectDistrict(id) {
  const district = getDistrict(id);

  for (const path of districtPaths) {
    path.classList.toggle("is-active", path.dataset.district === id);
  }

  for (const tab of districtTabs.children) {
    const isCurrent = tab.dataset.district === id;

    tab.classList.toggle("is-active", isCurrent);
    tab.setAttribute("aria-pressed", String(isCurrent));
  }

  renderDistrictCard(district);
  districtSelect.value = id;
}

// Пользователь выбрал район сам: показываем карточку и отправляем туда паука
function chooseDistrict(id) {
  selectDistrict(id);
  sendPatrolTo(getDistrict(id));
}

// Кнопки районов и пункты списка в форме строятся из одного массива
for (const district of districts) {
  const tab = createElement("button", "tab", district.name);
  tab.type = "button";
  tab.dataset.district = district.id;
  tab.style.setProperty("--chip", district.color);
  tab.addEventListener("click", () => chooseDistrict(district.id));
  districtTabs.append(tab);

  const option = createElement("option", "", district.name);
  option.value = district.id;
  districtSelect.append(option);
}

// Районы на схеме работают как кнопки: мышью, касанием и с клавиатуры
for (const path of districtPaths) {
  const district = getDistrict(path.dataset.district);

  path.setAttribute("tabindex", "0");
  path.setAttribute("role", "button");
  path.setAttribute("aria-label", district.name);

  path.addEventListener("click", () => chooseDistrict(district.id));
  path.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseDistrict(district.id);
    }
  });
}

selectDistrict("queens");

// Кнопки «на карте» в разделе образования ведут к нужному району
for (const button of document.querySelectorAll("[data-goto]")) {
  button.addEventListener("click", () => {
    chooseDistrict(button.dataset.goto);
    document.querySelector("#map").scrollIntoView();
  });
}

/* ===== 6. Патруль: красная нить и журнал ===== */

const PATROL_DELAY = 6000;
const LOG_LIMIT = 5;
const THREAD_LIMIT = 4;
const SVG_NS = "http://www.w3.org/2000/svg";

const threadLine = document.querySelector("#threadLine");
const mapPins = document.querySelector("#mapPins");
const patrolLog = document.querySelector("#patrolLog");
const patrolToggle = document.querySelector("#patrolToggle");
const patrolState = document.querySelector("#patrolState");
const heroPlace = document.querySelector("#heroPlace");
const mapPlace = document.querySelector("#mapPlace");

let currentPlace = getDistrict("queens");
let route = [];
let patrolTimerId = null;

// В каждый район воткнута кнопка. SVG-элементы создаются через createElementNS
for (const district of districts) {
  const pin = document.createElementNS(SVG_NS, "g");
  pin.setAttribute("class", "map-pin");
  pin.dataset.district = district.id;

  const shadow = document.createElementNS(SVG_NS, "circle");
  shadow.setAttribute("cx", district.x + 2);
  shadow.setAttribute("cy", district.y + 3);
  shadow.setAttribute("r", 6);

  const head = document.createElementNS(SVG_NS, "circle");
  head.setAttribute("cx", district.x);
  head.setAttribute("cy", district.y);
  head.setAttribute("r", 6);

  pin.append(shadow, head);
  mapPins.append(pin);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function formatTime(date) {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function addLogLine(text, isSignal = false) {
  const line = createElement("li", isSignal ? "is-signal" : "", `${formatTime(new Date())} ${text}`);

  patrolLog.prepend(line);

  // В журнале остаются только последние записи
  while (patrolLog.children.length > LOG_LIMIT) {
    patrolLog.lastElementChild.remove();
  }
}

function moveTo(district) {
  currentPlace = district;
  heroPlace.textContent = district.name;
  mapPlace.textContent = district.name;

  // Нить тянется через последние посещённые районы
  route.push(district);
  route = route.slice(-THREAD_LIMIT);
  threadLine.setAttribute("points", route.map((place) => `${place.x},${place.y}`).join(" "));

  for (const pin of mapPins.children) {
    pin.classList.toggle("is-current", pin.dataset.district === district.id);
  }
}

function patrolStep() {
  // Следующий район всегда отличается от текущего
  const others = districts.filter((district) => district.id !== currentPlace.id);
  const next = pickRandom(others);

  moveTo(next);
  addLogLine(`${next.name}: ${pickRandom(next.events)}`);
}

// Вызов с карты: паук перемещается в выбранный район,
// а таймер запускается заново, чтобы он не уехал оттуда сразу же
function sendPatrolTo(district) {
  if (district.id !== currentPlace.id) {
    moveTo(district);
    addLogLine(`${district.name}: вызов с карты, уже на месте`);
  }

  if (patrolTimerId !== null) {
    clearInterval(patrolTimerId);
    patrolTimerId = setInterval(patrolStep, PATROL_DELAY);
  }
}

function startPatrol() {
  if (patrolTimerId !== null) return;

  patrolTimerId = setInterval(patrolStep, PATROL_DELAY);
  patrolState.textContent = "· идёт";
  patrolToggle.textContent = "остановить";
  patrolToggle.setAttribute("aria-pressed", "false");
}

function stopPatrol() {
  clearInterval(patrolTimerId);
  patrolTimerId = null;
  patrolState.textContent = "· на паузе";
  patrolToggle.textContent = "продолжить";
  patrolToggle.setAttribute("aria-pressed", "true");
}

patrolToggle.addEventListener("click", () => {
  if (patrolTimerId === null) {
    startPatrol();
  } else {
    stopPatrol();
  }
});

moveTo(currentPlace);
addLogLine(`${currentPlace.name}: вышел на патруль`);
startPatrol();

/* ===== 7. Папки с делами ===== */

const villainTabs = document.querySelector("#villainTabs");
const villainCard = document.querySelector("#villainCard");

function renderThreat(level) {
  const threat = createElement("p", "threat");

  threat.append(createElement("span", "", "Угроза"));

  for (let index = 1; index <= 5; index += 1) {
    threat.append(createElement("i", index <= level ? "is-on" : ""));
  }

  threat.setAttribute("aria-label", `Уровень угрозы: ${level} из 5`);
  return threat;
}

function showVillain(index) {
  const villain = villains[index];
  const district = getDistrict(villain.district);

  const link = createElement("button", "sheet__link", `на карте: ${district.name}`);
  link.type = "button";
  link.addEventListener("click", () => {
    selectDistrict(district.id);
    document.querySelector("#map").scrollIntoView();
  });

  villainCard.replaceChildren(
    createElement("p", "sheet__num", `Дело № ${String(index + 1).padStart(3, "0")}`),
    createElement("h3", "sheet__name", villain.name),
    createElement("p", "sheet__weak", villain.weakness),
    createElement("p", "sheet__text", villain.text),
    renderThreat(villain.threat),
    createElement("p", "sheet__stamp", villain.threat >= 5 ? "Особо опасен" : "В розыске"),
    link
  );

  for (const tab of villainTabs.children) {
    const isCurrent = Number(tab.dataset.index) === index;

    tab.classList.toggle("is-active", isCurrent);
    tab.setAttribute("aria-pressed", String(isCurrent));
  }
}

villains.forEach((villain, index) => {
  const tab = createElement("button", "folder-tab", villain.name);
  tab.type = "button";
  tab.dataset.index = String(index);
  tab.addEventListener("click", () => showVillain(index));
  villainTabs.append(tab);
});

showVillain(0);

/* ===== 8. Записки на доске ===== */

const NOTES_KEY = "board-notes";
const NOTES_LIMIT = 6;
const counter = document.querySelector("#counter");
const notesList = document.querySelector("#notesList");

function readNotes() {
  // Сохранённый JSON может быть повреждён, поэтому разбор в try...catch
  try {
    const saved = JSON.parse(readStorage(NOTES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function renderNotes(notes) {
  const items = notes.slice(-NOTES_LIMIT).map((note, index) => {
    const district = getDistrict(note.district);
    const item = createElement("li", "sticky");

    // Записки висят немного криво, каждая под своим углом
    item.style.setProperty("--r", `${(index % 2 === 0 ? -1 : 1) * (2 + index)}deg`);
    item.append(
      createElement("b", "", district ? district.name : "Город"),
      document.createTextNode(`от: ${note.name}`)
    );
    return item;
  });

  notesList.replaceChildren(...items);
  counter.textContent = String(notes.length);
}

renderNotes(readNotes());

/* ===== 9. Появление блоков при прокрутке ===== */

const revealBlocks = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 }
  );

  for (const block of revealBlocks) {
    observer.observe(block);
  }
} else {
  for (const block of revealBlocks) {
    block.classList.add("is-visible");
  }
}

/* ===== 10. Форма сигнала ===== */

const form = document.querySelector("#signalForm");
const formStatus = document.querySelector("#formStatus");
const emailRegex = /^\S+@\S+\.\S+$/;

// Свои сообщения вместо подсказок браузера.
// Без скрипта форму проверяют атрибуты required и minlength.
form.noValidate = true;

// Чистая функция: получает значения и возвращает объект с ошибками
function validateSignal(values) {
  const errors = {};

  if (values.username.length < 2) {
    errors.username = "Введите имя, минимум 2 символа";
  }

  if (!emailRegex.test(values.email)) {
    errors.email = "Нужен адрес в формате name@example.com";
  }

  if (!getDistrict(values.district)) {
    errors.district = "Выберите район";
  }

  if (values.message.length < 10) {
    errors.message = "Опишите происшествие, минимум 10 символов";
  }

  return errors;
}

function showFieldError(field, message = "") {
  const errorElement = document.querySelector(`#${field.id}Error`);

  field.classList.toggle("is-invalid", message !== "");
  errorElement.textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const values = {
    username: String(formData.get("username")).trim(),
    email: String(formData.get("email")).trim(),
    district: String(formData.get("district")),
    message: String(formData.get("message")).trim()
  };

  const errors = validateSignal(values);

  showFieldError(form.elements.username, errors.username);
  showFieldError(form.elements.email, errors.email);
  showFieldError(form.elements.district, errors.district);
  showFieldError(form.elements.message, errors.message);

  if (Object.keys(errors).length > 0) {
    formStatus.textContent = "";
    return;
  }

  const district = getDistrict(values.district);

  // В браузере сохраняем только имя и район: почту и текст не храним
  const notes = readNotes();
  notes.push({ name: values.username, district: district.id });
  writeStorage(NOTES_KEY, JSON.stringify(notes));
  renderNotes(notes);

  // Нить на карте тянется к месту сигнала
  selectDistrict(district.id);
  moveTo(district);
  addLogLine(`${district.name}: записка от ${values.username}, выезжаю`, true);

  formStatus.textContent = `Записка приколота, ${values.username}. Район: ${district.name}. Это учебная страница, письмо никуда не уходит.`;
  form.reset();
  districtSelect.value = district.id;
});

// Ошибка исчезает, как только поле начали исправлять
form.addEventListener("input", (event) => {
  showFieldError(event.target);
});
