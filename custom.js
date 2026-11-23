document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const vardasInput = document.getElementById("vardas");
    const pavardeInput = document.getElementById("pavarde");
    const emailInput = document.getElementById("email");
    const telefonasInput = document.getElementById("telefonas");
    const adresasInput = document.getElementById("adresas");
    const ratingInputs = document.querySelectorAll(".rating-input");
    const submitBtn = document.getElementById("submitBtn");
    const clearBtn = document.getElementById("clearBtn");
    const resultContainer = document.getElementById("resultContainer");

    function setError(input, message) {
        if (!input) return;

        input.classList.add("is-invalid");

        let errorDiv = input.parentElement.querySelector(".invalid-feedback");

        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentElement.appendChild(errorDiv);
        }

        errorDiv.textContent = message;
    }

    function clearError(input) {
        if (!input) return;

        input.classList.remove("is-invalid");

        const errorDiv = input.parentElement.querySelector(".invalid-feedback");

        if (errorDiv) {
            errorDiv.textContent = "";
        }
    }

    if (telefonasInput) {
        telefonasInput.addEventListener("input", function () {
            let digits = this.value.replace(/\D/g, "");

            if (digits.startsWith("370")) {
                digits = digits.slice(3);
            } else if (digits.startsWith("86")) {
                digits = digits.slice(1);
            }

            if (digits.startsWith("6")) {
                digits = digits.slice(1);
            }

            digits = digits.slice(0, 8);

            this.value = digits ? "+3706" + digits : "";
        });
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let isValid = true;

            const nameRegex = /^[\p{L}]+$/u;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (vardasInput) {
                const value = vardasInput.value.trim();

                if (value === "") {
                    setError(vardasInput, "Vardas negali būti tuščias.");
                    isValid = false;
                } else if (!nameRegex.test(value)) {
                    setError(vardasInput, "Vardą gali sudaryti tik raidės.");
                    isValid = false;
                } else {
                    clearError(vardasInput);
                }
            }

            if (pavardeInput) {
                const value = pavardeInput.value.trim();

                if (value === "") {
                    setError(pavardeInput, "Pavardė negali būti tuščia.");
                    isValid = false;
                } else if (!nameRegex.test(value)) {
                    setError(pavardeInput, "Pavardę gali sudaryti tik raidės.");
                    isValid = false;
                } else {
                    clearError(pavardeInput);
                }
            }

            if (emailInput) {
                const value = emailInput.value.trim();

                if (value === "") {
                    setError(emailInput, "El. paštas negali būti tuščias.");
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    setError(emailInput, "Neteisingas el. pašto formatas.");
                    isValid = false;
                } else {
                    clearError(emailInput);
                }
            }

            if (telefonasInput) {
                const value = telefonasInput.value.trim();

                if (!/^\+3706\d{7}$/.test(value)) {
                    setError(telefonasInput, "Įveskite teisingą telefono numerį.");
                    isValid = false;
                } else {
                    clearError(telefonasInput);
                }
            }

            if (adresasInput) {
                if (adresasInput.value.trim() === "") {
                    setError(adresasInput, "Adresas negali būti tuščias.");
                    isValid = false;
                } else {
                    clearError(adresasInput);
                }
            }

            ratingInputs.forEach(function (input) {
                const value = Number(input.value);

                if (
                    input.value.trim() === "" ||
                    !Number.isInteger(value) ||
                    value < 1 ||
                    value > 10
                ) {
                    setError(input, "Vertinimas turi būti nuo 1 iki 10.");
                    isValid = false;
                } else {
                    clearError(input);
                }
            });

            if (!isValid) {
                return;
            }

            const formDataObj = {
                vardas: vardasInput.value.trim(),
                pavarde: pavardeInput.value.trim(),
                email: emailInput.value.trim(),
                telefonas: telefonasInput.value.trim(),
                adresas: adresasInput.value.trim(),
                vertinimai: Array.from(ratingInputs).map(input => Number(input.value))
            };

            const suma = formDataObj.vertinimai.reduce((acc, val) => acc + val, 0);
            const vidurkis = formDataObj.vertinimai.length > 0
                ? (suma / formDataObj.vertinimai.length).toFixed(2)
                : "0.00";

            console.log("Sukurtas JavaScript objektas:", formDataObj);
            console.log("Įvertinimų vidurkis:", vidurkis);

            if (resultContainer) {
                resultContainer.innerHTML = `
                    <div class="alert alert-success mt-3">
                        <p><strong>Vardas:</strong> ${formDataObj.vardas}</p>
                        <p><strong>Pavardė:</strong> ${formDataObj.pavarde}</p>
                        <p><strong>El. paštas:</strong> ${formDataObj.email}</p>
                        <p><strong>Tel. numeris:</strong> ${formDataObj.telefonas}</p>
                    </div>
                `;
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {

            const vardas = vardasInput.value.trim();
            const pavarde = pavardeInput.value.trim();

            const vertinimai = Array.from(ratingInputs).map(input => Number(input.value));

            const suma = vertinimai.reduce((acc, val) => acc + val, 0);

            const vidurkis = vertinimai.length > 0
                ? (suma / vertinimai.length).toFixed(2)
                : "0.00";

            if (resultContainer) {
                resultContainer.innerHTML = `
                    <div class="alert alert-success mt-3">
                        <p><strong>${vardas} ${pavarde}:</strong> ${vidurkis}</p>
                    </div>
                `;
            }

            if (form) {
                form.reset();

                form.querySelectorAll("input").forEach(function (input) {
                    clearError(input);
                });
            }

        });
    }

});

const skills = [
    {
        name: "Skriptinis programavimas",
        status: "Planuojama",
        xp: 50
    },
    {
        name: "Atsinaujinantys energijos šaltiniai",
        status: "Planuojama",
        xp: 40
    },
    {
        name: "AutoCAD Elektrotechninis projektavimas",
        status: "Mokomasi",
        xp: 60
    },
    {
        name: "Mikrokontroleriai ir autonominė automatika",
        status: "Mokomasi",
        xp: 40
    },
    {
        name: "Elektrinių grandinių analizė",
        status: "Atlikta",
        xp: 50
    },
    {
        name: "Elektriniai matavimai ir diagnostika",
        status: "Atlikta",
        xp: 40
    },
    {
        name: "Darbuotojų sauga ir elektrosauga",
        status: "Atlikta",
        xp: 40
    }
];

const STORAGE_KEY = "agne_skills_kanban_v1";

function saveSkillsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

function loadSkillsFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) return;

        skills.forEach(function (skill) {
            const matched = parsed.find(item => item.name === skill.name);
            if (matched && ["Planuojama", "Mokomasi", "Atlikta"].includes(matched.status)) {
                skill.status = matched.status;
            }
        });
    } catch (e) {
        console.error("Nepavyko nuskaityti duomenų iš localStorage:", e);
    }
}

function getLevelInfo(xp) {
    if (xp >= 300) {
        return { level: 4, rank: "Profesionalas", minXp: 300, maxXp: 300 };
    } else if (xp >= 150) {
        return { level: 3, rank: "Specialistas", minXp: 150, maxXp: 300 };
    } else if (xp >= 50) {
        return { level: 2, rank: "Praktikantas", minXp: 50, maxXp: 150 };
    } else {
        return { level: 1, rank: "Pradedantysis", minXp: 0, maxXp: 50 };
    }
}

function updateXpLevelRank() {
    const totalXp = skills
        .filter(skill => skill.status === "Atlikta")
        .reduce((sum, skill) => sum + skill.xp, 0);

    const info = getLevelInfo(totalXp);

    const totalXpEl = document.getElementById("totalXp");
    const levelEl = document.getElementById("userLevel");
    const rankEl = document.getElementById("userRank");

    if (totalXpEl) totalXpEl.textContent = totalXp;
    if (levelEl) levelEl.textContent = info.level;
    if (rankEl) rankEl.textContent = info.rank;

    updateProgressBar(totalXp, info);
    return { totalXp, info };
}

function updateProgressBar(totalXp, info) {
    const progressBarEl = document.getElementById("xpProgressBar");
    if (!progressBarEl) return;

    let percent = 0;

    if (info.level === 4) {
        percent = 100;
    } else {
        const levelSpan = info.maxXp - info.minXp;
        const earnedInLevel = totalXp - info.minXp;
        percent = Math.round((earnedInLevel / levelSpan) * 100);
        percent = Math.max(0, Math.min(100, percent));
    }

    progressBarEl.style.width = percent + "%";
    progressBarEl.textContent = percent + "%";
}

function updateSkillsStatistics() {
    const totalCount = skills.length;
    const completedCount = skills.filter(skill => skill.status === "Atlikta").length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const totalEl = document.getElementById("totalSkillsCount");
    const completedEl = document.getElementById("completedSkillsCount");
    const percentageEl = document.getElementById("completedPercentage");

    if (totalEl) totalEl.textContent = totalCount;
    if (completedEl) completedEl.textContent = completedCount;
    if (percentageEl) percentageEl.textContent = percentage;
}

function updateSkillsModule() {
    renderSkills();
    updateXpLevelRank();
    updateSkillsStatistics();
}

updateSkillsModule();

function renderSkills() {

    const plannedContainer = document.getElementById("plannedSkills");
    const learningContainer = document.getElementById("learningSkills");
    const completedContainer = document.getElementById("completedSkills");

    plannedContainer.innerHTML = "";
    learningContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    skills.forEach(function(skill) {

        const card = document.createElement("div");
        card.classList.add("skill-card");

        if (skill.status === "Planuojama") {
            card.classList.add("plan");
            plannedContainer.appendChild(card);
        } 
        else if (skill.status === "Mokomasi") {
            card.classList.add("learn");
            learningContainer.appendChild(card);
        } 
        else if (skill.status === "Atlikta") {
            card.classList.add("done");
            completedContainer.appendChild(card);
        }

        card.innerHTML = `
            <h4>${skill.name}</h4>
            <p>Būsena: ${skill.status}</p>
            <span class="xp-tag">${skill.xp} XP</span>

            <select class="status-select">
                <option value="Planuojama"
                    ${skill.status === "Planuojama" ? "selected" : ""}>
                    Planuojama
                </option>

                <option value="Mokomasi"
                    ${skill.status === "Mokomasi" ? "selected" : ""}>
                    Mokomasi
                </option>

                <option value="Atlikta"
                    ${skill.status === "Atlikta" ? "selected" : ""}>
                    Atlikta
                </option>
            </select>
        `;
        const statusSelect = card.querySelector(".status-select");

        statusSelect.addEventListener("change", function() {

            skill.status = this.value;

            updateSkillsModule();
            saveSkillsToStorage();

        });

    });
}

loadSkillsFromStorage();
updateSkillsModule();
