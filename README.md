
# Haikus for Codespaces
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Santé Publique avec Zak Sama</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }
        header {
            background: #0077b6;
            color: white;
            text-align: center;
            padding: 20px 0;
        }
        main {
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #0077b6;
        }
        .question {
            margin-bottom: 15px;
        }
        .exam-type {
            margin: 20px 0;
            text-align: center;
        }
        .exam-type button {
            background: #0077b6;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .exam-type button:hover {
            background: #005f87;
        }
        .exam-content {
            display: none;
        }
        footer {
            background: #0077b6;
            color: white;
            text-align: center;
            padding: 10px 0;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>La Santé Publique avec Zak Sama</h1>
    </header>
    <main>
        <section class="exam-type">
            <h2>Sélectionnez le type d'examen</h2>
            <button onclick="generateExam('discipline')">Examen par Discipline</button>
            <button onclick="generateExam('global')">Examen Global</button>
        </section>
        <section class="exam-content" id="examContent">
            <h2>Votre Examen</h2>
            <div id="questions"></div>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 La Santé Publique avec Zak Sama. Tous droits réservés.</p>
    </footer>
    <script>
        // Données des QCM et QCD
        const qcmData = [
            { question: "Exemple QCM 1 ?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "B" },
            { question: "Exemple QCM 2 ?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "C" },
            // Ajoute 98 autres questions ici
        ];

        const qcdData = [
            { question: "Expliquez ce qu'est la santé publique." },
            { question: "Décrivez les rôles principaux de l'épidémiologie." },
            // Ajoute 58 autres questions ici
        ];

        // Générer un examen
        function generateExam(type) {
            const examContent = document.getElementById("examContent");
            const questionsDiv = document.getElementById("questions");
            questionsDiv.innerHTML = ""; // Réinitialiser les questions

            let selectedQCM = [];
            let selectedQCD = [];

            if (type === "discipline") {
                selectedQCM = getRandomQuestions(qcmData, 20);
                selectedQCD = getRandomQuestions(qcdData, 10);
            } else if (type === "global") {
                selectedQCM = getRandomQuestions(qcmData, 40);
                selectedQCD = getRandomQuestions(qcdData, 20);
            }

            // Afficher les QCM
            questionsDiv.innerHTML += "<h3>Questions à Choix Multiples (QCM)</h3>";
            selectedQCM.forEach((q, index) => {
                questionsDiv.innerHTML += `
                    <div class="question">
                        <p><strong>${index + 1}. ${q.question}</strong></p>
                        ${q.options.map((opt, i) => `<p>${String.fromCharCode(65 + i)}. ${opt}</p>`).join("")}
                    </div>
                `;
            });

            // Afficher les QCD
            questionsDiv.innerHTML += "<h3>Questions à Choix Développées (QCD)</h3>";
            selectedQCD.forEach((q, index) => {
                questionsDiv.innerHTML += `
                    <div class="question">
                        <p><strong>${index + 1}. ${q.question}</strong></p>
                        <p>Réponse attendue : ________________</p>
                    </div>
                `;
            });

            // Afficher la section de l'examen
            examContent.style.display = "block";
        }

        // Fonction pour sélectionner des questions aléatoires
        function getRandomQuestions(data, count) {
            const shuffled = data.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
    </script>
</body>
</html>


---
This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

Point your browser to [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart) for a tour of using Codespaces with this repo.
