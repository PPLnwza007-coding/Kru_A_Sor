const VOCAB = {

    "แถว 1": [
        { word: "charms", reading: "ชาร์มส์", meaning: "เครื่องราง / สิ่งที่มีเสน่ห์" },
        { word: "symbols", reading: "ซิม-โบลส์", meaning: "สัญลักษณ์" },
        { word: "a bride", reading: "อะ ไบรด์", meaning: "เจ้าสาว" },
        { word: "a groom", reading: "อะ กรูม", meaning: "เจ้าบ่าว" },
        { word: "informal", reading: "อิน-ฟอร์-มัล", meaning: "ไม่เป็นทางการ" },
        { word: "an aisle", reading: "แอน ไอล์", meaning: "ทางเดิน (เช่น ทางเดินในโบสถ์หรือระหว่างที่นั่ง)" },
        { word: "faithfulness", reading: "เฟธ-ฟูล-เนส", meaning: "ความซื่อสัตย์ / ความภักดี" },
        { word: "a crown", reading: "อะ คราวน์", meaning: "มงกุฎ" }
    ],

    "แถว 2": [
        { word: "occupations", reading: "ออค-คิว-เพ-ชั่นส์", meaning: "อาชีพ" },
        { word: "characteristics", reading: "แค-แรค-เทอะ-ริส-ทิคส์", meaning: "ลักษณะเฉพาะ / คุณลักษณะ" },
        { word: "a landmark", reading: "อะ แลนด์-มาร์ค", meaning: "สถานที่สำคัญ / จุดสังเกตสำคัญ" },
        { word: "an abbreviation", reading: "แอน อะ-บรี-วี-เอ-ชั่น", meaning: "คำย่อ" },
        { word: "to honor", reading: "ทู ออ-เนอร์", meaning: "ให้เกียรติ / ยกย่อง" },
        { word: "an initial", reading: "แอน อิ-นิ-เชิล", meaning: "อักษรย่อ (ตัวแรกของชื่อ)" },
        { word: "paperwork", reading: "เพ-เปอร์-เวิร์ค", meaning: "เอกสารงาน / งานเอกสาร" },
        { word: "a trademark", reading: "อะ เทรด-มาร์ค", meaning: "เครื่องหมายการค้า" }
    ],

    "แถว 3": [
        { word: "dripping wet", reading: "ดริพ-พิง เว็ท", meaning: "เปียกโชก / เปียกจนหยดติ๋ง ๆ" },
        { word: "to rage", reading: "ทู เรจ", meaning: "โกรธจัด / โหมกระหน่ำ (เช่น พายุโหม)" },
        { word: "in tune", reading: "อิน ทูน", meaning: "เข้ากันได้ดี / ตรงจังหวะ / เสียงตรงคีย์" },
        { word: "torn", reading: "ทอร์น", meaning: "ฉีกขาด" },
        { word: "to bear", reading: "ทู แบร์", meaning: "อดทน / ทนรับ / แบกรับ" },
        { word: "rough", reading: "รัฟ", meaning: "หยาบ / ขรุขระ / รุนแรง" },
        { word: "to shoot", reading: "ทู ชูต", meaning: "ยิง / ถ่าย (เช่น ถ่ายรูป)" },
        { word: "bleak", reading: "บลีค", meaning: "หม่นหมอง / สิ้นหวัง / มืดมน" }
    ],

    "แถว 4": [
        { word: "to refuse", reading: "ทู รี-ฟิวซ", meaning: "ปฏิเสธ" },
        { word: "fate", reading: "เฟท", meaning: "โชคชะตา / พรหมลิขิต" },
        { word: "a journey", reading: "อะ เจอร์-นี", meaning: "การเดินทาง" },
        { word: "a stranger", reading: "อะ สเตรน-เจอร์", meaning: "คนแปลกหน้า" },
        { word: "ill", reading: "อิล", meaning: "ป่วย" },
        { word: "horrified", reading: "ฮอ-ริ-ไฟด์", meaning: "ตกใจกลัวมาก / สยองขวัญ" },
        { word: "to prepare", reading: "ทู พรี-แพร์", meaning: "เตรียมตัว / เตรียมการ" },
        { word: "to cure", reading: "ทู เคียวร์", meaning: "รักษาให้หาย" }
    ]

};

// ================= ตัวแปรเกม =================
let currentWords = [];
let currentQuestion;
let score = 0;
let questionCount = 0;
let totalQuestions = 10; // จำนวนข้อในเกม

// ================= รวมคำทั้งหมด =================
function getAllWords() {
    return Object.values(VOCAB).flat();
}

// ================= แสดงคำศัพท์ =================
const container = document.getElementById("vocab-container");
const searchInput = document.getElementById("search");

function renderList(filter = "") {
    container.innerHTML = "";

    Object.keys(VOCAB).forEach(category => {
        const section = document.createElement("div");
        section.className = "category";
        section.innerHTML = `<h3>${category}</h3><div class="word-grid"></div>`;
        const grid = section.querySelector(".word-grid");

        VOCAB[category]
            .filter(v => v.word.toLowerCase().includes(filter.toLowerCase()))
            .forEach(v => {
                const div = document.createElement("div");
                div.className = "word-item";
                div.innerHTML = `
          <div class="word">${v.word}</div>
          <div class="reading">${v.reading}</div>
          <div class="meaning">${v.meaning}</div>
        `;
                grid.appendChild(div);
            });

        container.appendChild(section);
    });
}

renderList();
searchInput.addEventListener("input", e => renderList(e.target.value));

// ================= สลับหน้า =================
const gameBtn = document.getElementById("gameBtn");
const vocabPage = document.getElementById("vocabPage");
const gamePage = document.getElementById("gamePage");
const quizArea = document.getElementById("quizArea");

gameBtn.onclick = () => {
    vocabPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
};

function goHome() {
    gamePage.classList.add("hidden");
    vocabPage.classList.remove("hidden");
    quizArea.classList.add("hidden");
}

// ================= เริ่มเกม =================
function startGame(mode) {
    score = 0;
    questionCount = 0;

    if (mode === "all") {
        currentWords = getAllWords();
    } else {
        currentWords = VOCAB[mode];
    }

    quizArea.classList.remove("hidden");
    nextQuestion();
}

// ================= คำถามถัดไป =================
function nextQuestion() {

    if (questionCount >= totalQuestions) {
        endGame();
        return;
    }

    questionCount++;

    currentQuestion = currentWords[Math.floor(Math.random() * currentWords.length)];

    document.getElementById("questionWord").innerText = currentQuestion.word;
    document.getElementById("questionReading").innerText = currentQuestion.reading;
    document.getElementById("score").innerText =
        `ข้อ ${questionCount}/${totalQuestions} | คะแนน: ${score}`;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    let choices = [currentQuestion.meaning];

    while (choices.length < 4) {
        const random = getAllWords()[Math.floor(Math.random() * getAllWords().length)].meaning;
        if (!choices.includes(random)) choices.push(random);
    }

    choices.sort(() => Math.random() - 0.5);

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;

        btn.onclick = () => checkAnswer(choice, btn);

        choicesDiv.appendChild(btn);
    });
}

// ================= ตรวจคำตอบ =================
function checkAnswer(selected, button) {

    const buttons = document.querySelectorAll("#choices button");

    buttons.forEach(btn => btn.disabled = true);

    if (selected === currentQuestion.meaning) {
        score++;
        button.style.background = "green";
        button.style.color = "white";
    } else {
        button.style.background = "red";
        button.style.color = "white";

        buttons.forEach(btn => {
            if (btn.innerText === currentQuestion.meaning) {
                btn.style.background = "green";
                btn.style.color = "white";
            }
        });
    }

    setTimeout(nextQuestion, 1000);
}

// ================= จบเกม =================
function endGame() {
    document.getElementById("choices").innerHTML = "";
    document.getElementById("questionWord").innerText = "กากเหมือนเดิมANIGATOOO";
    document.getElementById("questionReading").innerText =
        `คะแนนรวม: ${score} / ${totalQuestions}`;

    document.getElementById("score").innerHTML =
        `<button onclick="nextQuestion()">เล่นอีกครั้ง</button>`;
}