const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const suggestions = document.getElementById('suggestions');

const apiKey = 'sk-proj-zjQfGfupduf3c5yjS7aET3BlbkFJM0uDlTjYrp8S3QIjvzyb';

// Systemnachrichten für verschiedene Sprachen
const systemMessages = {
    de: {
        role: "system",
        content: "Du bist der YANOLI BOT, ein hilfsbereiter Assistent, der ausschließlich Fragen zu Produkten wie Alpha Essence, Quant ARQ, Collostrum und weiteren Yanoli-Produkten beantwortet. Wenn eine Frage nicht zu den Yanoli-Produkten gehört, antworte höflich, dass du nur Fragen zu Yanoli-Produkten beantworten kannst."
    },
    en: {
        role: "system",
        content: "You are the YANOLI BOT, a helpful assistant that only answers questions about products such as Alpha Essence, Quant ARQ, Collostrum, and other Yanoli products. If a question is not about Yanoli products, please politely respond that you can only answer questions about Yanoli products."
    },
    fr: {
        role: "system",
        content: "Vous êtes le YANOLI BOT, un assistant utile qui ne répond qu'aux questions concernant des produits tels que Alpha Essence, Quant ARQ, Collostrum et d'autres produits Yanoli. Si une question ne concerne pas les produits Yanoli, veuillez répondre poliment que vous ne pouvez répondre qu'aux questions concernant les produits Yanoli."
    }
};

// Spezifische Daten für verschiedene Sprachen
const specificData = {
    de: [
        // Alpha & Beta Essence
        "Schwangere sollten Alpha Essence nicht einnehmen.",
        "Der pH-Wert von Alpha Essence liegt bei ca. 8,0 - 8,2.",
        "Alpha Essence kann bei Tieren verwendet werden.",
        "Stillende Mütter sollten Alpha Essence nicht einnehmen, da ein Entgiftungsprozess stattfindet.",
        "Durch den Ultrafiltration Prozess werden Schadstoffe wie Keime, Viren und Schwermetalle entfernt.",
        "Alpha Essence ist nach dem Öffnen 1 Monat haltbar.",
        "Bei Blutverdünnern in Kombination mit Alpha Essence gibt es keine Bedenken.",
        "Die Ersatzbeutel von Alpha sind aus PET und von innen mehrfach beschichtet.",
        "Alpha Essence kann bei Gastritis oder einem Magengeschwür eingenommen werden, bitte die angegebene Menge nehmen.",
        "Bei MS ist auch Alpha bedenkenlos.",
        "Durchfall wegen Alpha Wasser ist normalerweise kein Problem und hat keinen direkten Zusammenhang. Es wird empfohlen, das Wasser nach dem Essen zu trinken.",
        // Collostrum FAQ
        "Collostrum ist nicht vegetarisch, da es aus tierischem Rohstoff besteht.",
        "Collostrum ist nicht laktosefrei, da es direkt aus der Colostrum Milch gewonnen wird.",
        "Bei MS Vorsicht bei der Einnahme von Collostrum, da es eine Autoimmunerkrankung ist. Bitte nicht ohne Absprache mit dem Arzt einnehmen.",
        // Kosmetik
        "Glyceryl Stearate ist ein sicherer Emulgator, der durch Veresterung von Stearinsäure und Glycerin hergestellt wird.",
        "Polyglyceryl 3 methylglucose distearate ist ein Emulgator und Emollient, das die Haut schützt und Feuchtigkeit bewahrt.",
        "Propylenglycol ist ein mehrwertiger Alkohol, der in richtigen Konzentrationen sicher ist und Feuchtigkeit spendet.",
        // Quant ARQ FAQ
        "Das Quant ARQ ist nicht patentiert, nur das Modell.",
        "Das Quant ARQ hat kein Verfallsdatum.",
        "Das Quant ARQ muss keinen Körperkontakt haben und kann in der Hosentasche oder am Schlüsselbund getragen werden.",
        "Tiere dürfen das Quant ARQ tragen.",
        "Das Quant ARQ ist wasserdicht.",
        "Das QA-Mini hat die gleiche Wirkung wie das große Modell, es ist nur kleiner.",
        "Das Gehäuse des Quant ARQ besteht aus reinem Aluminium.",
        "Das Quant ARQ funktioniert mit Quanten-Sensoren, die keine künstlichen Frequenzen verwenden.",
        "Das Quant ARQ kann auch von Babys getragen werden.",
        "Das Quant ARQ und das QA-Mini haben spezifische Abmessungen (5,5cm x 2,5cm für das große Modell und 4cm x 1,8cm für das Mini).",
        "Das Quant ARQ kann die Vitalität der Zellen steigern und synergistisch mit Nahrungsergänzungsmitteln wirken.",
        "Das Quant ARQ darf auch bei einem Herzschrittmacher getragen werden.",
        // Radio Glow Trio
        "Das Vitamin C Serum im Radio Glow Trio enthält 10,5g.",
        "Der Deep Blue Hydration Booster enthält 10g Hyaluron.",
        "Das Peptid Konzentrat enthält 11g.",
        // Start – Pause – Fast Forward FAQ
        "Der Zucker in Start ist natürlicher Fruchtzucker.",
        "Start führt nicht zu Eisenmangel und Pause enthält sogar Eisen in gut verfügbarer Form.",
        "Pause kann müde machen, daher sollte man nach der Einnahme kein Auto fahren.",
        "Fast Forward sollte während der Schwangerschaft nicht eingenommen werden.",
        // Vitamin D Information
        "Vitamin D wird aus Cholesterin hergestellt, das aus Wollfett von lebenden Schafen stammt.",
        "Eine Überdosierung von Vitamin D ist bei den von uns verwendeten Mengen nicht zu befürchten.",
        // Ibe
        "Ibe enthält keinen Zucker, sondern Süßstoff (Sucralose).",
        "Man sollte täglich nicht mehr als 300 Mikrogramm Selen aufnehmen. Ibe enthält 55 Mikrogramm pro 250ml.",
        // CollagLow FAQ
        "CollagLow kann auch in Pulverform eingenommen werden, schmeckt aber sehr bitter.",
        "CollagLow kann auch von Tieren eingenommen werden.",
        "CollagLow enthält LMW Kollagen, das stark hydrolysiert ist.",
        "Die Einnahme von CollagLow während der Schwangerschaft wird nicht empfohlen.",
        "Die Einnahme von CollagLow während der Stillzeit wird nicht empfohlen, bis die EFSA eine abschließende Bewertung gibt.",
        "Eine regelmäßige Einnahme von CollagLow ist problemlos und besonders für Sportler vorteilhaft.",
        "CollagLow ist ein stark hydrolysiertes Hydrolysat mit Di- und Tripeptiden.",
        "Das Astaxanthin in CollagLow wird aus Süßwasseralgen hergestellt, die unter kontrollierten Bedingungen gezüchtet werden.",
        "Wenn man die Einnahme von CollagLow am Morgen vergisst, kann man die Dosis auch abends nehmen.",
        "Typ I Kollagen ist für die Festigkeit von Geweben verantwortlich, Typ III für die Elastizität.",
        "Die Einnahme von CollagLow ist auch bei nur einer Niere unbedenklich.",
        "Die Kapseln von CollagLow sind glutenfrei."
    ],
    en: [
        // Alpha & Beta Essence
        "Pregnant women should not take Alpha Essence.",
        "The pH value of Alpha Essence is approximately 8.0 - 8.2.",
        "Alpha Essence can be used with animals.",
        "Nursing mothers should not take Alpha Essence because a detoxification process occurs.",
        "The ultrafiltration process removes contaminants such as germs, viruses, and heavy metals.",
        "Alpha Essence is shelf-stable for 1 month after opening.",
        "There are no concerns with blood thinners in combination with Alpha Essence.",
        "The replacement bags for Alpha are made of PET and are internally multi-coated.",
        "Alpha Essence can be taken if you have gastritis or a stomach ulcer, please take the indicated amount.",
        "Alpha is also safe for MS.",
        "Diarrhea from Alpha water is usually not a problem and has no direct correlation. It is recommended to drink the water after meals.",
        // Collostrum FAQ
        "Collostrum is not vegetarian because it is derived from animal raw materials.",
        "Collostrum is not lactose-free because it is directly derived from colostrum milk.",
        "Use caution when taking Collostrum with MS, as it is an autoimmune disease. Do not take without consulting a doctor.",
        // Cosmetics
        "Glyceryl Stearate is a safe emulsifier made by esterifying stearic acid and glycerin.",
        "Polyglyceryl 3 methylglucose distearate is an emulsifier and emollient that protects the skin and retains moisture.",
        "Propylene glycol is a polyvalent alcohol that is safe in the right concentrations and moisturizes.",
        // Quant ARQ FAQ
        "The Quant ARQ is not patented, only the model.",
        "The Quant ARQ has no expiration date.",
        "The Quant ARQ does not need body contact and can be worn in a pocket or on a keychain.",
        "Animals can wear the Quant ARQ.",
        "The Quant ARQ is waterproof.",
        "The QA-Mini has the same effect as the large model, it is just smaller.",
        "The housing of the Quant ARQ is made of pure aluminum.",
        "The Quant ARQ works with quantum sensors that do not use artificial frequencies.",
        "The Quant ARQ can also be worn by babies.",
        "The Quant ARQ and QA-Mini have specific dimensions (5.5cm x 2.5cm for the large model and 4cm x 1.8cm for the Mini).",
        "The Quant ARQ can enhance cell vitality and work synergistically with supplements.",
        "The Quant ARQ can also be worn with a pacemaker.",
        // Radio Glow Trio
        "The Vitamin C serum in the Radio Glow Trio contains 10.5g.",
        "The Deep Blue Hydration Booster contains 10g of hyaluronic acid.",
        "The Peptide Concentrate contains 11g.",
        // Start – Pause – Fast Forward FAQ
        "The sugar in Start is natural fruit sugar.",
        "Start does not cause iron deficiency and Pause even contains iron in a well-available form.",
        "Pause can cause drowsiness, so do not drive after taking it.",
        "Fast Forward should not be taken during pregnancy.",
        // Vitamin D Information
        "Vitamin D is made from cholesterol derived from the wool fat of live sheep.",
        "An overdose of vitamin D is not to be feared at the amounts we use.",
        // Ibe
        "Ibe contains no sugar but sweetener (sucralose).",
        "You should not take more than 300 micrograms of selenium per day. Ibe contains 55 micrograms per 250ml.",
        // CollagLow FAQ
        "CollagLow can also be taken in powder form but tastes very bitter.",
        "CollagLow can also be taken by animals.",
        "CollagLow contains LMW collagen, which is highly hydrolyzed.",
        "Taking CollagLow during pregnancy is not recommended.",
        "Taking CollagLow during breastfeeding is not recommended until EFSA gives a final assessment.",
        "Regular intake of CollagLow is unproblematic and especially beneficial for athletes.",
        "CollagLow is a highly hydrolyzed hydrolysate with di- and tripeptides.",
        "The astaxanthin in CollagLow is made from freshwater algae grown under controlled conditions.",
        "If you forget to take CollagLow in the morning, you can take the dose in the evening.",
        "Type I collagen is responsible for tissue firmness, type III for elasticity.",
        "Taking CollagLow is also safe with only one kidney.",
        "The capsules of CollagLow are gluten-free."
    ],
    fr: [
        // Alpha & Beta Essence
        "Les femmes enceintes ne doivent pas prendre Alpha Essence.",
        "Le pH de Alpha Essence est d'environ 8,0 - 8,2.",
        "Alpha Essence peut être utilisé avec des animaux.",
        "Les mères qui allaitent ne doivent pas prendre Alpha Essence car un processus de détoxification a lieu.",
        "Le processus d'ultrafiltration élimine les contaminants tels que les germes, les virus et les métaux lourds.",
        "Alpha Essence se conserve pendant 1 mois après ouverture.",
        "Il n'y a pas de préoccupations avec les anticoagulants en combinaison avec Alpha Essence.",
        "Les sacs de remplacement pour Alpha sont en PET et sont revêtus de multiples couches internes.",
        "Alpha Essence peut être pris si vous avez une gastrite ou un ulcère à l'estomac, veuillez prendre la quantité indiquée.",
        "Alpha est également sans danger pour la SEP.",
        "La diarrhée causée par l'eau Alpha n'est généralement pas un problème et n'a pas de corrélation directe. Il est recommandé de boire l'eau après les repas.",
        // Collostrum FAQ
        "Le collostrum n'est pas végétarien car il est dérivé de matières premières animales.",
        "Le collostrum n'est pas sans lactose car il est directement dérivé du lait de colostrum.",
        "Utilisez le collostrum avec prudence avec la SEP, car c'est une maladie auto-immune. Ne pas prendre sans consulter un médecin.",
        // Cosmétiques
        "Le glyceryl stearate est un émulsifiant sûr fabriqué par estérification de l'acide stéarique et du glycérol.",
        "Le polyglyceryl 3 methylglucose distearate est un émulsifiant et un émollient qui protège la peau et retient l'humidité.",
        "Le propylène glycol est un alcool polyvalent qui est sûr aux bonnes concentrations et hydrate.",
        // Quant ARQ FAQ
        "Le Quant ARQ n'est pas breveté, seul le modèle l'est.",
        "Le Quant ARQ n'a pas de date d'expiration.",
        "Le Quant ARQ n'a pas besoin de contact corporel et peut être porté dans une poche ou sur un porte-clés.",
        "Les animaux peuvent porter le Quant ARQ.",
        "Le Quant ARQ est étanche.",
        "Le QA-Mini a le même effet que le grand modèle, il est juste plus petit.",
        "Le boîtier du Quant ARQ est en aluminium pur.",
        "Le Quant ARQ fonctionne avec des capteurs quantiques qui n'utilisent pas de fréquences artificielles.",
        "Le Quant ARQ peut également être porté par des bébés.",
        "Le Quant ARQ et le QA-Mini ont des dimensions spécifiques (5,5cm x 2,5cm pour le grand modèle et 4cm x 1,8cm pour le Mini).",
        "Le Quant ARQ peut améliorer la vitalité cellulaire et agir en synergie avec les compléments alimentaires.",
        "Le Quant ARQ peut également être porté avec un stimulateur cardiaque.",
        // Radio Glow Trio
        "Le sérum de vitamine C du Radio Glow Trio contient 10,5g.",
        "Le Deep Blue Hydration Booster contient 10g d'acide hyaluronique.",
        "Le concentré de peptides contient 11g.",
        // Start – Pause – Fast Forward FAQ
        "Le sucre dans Start est du sucre de fruit naturel.",
        "Start ne provoque pas de carence en fer et Pause contient même du fer sous une forme bien assimilée.",
        "Pause peut causer de la somnolence, ne pas conduire après l'avoir pris.",
        "Fast Forward ne doit pas être pris pendant la grossesse.",
        // Informations sur la vitamine D
        "La vitamine D est fabriquée à partir de cholestérol dérivé de la graisse de laine de moutons vivants.",
        "Une surdose de vitamine D n'est pas à craindre aux quantités que nous utilisons.",
        // Ibe
        "Ibe ne contient pas de sucre mais un édulcorant (sucralose).",
        "Vous ne devez pas prendre plus de 300 microgrammes de sélénium par jour. Ibe contient 55 microgrammes par 250 ml.",
        // CollagLow FAQ
        "CollagLow peut également être pris sous forme de poudre mais a un goût très amer.",
        "CollagLow peut également être pris par les animaux.",
        "CollagLow contient du collagène LMW, qui est hautement hydrolysé.",
        "La prise de CollagLow pendant la grossesse n'est pas recommandée.",
        "La prise de CollagLow pendant l'allaitement n'est pas recommandée jusqu'à ce que l'EFSA donne une évaluation finale.",
        "L'apport régulier de CollagLow n'est pas problématique et particulièrement bénéfique pour les athlètes.",
        "CollagLow est un hydrolysat fortement hydrolysé avec des di- et tripeptides.",
        "L'astaxanthine dans CollagLow est fabriquée à partir d'algues d'eau douce cultivées dans des conditions contrôlées.",
        "Si vous oubliez de prendre CollagLow le matin, vous pouvez prendre la dose le soir.",
        "Le collagène de type I est responsable de la fermeté des tissus, le type III de l'élasticité.",
        "La prise de CollagLow est également sûre avec un seul rein.",
        "Les capsules de CollagLow sont sans gluten."
    ]
};

let messages = [];

// Funktion zur Sprachenerkennung
function detectLanguage(message) {
    const germanKeywords = ["einnehmen", "Schwangere", "Blutverdünner"];
    const englishKeywords = ["take", "pregnant", "blood thinners"];
    const frenchKeywords = ["prendre", "enceintes", "anticoagulants"];

    if (germanKeywords.some(word => message.includes(word))) {
        return "de";
    } else if (englishKeywords.some(word => message.includes(word))) {
        return "en";
    } else if (frenchKeywords.some(word => message.includes(word))) {
        return "fr";
    } else {
        // Standardmäßig auf Deutsch
        return "de";
    }
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage(userMessage, 'userMessage');
    userInput.value = '';

    // Erkennen der Sprache des Benutzers
    const language = detectLanguage(userMessage);

    // Initialisieren der Nachrichten mit der systemMessage der erkannten Sprache
    messages = [systemMessages[language]];

    // Hinzufügen der spezifischen Daten für die erkannte Sprache
    specificData[language].forEach(data => {
        messages.push({ role: "system", content: data });
    });

    // Benutzernachricht zu den Nachrichten hinzufügen
    messages.push({role: "user", content: userMessage});

    const botResponse = await getBotResponse();
    appendMessage(botResponse, 'botMessage');
}

function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function getBotResponse() {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
        const botMessage = data.choices[0].message.content.trim();
        // Bot-Nachricht zu den Nachrichten hinzufügen
        messages.push({role: "assistant", content: botMessage});
        return botMessage;
    } else {
        return "Entschuldigung, ich habe das nicht verstanden. Bitte stellen Sie eine andere Frage.";
    }
}

const suggestionsArray = [
    "Dürfen Schwangere Alpha Essence einnehmen?",
    "Wie liegt der PH-Wert?",
    "Kann man es bei Tieren verwenden?",
    "Dürfen stillende Mütter Alpha Essence einnehmen?",
    "Hast du detaillierte Infos über das hexagonale Wasser, was da alles rausgefiltert wird?",
    "Wie lange ist Alpha geöffnet haltbar?",
    "Wie sieht es aus mit der Alpha Essence mit Menschen die Blutverdünner nehmen?",
    "Ist in den Ersatzbeuteln von Alpha beschichtetes Alu drin?",
    "Kann man Alpha einnehmen, wenn man Gastritis oder ein Magengeschwür hat?",
    "Wie ist es bei MS mit Alpha und Colostrum?",
    "Durchfall wegen Alpha Wasser? Wegen starker Magensäure?",
    "Welcher Süßstoff ist in Ibe enthalten?",
    "Darf man zusätzlich zu Ibe noch Selen einnehmen?",
    "Was ist in Radio Glow Trio enthalten?",
    "Was ist Glyceryl Stearate?",
    "Was ist Polyglyceryl 3 Methylglucose Distearate?",
    "Was ist Propylenglycol?",
    "Hat das Quant ARQ ein Verfallsdatum?",
    "Muss das Quant ARQ Körperkontakt haben?",
    "Dürfen Tiere das Quant ARQ tragen?",
    "Ist das Quant ARQ wasserdicht?",
    "Darf man das Quant ARQ tragen, wenn man einen Herzschrittmacher hat?",
    "Gibt es Wechselwirkungen mit anderen Schutzgeräten?",
    "Soll man das Quant ARQ auch nachts tragen?",
    "Kann man das Quant ARQ komplett unter Wasser halten?",
    "Darf man das Quant ARQ lackieren?",
    "Ist Collostrum vegetarisch?",
    "Ist Collostrum laktosefrei?",
    "Darf man Collostrum bei MS einnehmen?",
    "Kann das Collaglow auch in Pulverform eingenommen werden?",
    "Kann das Collaglow von Tieren eingenommen werden?",
    "Was ist das für ein Kollagen im Collaglow?",
    "Darf das Collaglow auch während der Schwangerschaft eingenommen werden?",
    "Darf es eingenommen werden, wenn man noch stillt?",
    "Ist eine Einnahme von Collaglow dauerhaft möglich?",
    "Ist das LMW auch ein Hydrolysat?",
    "Wie wird das Astaxanthin hergestellt?",
    "Was bedeutet Typ 1 und 3 Kollagen?",
    "Darf man Collaglow bei nur einer Niere einnehmen?",
    "Sind die Kapseln glutenfrei?"
];

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



