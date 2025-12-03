/* Hafez Fortune Poems Database */

const poems = [
    {
        farsi: "ز لطف تو دل گر اندوهکام شده، به لطف تو این اندوه خوشی گشت",
        english: "If my heart has become sorrowful through your grace, through your grace this sorrow has become sweetness"
    },
    {
        farsi: "رب دانش و عقل، گاه موضع و صورت اندیشه‌ای بسیار زشت است",
        english: "Sometimes knowledge and reason are but ugly forms of thought"
    },
    {
        farsi: "هر که در راه عشق سر داده شود، دلیر است و بخت‌یار است",
        english: "Whoever loses their head in the path of love is brave and fortunate"
    },
    {
        farsi: "اگر دنیا بر تو ظلم کند و مال و منال برود، نگران مباش",
        english: "If the world wrongs you and your wealth is lost, do not be grieved"
    },
    {
        farsi: "خیال من و تو را در رقم آن شنیده‌ام که هر دو‌ تن هیچ شده‌ایم",
        english: "I have heard in the lore of love that both of us are nothing"
    },
    {
        farsi: "هزار شب بیدار شدم برای تو، هزار شب خواب دیدم با تو",
        english: "A thousand nights I have been awake for you, a thousand nights I have dreamed with you"
    },
    {
        farsi: "عشق نام تنهاییست در میان جماعت",
        english: "Love is the name of solitude among the multitude"
    },
    {
        farsi: "برای آن که عاشقان را بھ لذتی بود دل بیقرار داشتم",
        english: "So that lovers might have such ecstasy, I kept their hearts in turmoil"
    },
    {
        farsi: "اگر رای بخواهی از یار تیره‌رویت، کار را ترک کن و یاد یار کن",
        english: "If you seek advice from one dark-faced, abandon your affairs and remember the Beloved"
    },
    {
        farsi: "دل من بر تو نشستی و رفت؛ ای بتِ زیبای وادی",
        english: "My heart settled on you and departed; O beautiful idol of the valley"
    },
    {
        farsi: "به این کاروان خرابه‌ای نباید آرام باشی، پیش‌رو به سوی منزل",
        english: "In this caravan of ruin you must not rest; move forward toward your destination"
    },
    {
        farsi: "هستی من و تو را با دریا خلط کن، مانند آب در دریا شو",
        english: "Mix my being and yours with the sea, become like water in the ocean"
    },
    {
        farsi: "اگر یاد آن رنجش‌ها افتاد، سپاس خدا کنید که فراموشی است",
        english: "If remembrance of those sorrows comes to you, thank God for forgetting"
    },
    {
        farsi: "مرا مگو کہ تو نیکویی کردی، حسن کار تو خود گفتار است",
        english: "Do not tell me of your good deeds; the beauty of your work speaks for itself"
    },
    {
        farsi: "ز تیره‌روی خورشید روی خود برافزود، ز شادی ماه روی شادتر نمود",
        english: "My luminous face has increased the brightness of the sun, and the moon appears more joyful from my happiness"
    },
    {
        farsi: "هر کی در آن سراب و خیال کردی، به خاک و غبار رسانیده شود",
        english: "Whoever has been caught in that mirage and illusion shall be reduced to dust"
    },
    {
        farsi: "سخن از سُخن به بیرون نمی رود، ولی سُخن شنیدن جای دارد",
        english: "Words do not go beyond words, but listening to words has its place"
    },
    {
        farsi: "اگر می خواهی که دل آرام بیابی، دل‌های دیگر را آرام کن",
        english: "If you wish to find peace of heart, grant peace to the hearts of others"
    },
    {
        farsi: "نه تو نه من، نه این نه آن، خالی ز هر دو جهان",
        english: "Neither you nor I, neither this nor that, empty of both worlds"
    },
    {
        farsi: "درد و رنج ما را کہ خود دارای درمان نیست، درد دوا است",
        english: "Our pain and suffering, which have no cure in themselves, become the remedy"
    },
    {
        farsi: "دل از خود رستاخیز یابد آنجا کہ رنج دل شود خوشی",
        english: "The heart finds its resurrection where the suffering of the heart becomes joy"
    },
    {
        farsi: "هر کس کہ از خود خبر ندارد، از دیگری خبر ندارد",
        english: "Whoever knows not themselves knows nothing of others"
    },
    {
        farsi: "ندانی تو کہ اصل عشق ایثار و قربانی است",
        english: "You know not that the essence of love is sacrifice and devotion"
    },
    {
        farsi: "به گام‌های منزل رفتن، پیشاپیش برآمدن تنی است",
        english: "To walk in the path of destiny is to step ahead without the burden of self"
    },
    {
        farsi: "مرا نباید کہ بندی شود به اختیار، ولی در رسن عشق بندم",
        english: "I should not be enslaved by choice, yet in the rope of love I am bound"
    },
    {
        farsi: "سر ندهند بھ ہیچ تاج و تخت، سر به جبین خاک نهند",
        english: "They do not bow to any crown or throne, but bow their head to the dust"
    },
    {
        farsi: "ای دل ! چون سرمه در چشم جهان شو، تمام دنیا را نور بخش",
        english: "O heart! Become like kohl in the eye of the world, give light to all existence"
    },
    {
        farsi: "همی‌خواهی کہ بیرون از عشق جهد خود، ول نمی‌دهد عشق",
        english: "You wish to escape the suffering of love, but love will not let you go"
    },
    {
        farsi: "درد عشق ‌از نوعی رحمت است، سوخت دل از برای دواست",
        english: "The pain of love is a form of mercy; burning of the heart is for healing"
    },
    {
        farsi: "اگر به حکمت و خرد بپناه برويم، وقت ندادیم به عشق و محبت",
        english: "If we take refuge in wisdom and reason, we have no time for love and affection"
    },
    {
        farsi: "یک لحظه درون رقم یادت، سالی است خود داشتن",
        english: "One moment in the record of your memory is like possessing eternity"
    }
];

// Shuffle function to randomize starting state
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
