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

