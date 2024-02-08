// Variáveis do Jogo
var heroHP = 200;
var heroLevel = 1;
var heroXP = 0;
var heroGold = 0;
var monsterHP = 100;
var xpPerAttack = 25;
var xpToLevelUp = 100;
var monstersDefeated = 0;
var potionsInInventory = 2; // Defina a quantidade inicial de poções no inventário
var maxPotionsAllowed = 10; // Defina o número máximo de poções permitidas

// ... (código anterior)

// Função para adicionar itens ao inventário
function addToInventory(item) {
    var inventoryElement = document.getElementById("inventory");

    if (inventoryElement) {
        var newItem = document.createElement("div");
        newItem.className = "item";
        newItem.textContent = item;

        // Adiciona um botão para usar a poção
        var useButton = document.createElement("button");
        useButton.textContent = "Usar";
        useButton.onclick = function () {
            usePotion(); // Chama a função de usar poção ao clicar no botão
        };

        newItem.appendChild(useButton);

        inventoryElement.appendChild(newItem);
    }
}

// ... (código anterior)

// Função para usar poções
function usePotion() {
    if (potionsInInventory > 0) {
        // Limita o HP máximo para 200
        heroHP = Math.min(heroHP + 50, 200);
        potionsInInventory--;

        // Atualiza as informações do herói na tela
        updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);
        updateInventory(); // Atualiza a exibição do inventário

        alert("Você usou uma poção e recuperou 50 HP!");
    } else {
        alert("Você não tem mais poções no inventário.");
    }
}

// Função para subir de nível do Herói
function levelUp() {
    heroLevel++;
    heroXP = 0;
    xpToLevelUp += 150; // Ajuste o valor para a quantidade necessária de XP para o próximo nível
    xpPerAttack += 2;

    // Ganha uma quantidade aleatória de HP entre 1 e 100
    var hpGained = Math.floor(Math.random() * 100) + 1;
    heroHP = Math.min(heroHP + hpGained, 200); // Limita o HP máximo para 200

    // Atualiza as informações do herói na tela
    updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);
    alert("Parabéns! Você subiu para o nível " + heroLevel + "!");
}

// Função para comprar poções na loja
function buyPotion() {
    if (heroGold >= 50 && potionsInInventory < maxPotionsAllowed) {
        heroGold -= 50;
        potionsInInventory++;

        // Adiciona uma poção ao inventário
        addToInventory("Potion");

        updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);
        alert("Você comprou uma poção!");
    } else if (potionsInInventory >= maxPotionsAllowed) {
        alert("Você já atingiu o limite máximo de poções no inventário.");
    } else {
        alert("Você não tem ouro suficiente para comprar uma poção.");
    }
}

// ... (restante do código)


// Função para atualizar a exibição do inventário
function updateInventory() {
    var inventoryElement = document.getElementById("inventory");

    if (inventoryElement) {
        // Limpa o inventário antes de atualizar
        inventoryElement.innerHTML = "<h2>Inventário</h2>";

        // Adiciona novamente os itens ao inventário após a atualização
        for (var i = 0; i < potionsInInventory; i++) {
            addToInventory("Potion");
        }
    }
}

// Função para comprar poções na loja
function buyPotion() {
    if (heroGold >= 50 && potionsInInventory < maxPotionsAllowed) {
        heroGold -= 50;
        potionsInInventory++;

        // Adiciona uma poção ao inventário
        addToInventory("Potion");

        updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);
        alert("Você comprou uma poção!");
    } else if (potionsInInventory >= maxPotionsAllowed) {
        alert("Você já atingiu o limite máximo de poções no inventário.");
    } else {
        alert("Você não tem ouro suficiente para comprar uma poção.");
    }
}

// ... (restante do código)


// ... (restante do código, incluindo funções como heroAttack, monsterAttack, etc.)

// Função de Ataque do Herói
function heroAttack() {
    var damage = Math.floor(Math.random() * (30 + heroLevel)) + 1;
    monsterHP -= damage;
    
    updateCharacter("monster", monsterHP);

    if (monsterHP <= 0) {
        victory();
    } else {
        monsterAttack();
    }
}

// Função de Ataque do Monstro
function monsterAttack() {
    var damage = Math.floor(Math.random() * (10 + monstersDefeated)) + 1;
    heroHP -= damage;

    updateCharacter("hero", heroHP);

    if (heroHP <= 0) {
        gameOver();
    }
}

// Função de Vitória do Herói
function victory() {
    monstersDefeated++;

    if (monstersDefeated % 3 === 0) {
        monsterHP += Math.round(monsterHP * 0.1);
        alert("O monstro ficou mais forte!");
    }

    heroXP += xpPerAttack;
    heroGold += 30;

    updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);

    if (heroXP >= xpToLevelUp) {
        levelUp();
    } else {
        resetMonster();
    }
}

// Função de Subir de Nível do Herói
function levelUp() {
    heroLevel++;
    heroXP = 0;
    xpToLevelUp += 150;
    xpPerAttack += 2;

    updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);
    alert("Parabéns! Você subiu para o nível " + heroLevel + "!");
}

// Função de Derrota do Monstro
function gameOver() {
    alert("Você foi derrotado pelo monstro. Game over!");
    resetBattle();
}

// Função de Reiniciar a Batalha
function resetBattle() {
    heroHP = 200;
    heroLevel = 1;
    heroXP = 0;
    heroGold = 0;
    monstersDefeated = 0;

    updateCharacter("hero", heroHP, heroLevel, heroXP, heroGold);
    resetMonster();
}

// Função de Reiniciar o Monstro
function resetMonster() {
    monsterHP = 100;

    updateCharacter("monster", monsterHP);
}

// Função de Atualização dos Personagens na Tela
function updateCharacter(character, hp, level, xp, gold) {
    var hpElement = document.getElementById(character + "HP");
    var levelElement = document.getElementById(character + "Level");
    var xpElement = document.getElementById(character + "XP");
    var goldElement = document.getElementById(character + "Gold");

    if (hpElement) {
        hpElement.textContent = hp + " HP";
    }
    if (levelElement) {
        levelElement.textContent = "Nível " + level;
    }
    if (xpElement) {
        xpElement.textContent = xp + " XP";
    }
    if (goldElement) {
        goldElement.textContent = gold + " Ouro";
    }
}
