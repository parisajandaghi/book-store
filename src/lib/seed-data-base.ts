import { DatabaseSync } from "node:sqlite";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "bookstore.db");

// اتصال به دیتابیس با node:sqlite
const db = new DatabaseSync(dbPath);

// اجرای تنظیمات PRAGMA با متد exec
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

const booksSeedData = [
  {
    id: 1,
    price: 250000,
    image_url: "/images/jonathan-livingston-seagull.jpg",
    translations: [
      {
        language_code: "fa",
        title: "جاناتان مرغ دریایی",
        author: "ریچارد باخ",
        description: "داستانی تمثیلی و الهام‌بخش درباره مرغ دریایی متفاوتی که به دنبال پروازی فراتر از روزمرگی و یافتن معنای واقعی آزادی و کمال است. این کتاب به ما می‌آموزد که محدودیت‌ها تنها در ذهن ما قرار دارند.",
      },
      {
        language_code: "en",
        title: "Jonathan Livingston Seagull",
        author: "Richard Bach",
        description: "An inspiring allegorical tale about a unique seagull who seeks flight beyond the ordinary, searching for the true meaning of freedom and perfection. It teaches us that limitations exist only in our minds.",
      },
    ],
  },
  {
    id: 2,
    price: 300000,
    image_url: "/images/thus-spoke-zarathustra.jpg",
    translations: [
      {
        language_code: "fa",
        title: "چنین گفت زرتشت",
        author: "فریدریش نیچه",
        description: "شاهکار فلسفی و شاعرانه نیچه که در آن مفاهیم عمیقی چون «ابرانسان»، «مرگ خدا» و «بازگشت جاودان» از زبان پیامبری باستانی روایت می‌شود. اثری که پایه‌های تفکر مدرن را به چالش می‌کشد.",
      },
      {
        language_code: "en",
        title: "Thus Spoke Zarathustra",
        author: "Friedrich Nietzsche",
        description: "Nietzsche's philosophical and poetic masterpiece, narrating profound concepts like the 'Übermensch', the 'death of God', and 'eternal recurrence' through an ancient prophet. A work challenging modern thought.",
      },
    ],
  },
  {
    id: 3,
    price: 200000,
    image_url: "/images/no-mud-no-lotus.jpg",
    translations: [
      {
        language_code: "fa",
        title: "نیلوفر و مرداب",
        author: "تیچ نات هان", 
        description: "راهنمایی آرامش‌بخش از یک استاد ذن که به ما نشان می‌دهد چگونه از رنج‌ها و دردهای زندگی برای رشد و شکوفایی استفاده کنیم، همان‌طور که گل نیلوفر برای روییدن به گل و لای مرداب نیاز دارد.",
      },
      {
        language_code: "en",
        title: "No Mud, No Lotus",
        author: "Thich Nhat Hanh",
        description: "A calming guide by a Zen master showing us how to transform suffering and pain into personal growth and flourishing, just as a lotus flower needs the mud of the swamp to bloom.",
      },
    ],
  },
  {
    id: 4,
    price: 280000,
    image_url: "/images/On-the-Wisdom-of-Life.jpg",
    translations: [
      {
        language_code: "fa",
        title: "درباب حکمت زندگی",
        author: "آرتور شوپنهاور",
        description: "رساله‌ای درخشان در فلسفه عملی که شوپنهاور در آن به بررسی عوامل موثر بر سعادت و خوشبختی انسان می‌پردازد. او اهمیت غنای درونی را بر ثروت و جایگاه اجتماعی برتری می‌دهد.",
      },
      {
        language_code: "en",
        title: "The Wisdom of Life",
        author: "Arthur Schopenhauer",
        description: "A brilliant treatise in practical philosophy where Schopenhauer explores the factors contributing to human happiness. He emphasizes the importance of inner wealth over material riches and social status.",
      },
    ],
  },
  {
    id: 5,
    price: 450000,
    image_url: "/images/Brothers-Karamazov.jpg",
    translations: [
      {
        language_code: "fa",
        title: "برادران کارامازوف",
        author: "فئودور داستایفسکی",
        description: "رمانی حماسی و روان‌شناختی که با روایت درگیری‌های سه برادر، به عمیق‌ترین پرسش‌های بشری درباره ایمان، اراده آزاد، گناه و رستگاری می‌پردازد. این اثر نقطه اوج ادبیات کلاسیک روسیه است.",
      },
      {
        language_code: "en",
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        description: "An epic psychological novel that, through the conflicts of three brothers, delves into humanity's deepest questions about faith, free will, guilt, and redemption. The pinnacle of classic Russian literature.",
      },
    ],
  },
  {
    id: 6,
    price: 220000,
    image_url: "/images/Women-Who-Run-With-the-Wolves.jpg",
    translations: [
      {
        language_code: "fa",
        title: "زنانی که با گرگ ها می دوند",
        author: "کلاریسا پینکولا استس",
        description: "اثری روان‌کاوانه که با واکاوی افسانه‌ها و اسطوره‌های ملل مختلف، به بازشناسی کهن‌الگوی «زن وحشی» می‌پردازد. کتابی برای بیداری غریزه، خلاقیت و قدرت درونی زنان در دنیای مدرن.",
      },
      {
        language_code: "en",
        title: "Women Who Run With the Wolves",
        author: "Clarissa Pinkola Estés",
        description: "A psychoanalytic work that explores myths and fairy tales across cultures to rediscover the 'Wild Woman' archetype. A book for awakening female instinct, creativity, and inner power in the modern world.",
      },
    ],
  },
  {
    id: 7,
    price: 180000,
    image_url: "/images/snow-in-summer.jpg",
    translations: [
      {
        language_code: "fa",
        title: "برف در تابستان",
        author: "سایاداو او جوتیکا", 
        description: "کتابی سرشار از خرد و آرامش که به صورت نامه‌هایی از یک راهب بودایی نوشته شده است. این اثر دعوتی است به زیستن در لحظه حال، درک عمیق زندگی و رهایی از وابستگی‌های ذهنی.",
      },
      {
        language_code: "en",
        title: "Snow in the Summer",
        author: "Sayadaw U Jotika",
        description: "A book full of wisdom and peace, written as letters from a Buddhist monk. This work is an invitation to live in the present moment, deeply understand life, and let go of mental attachments.",
      },
    ],
  },
  {
    id: 8,
    price: 270000,
    image_url: "/images/meditation.jpg",
    translations: [
      {
        language_code: "fa",
        title: "تاملات",
        author: "مارکوس اورلیوس",
        description: "یادداشت‌های شخصی و تأملات درونی یک امپراتور قدرتمند رومی که بر پایه مکتب رواقی‌گری نوشته شده است. راهنمایی عملی برای حفظ آرامش ذهن، انجام وظیفه و مواجهه با چالش‌های زندگی.",
      },
      {
        language_code: "en",
        title: "Meditations",
        author: "Marcus Aurelius",
        description: "The personal journal and inner reflections of a powerful Roman Emperor, grounded in Stoic philosophy. A practical guide for maintaining mental tranquility, fulfilling duty, and facing life's challenges.",
      },
    ],
  },
  {
    id: 9,
    price: 210000,
    image_url: "/images/gravity-and-grace.jpg",
    translations: [
      {
        language_code: "fa",
        title: "جاذبه و رحمت",
        author: "سیمون ویل",
        description: "مجموعه‌ای از یادداشت‌های درخشان و تکان‌دهنده یک فیلسوف و عارف فرانسوی. او در این کتاب به تقابل «جاذبه» (نیروهای مادی و نفسانی) و «رحمت» (نور الهی و رهایی) در وجود انسان می‌پردازد.",
      },
      {
        language_code: "en",
        title: "Gravity and Grace",
        author: "Simone Weil",
        description: "A collection of brilliant and moving notes by a French philosopher and mystic. The book explores the conflict between 'gravity' (material and egoic forces) and 'grace' (divine light and liberation) in human existence.",
      },
    ],
  },
  {
    id: 10,
    price: 290000,
    image_url: "/images/guide-to-good-life.jpg",
    translations: [
      {
        language_code: "fa",
        title: "فلسفه ای برای زندگی",
        author: "ویلیام بی. اروین",
        description: "بازآفرینی جذاب و کاربردی مکتب رواقی‌گری برای دنیای امروز. نویسنده تکنیک‌هایی عملی ارائه می‌دهد تا با کاهش اضطراب و نارضایتی، به آرامش روانی و شادی پایدار در زندگی دست یابیم.",
      },
      {
        language_code: "en",
        title: "A Guide to the Good Life",
        author: "William B. Irvine",
        description: "A fascinating and practical reinvention of Stoicism for the modern world. The author offers practical techniques to reduce anxiety and dissatisfaction, helping us achieve mental tranquility and lasting joy.",
      },
    ],
  },
  {
    id: 11,
    price: 150000,
    image_url: "/images/repetition.jpg",
    translations: [
      {
        language_code: "fa",
        title: "تکرار",
        author: "سورن کیرکگارد",
        description: "اثری پیچیده و نوآورانه از پدر اگزیستانسیالیسم که مفهوم «تکرار» را در برابر «یادآوری» یونانی قرار می‌دهد. جستاری روان‌شناختی در باب عشق، انتخاب و امکان‌پذیری حرکت به سوی آینده.",
      },
      {
        language_code: "en",
        title: "Repetition",
        author: "Søren Kierkegaard",
        description: "A complex and innovative work by the father of existentialism, contrasting the concept of 'repetition' with Greek 'recollection'. A psychological essay on love, choice, and moving towards the future.",
      },
    ],
  },
  {
    id: 12,
    price: 260000,
    image_url: "/images/fear-and-trembling.jpg",
    translations: [
      {
        language_code: "fa",
        title: "ترس و لرز",
        author: "سورن کیرکگارد",
        description: "تحلیلی تکان‌دهنده از داستان ابراهیم و اسحاق که مرزهای میان اخلاق و ایمان را به چالش می‌کشد. کیرکگارد در این کتاب، اضطراب عمیق نهفته در انتخاب‌های ایمانی و جهش به سوی امر مطلق را بررسی می‌کند.",
      },
      {
        language_code: "en",
        title: "Fear and Trembling",
        author: "Søren Kierkegaard",
        description: "A profound analysis of the story of Abraham and Isaac, challenging the boundaries between ethics and faith. Kierkegaard explores the deep anxiety in faithful choices and the leap toward the absolute.",
      },
    ],
  },
];


const seedBooksData = () => {
  const insertBookStmt = db.prepare(
    `INSERT OR IGNORE INTO books (id, price, image_url, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
  );
  const insertTranslationStmt = db.prepare(
    `INSERT OR IGNORE INTO translations (book_id, language_code, title, author, description) VALUES (?, ?, ?, ?, ?)`,
  );

  // شروع تراکنش به صورت دستی
  db.exec("BEGIN TRANSACTION;");

  try {
    booksSeedData.forEach((book) => {
      insertBookStmt.run(book.id, book.price, book.image_url);

      book.translations.forEach((translation) => {
        insertTranslationStmt.run(
          book.id,
          translation.language_code,
          translation.title,
          translation.author,
          translation.description,
        );
      });
    });
    db.exec("COMMIT;");
    console.log("Books and their translations seeded successfully.");
  } catch (error) {
    // در صورت بروز خطا، همه تغییرات لغو می‌شوند
    db.exec("ROLLBACK;");
    throw error; // خطا را به بیرون می‌فرستیم تا در بلاک اصلی لاگ شود
  }
};

try {
  // حتما مطمئن شوید که اول db.ts یک بار اجرا شده و جداول ساخته شده‌اند
  seedBooksData();
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error("Error seeding books table:", errorMessage);
} finally {
  db.close();
  console.log("Database connection closed.");
}
