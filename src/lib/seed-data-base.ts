import { DatabaseSync } from "node:sqlite";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "bookstore.db");
const db = new DatabaseSync(dbPath);

// تنظیمات PRAGMA
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

// ایجاد کاربر تستی پیش‌فرض
const userStmt = db.prepare(`
  INSERT OR IGNORE INTO users (id, name, email, password, role)
  VALUES (1, 'Test User', 'test@test.com', '123456', 'user')
`);
userStmt.run();

// لیست کتاب‌ها همراه با موجودی (stock) و ترجمه‌ها
const booksSeedData = [
  {
    id: 1,
    price: 250000,
    stock: 15,
    image_url: "/images/jonathan-livingston-seagull.jpg",
    translations: [
      {
        language_code: "fa",
        title: "جاناتان مرغ دریایی",
        author: "ریچارد باخ",
        description:
          "داستانی تمثیلی و الهام‌بخش درباره مرغ دریایی متفاوتی که به دنبال پروازی فراتر از روزمرگی و یافتن معنای واقعی آزادی و کمال است.",
      },
      {
        language_code: "en",
        title: "Jonathan Livingston Seagull",
        author: "Richard Bach",
        description:
          "An inspiring allegorical tale about a unique seagull who seeks flight beyond the ordinary, searching for the true meaning of freedom and perfection.",
      },
    ],
  },
  {
    id: 2,
    price: 300000,
    stock: 8,
    image_url: "/images/thus-spoke-zarathustra.jpg",
    translations: [
      {
        language_code: "fa",
        title: "چنین گفت زرتشت",
        author: "فریدریش نیچه",
        description:
          "شاهکار فلسفی و شاعرانه نیچه که در آن مفاهیم عمیقی چون ابرانسان، اراده معطوف به قدرت و بازگشت جاودانه تبیین می‌شوند.",
      },
      {
        language_code: "en",
        title: "Thus Spoke Zarathustra",
        author: "Friedrich Nietzsche",
        description:
          "Nietzsche's philosophical masterpiece outlining key concepts such as the Übermensch, will to power, and eternal recurrence.",
      },
    ],
  },
  {
    id: 3,
    price: 210000,
    stock: 10,
    image_url: "/images/no-mud-no-lotus.jpg",
    translations: [
      {
        language_code: "fa",
        title: "نیلوفر و مرداب",
        author: "تیک نات هان",
        description:
          "آموزه‌هایی در باب هنر دگرگون کردن رنج و تبدیل آن به آرامش و شادمانی به قلم استاد برجسته ذن.",
      },
      {
        language_code: "en",
        title: "No Mud, No Lotus",
        author: "Thich Nhat Hanh",
        description:
          "The art of transforming suffering into peace and joy by a world-renowned Zen master.",
      },
    ],
  },
  {
    id: 4,
    price: 280000,
    stock: 5,
    image_url: "/images/On-the-Wisdom-of-Life.jpg",
    translations: [
      {
        language_code: "fa",
        title: "درباب حکمت زندگی",
        author: "آرتور شوپنهاور",
        description:
          "رساله‌ای درخشان در فلسفه عملی که به بررسی عوامل موثر بر سعادت و خوشبختی درون انسان می‌پردازد.",
      },
      {
        language_code: "en",
        title: "The Wisdom of Life",
        author: "Arthur Schopenhauer",
        description:
          "A brilliant treatise in practical philosophy exploring factors contributing to human happiness.",
      },
    ],
  },
  {
    id: 5,
    price: 450000,
    stock: 12,
    image_url: "/images/Brothers-Karamazov.jpg",
    translations: [
      {
        language_code: "fa",
        title: "برادران کارامازوف",
        author: "فئودور داستایفسکی",
        description:
          "رمانی حماسی و روان‌شناختی که با روایت درگیری‌های سه برادر، به عمیق‌ترین پرسش‌های بشری می‌پردازد.",
      },
      {
        language_code: "en",
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        description:
          "An epic psychological novel delving into humanity's deepest questions about faith, morality, and redemption.",
      },
    ],
  },
  {
    id: 6,
    price: 220000,
    stock: 10,
    image_url: "/images/Women-Who-Run-With-the-Wolves.jpg",
    translations: [
      {
        language_code: "fa",
        title: "زنانی که با گرگ ها می دوند",
        author: "کلاریسا پینکولا استس",
        description:
          "اثری روان‌کاوانه برای بیداری غریزه، خلاقیت و قدرت کهن‌الگوی زن وحشی.",
      },
      {
        language_code: "en",
        title: "Women Who Run With the Wolves",
        author: "Clarissa Pinkola Estés",
        description:
          "A psychoanalytic work on myths and stories to rediscover the female instinctual nature.",
      },
    ],
  },
  {
    id: 7,
    price: 180000,
    stock: 0, // کتاب ناموجود برای تست نمایش در فرانت‌اند
    image_url: "/images/snow-in-summer.jpg",
    translations: [
      {
        language_code: "fa",
        title: "برف در تابستان",
        author: "سایاداو او جوتیکا",
        description:
          "کتابی سرشار از خرد و آرامش در قالب نامه‌هایی از یک راهب بودایی در باب رهایی و زندگی در لحظه.",
      },
      {
        language_code: "en",
        title: "Snow in the Summer",
        author: "Sayadaw U Jotika",
        description:
          "A collection of letters by a Buddhist monk exploring freedom of mind and living mindfully.",
      },
    ],
  },
  {
    id: 8,
    price: 270000,
    stock: 14,
    image_url: "/images/meditation.jpg",
    translations: [
      {
        language_code: "fa",
        title: "تاملات",
        author: "مارکوس اورلیوس",
        description:
          "یادداشت‌های درونی امپراتور رواقی درباره آرامش ذهن و انجام وظیفه اخلاقی.",
      },
      {
        language_code: "en",
        title: "Meditations",
        author: "Marcus Aurelius",
        description:
          "Personal writings of the Roman Emperor setting forth private notes on Stoic philosophy.",
      },
    ],
  },
  {
    id: 9,
    price: 210000,
    stock: 7,
    image_url: "/images/gravity-and-grace.jpg",
    translations: [
      {
        language_code: "fa",
        title: "جاذبه و رحمت",
        author: "سیمون ویل",
        description:
          "مجموعه تاملات فیلسوف و عارف فرانسوی پیرامون تقابل کشش‌های مادی و نور رحمت.",
      },
      {
        language_code: "en",
        title: "Gravity and Grace",
        author: "Simone Weil",
        description:
          "Philosophical and mystical notes on the tension between material gravity and divine grace.",
      },
    ],
  },
  {
    id: 10,
    price: 290000,
    stock: 9,
    image_url: "/images/guide-to-good-life.jpg",
    translations: [
      {
        language_code: "fa",
        title: "فلسفه ای برای زندگی",
        author: "ویلیام بی. اروین",
        description:
          "راهنمای کاربردی برای به‌کارگیری مکتب رواقی در کاهش اضطراب و کسب آرامش در زندگی معاصر.",
      },
      {
        language_code: "en",
        title: "A Guide to the Good Life",
        author: "William B. Irvine",
        description:
          "Practical insights from ancient Stoicism to achieve tranquility and joy in modern life.",
      },
    ],
  },
  {
    id: 11,
    price: 150000,
    stock: 4,
    image_url: "/images/repetition.jpg",
    translations: [
      {
        language_code: "fa",
        title: "تکرار",
        author: "سورن کیرکگارد",
        description:
          "جستاری روان‌شناختی و اگزیستانسیال در باب امکان‌پذیری حرکت به سوی آینده و تجربه تکرار.",
      },
      {
        language_code: "en",
        title: "Repetition",
        author: "Søren Kierkegaard",
        description:
          "An essay exploring existential movement, recollection, and the forward progress of life.",
      },
    ],
  },
  {
    id: 12,
    price: 260000,
    stock: 11,
    image_url: "/images/fear-and-trembling.jpg",
    translations: [
      {
        language_code: "fa",
        title: "ترس و لرز",
        author: "سورن کیرکگارد",
        description:
          "تحلیلی عمیق درباره ماهیت ایمان، تعلیق امر اخلاقی و اضطراب انتخاب‌های انسانی.",
      },
      {
        language_code: "en",
        title: "Fear and Trembling",
        author: "Søren Kierkegaard",
        description:
          "A profound examination of faith, moral dilemmas, and the leap into the absolute.",
      },
    ],
  },
];

const seedBooksData = () => {
  const insertBookStmt = db.prepare(`
    INSERT OR IGNORE INTO books (id, price, image_url, views, stock, created_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);

  const insertTranslationStmt = db.prepare(`
    INSERT OR IGNORE INTO translations (book_id, language_code, title, author, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  db.exec("BEGIN TRANSACTION;");

  try {
    for (const book of booksSeedData) {
      insertBookStmt.run(book.id, book.price, book.image_url, 0, book.stock);

      for (const translation of book.translations) {
        insertTranslationStmt.run(
          book.id,
          translation.language_code,
          translation.title,
          translation.author,
          translation.description,
        );
      }
    }

    db.exec("COMMIT;");
    console.log("Books and translations seeded successfully.");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }
};

try {
  seedBooksData();
} catch (error) {
  const msg = error instanceof Error ? error.message : String(error);
  console.error("Error seeding database:", msg);
} finally {
  const count = db.prepare("SELECT COUNT(*) as count FROM books").get();
  console.log("Total books in DB:", count);
  db.close();
}
