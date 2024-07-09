const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const suggestions = document.getElementById('suggestions');

const faq = {
    "hallo": "Hallo! Wie kann ich Ihnen behilflich sein?",
    "wie geht es dir": "Mir geht es gut, danke! Wie kann ich Ihnen helfen?",
    "was ist dein name": "Ich bin der YANOLI BOT.",
    "was machst du": "Ich bin hier, um Ihre Fragen zu beantworten und Ihnen zu helfen.",
    "wer bist du": "Ich bin ein Chatbot, der entwickelt wurde, um Ihnen zu helfen.",
    "danke": "Gern geschehen! Wenn Sie weitere Fragen haben, lassen Sie es mich wissen.",
    "auf wiedersehen": "Auf Wiedersehen! Haben Sie einen schönen Tag!",
    "dürfen schwangere alpha essence einnehmen": "Nein",
    "wie liegt der ph-wert": "Ca. 8,0 - 8,2",
    "kann man es bei tieren verwenden": "Ja ist möglich, kein Problem",
    "dürfen stillende mütter alpha essence einnehmen": "Nein, Alpha sollten stillende Mütter nicht einnehmen, zumal ein Entgiftungsprozess stattfindet, die Giftstoffe werden u.a. auch über die Muttermilch abtransportiert und könnten so vom Kind aufgenommen werden",
    "hast du detaillierte infos über das hexagonale wasser, was da alles rausgefiltert wird": "Durch den Ultrafiltration Prozess werden Schadstoffe wie Keime, Viren und Schwermetalle entfernt, bevor die Salze addiert werden, um eine optimale Lösung für die Stabilität der hexagonalen Struktur gewährleisten zu können.",
    "wie lange ist alpha geöffnet haltbar": "1 Monat",
    "wie sieht es den aus mit der alpha essence mit menschen die blutverdünner nehmen": "Bei Blutverdünnern in Kombination mit dem Wasser gibt es keine Bedenken. Bisher gibt es keine Hinweise, die dagegensprechen.",
    "ist in den ersatzbeuteln von alpha, beschichtetes alu drin": "Nein, die 3 Liter Beutel sind aus PET (Polyethylenterephthalat) und von innen mehrfach beschichtet.",
    "kann man alpha einnehmen, wenn man gastritis oder ein magengeschwür hat? wenn ja, wie wäre die dosierung": "Alpha ist kein Problem, bitte die angegebene Menge nehmen.",
    "wie ist es bei ms? quant arc das ist klar. wie ist es bei alpha und colostrum? wie ist dort die dosierung": "Bei MS ist auch Alpha bedenkenlos.",
    "durchfall wegen alpha wasser? wegen starker magensäure": "Ist eigentlich kein Problem und hat keinen direkten Zusammenhang, zu den beschriebenen Nebenwirkungen. Man kann aber nicht ausschließen, dass sie darauf reagiert hat. Ich würde empfehlen, das Wasser nach dem Essen zu trinken. Dann sollte sie es vertragen."
};

const suggestionsArray = [
    "Dürfen Schwangere Alpha Essence einnehmen?",
    "Wie liegt der PH-Wert?",
    "Kann man es bei Tieren verwenden?",
    "Dürfen stillende Mütter Alpha Essence einnehmen?",
    "Hast du detaillierte Infos über das hexagonale Wasser, was da alles rausgefiltert wird?",
    "Wie lange ist Alpha geöffnet haltbar?",
    "Wie sieht es den aus mit der Alpha Essence mit Menschen die Blutverdünner nehmen?",
    "Ist in den Ersatzbeuteln von Alpha, beschichtetes Alu drin?",
    "Kann man Alpha einnehmen, wenn man Gastritis oder ein Magengeschwür hat? Wenn ja, wie wäre die Dosierung?",
    "Wie ist es bei MS? Quant Arc das ist klar. Wie ist es bei Alpha und Colostrum? Wie ist dort die Dosierung?",
    "Durchfall wegen alpha Wasser? Wegen starker Magensäure?"
];

function sendMessage() {
    const userMessage = userInput.value.toLowerCase().trim();
    if (userMessage === "") return;

    appendMessage(userMessage, 'userMessage');
    userInput.value = '';

    const botResponse = getBotResponse(userMessage);
    setTimeout(() => {
        appendMessage(botResponse, 'botMessage');
    }, 500);
}

function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(message) {
    for (const key in faq) {
        if (message.includes(key)) {
            return faq[key];
        }
    }
    return "Entschuldigung, das habe ich nicht verstanden. Bitte stellen Sie eine andere Frage.";
}

function createSuggestions() {
    suggestionsArray.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion';
        suggestionElement.textContent = suggestion;
        suggestionElement.onclick = () => {
            userInput.value = suggestion;
            sendMessage();
        };
        suggestions.appendChild(suggestionElement);
    });
}

// Initialize suggestions
createSuggestions();



