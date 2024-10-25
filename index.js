function displayCocktailInfo(drink) {
    const cocktailInfoDiv = document.getElementById("cocktail-info");

    cocktailInfoDiv.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <p><strong>Alkoholis:</strong> ${drink.strAlcoholic}</p>
        <p><strong>Kategorija:</strong> ${drink.strCategory}</p>
        <p><strong>Stiklinės tipas:</strong> ${drink.strGlass}</p>
        <p><strong>Instrukcijos:</strong> ${drink.strInstructions}</p>
        <p><strong>Pagrindiniai ingredientai:</strong></p>
        <ul>
            ${getIngredients(drink).map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width:200px;">
    `;
}

function getIngredients(drink) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${ingredient} - ${measure || ""}`);
        }
    }
    return ingredients;
}

// Funkcija, kuri atlieka asinchroninę užklausą ir iškviečia kitas funkcijas
function fetchCocktailData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then(response => {
            if (!response.ok) {
                console.log("Nepavyko užkrauti duomenų. Statusas: " + response.status);
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.drinks && data.drinks.length > 0) {
                displayCocktailInfo(data.drinks[0]);
            } else {
                console.log("Nerasta gėrimų duomenų.");
            }
        });
}

// Kviečiame funkciją gauti ir atspausdinti gėrimų informaciją
fetchCocktailData();



function displayCocktailInfo(drinks) {
    const cocktailInfoDiv = document.getElementById("cocktail-info");

    // Tuščias turinys
    cocktailInfoDiv.innerHTML = "";

    // Patikriname, ar gėrimų masyvas yra ne tuščias
    if (drinks.length === 0) {
        cocktailInfoDiv.innerHTML = "<p>Nerasta gėrimų.</p>";
        return;
    }

    // Iteruojame per visus gėrimus
    drinks.forEach(drink => {
        cocktailInfoDiv.innerHTML += `
            <h2>${drink.strDrink}</h2>
            <p><strong>Alkoholis:</strong> ${drink.strAlcoholic}</p>
            <p><strong>Kategorija:</strong> ${drink.strCategory}</p>
            <p><strong>Stiklinės tipas:</strong> ${drink.strGlass}</p>
            <p><strong>Instrukcijos:</strong> ${drink.strInstructions}</p>
            <p><strong>Pagrindiniai ingredientai:</strong></p>
            <ul>
                ${getIngredients(drink).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width:200px;">
            <hr>
        `;
    });
}

// Funkcija, kuri surenka ingredientus ir jų kiekį iš gėrimo objekto
function getIngredients(drink) {
    const ingredients = [];

    // Iteruojame per ingredientus su Object.entries()
    for (const [key, value] of Object.entries(drink)) {
        if (key.startsWith("strIngredient") && value) {
            const index = key.replace("strIngredient", "");
            const measure = drink[`strMeasure${index}`] || "";
            ingredients.push(`${value} - ${measure}`);
        }
    }
    return ingredients;
}

// Funkcija, kuri atlieka asinchroninę užklausą ir iškviečia kitas funkcijas
function fetchCocktailData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
        .then(response => {
            if (!response.ok) {
                console.log("Nepavyko užkrauti duomenų. Statusas: " + response.status);
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.drinks && data.drinks.length > 0) {
                displayCocktailInfo(data.drinks);
            } else {
                console.log("Nerasta gėrimų duomenų.");
            }
        })
        .catch(error => console.error("Klaida gaunant duomenis:", error));
}

// Kviečiame funkciją gauti ir atspausdinti gėrimų informaciją
fetchCocktailData();