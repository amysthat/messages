
const fetchFile = (file, onfullfill) => {
    fetch(file)
        .then((res) => res.text())
        .then(onfullfill)
        .catch((e) => console.error(e));
}

const setRandomQuote = () => {
    const line = lines[Math.floor(Math.random() * lines.length)];

    document.getElementById("quote").innerText = line;
}

const turkish_specific_available = Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Istanbul");

const loadTurkish = () => {
    fetchFile("messages/tr.txt", (text) => {
        lines = lines.concat(text.split('\n').filter(elm => elm));

        if (turkish_specific_available) {
            fetchFile("messages/tr_turk.txt", (text) => {
                lines = lines.concat(text.split('\n').filter(elm => elm));

                setRandomQuote();
            });
        }
        else {
            setRandomQuote();
        }
    });
}

const loadEnglish = () => {
    fetchFile("messages/en.txt", (text) => {
        lines = lines.concat(text.split('\n').filter(elm => elm));

        setRandomQuote();
    });
}

let lines = [];

if (navigator.language.includes("tr")) {
    loadTurkish();
}
else {
    loadEnglish();
}
