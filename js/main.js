// Объект, хранящий данные о персонаже.
let character = {
    characterName: '',
    characterAge: 0,
    characterGender: '',
    characterRace: '',
    characterClass: '',
    stat_1: 0,
    stat_2: 0,
    stat_3: 0,
    stat_4: 0,
    quenta: ''
}

let count = 0;
let timeoutValue = 5;
function tick() { //передаёт на кнопку отсчёт, после окончания отсчёта возвращает параметры к исходным и снимает блок с кнопки
    let timer = document.getElementById('get-character');
    timer.innerHTML = timeoutValue--;
    if (timeoutValue < 0) {
        count = 0;
        clearInterval(interval_id);
        timer.innerHTML = document.getElementById('get-character').value;
        timeoutValue = 5;
        document.getElementById('get-character').disabled = false;
    }
}

// Функция на клик кнопки "Создать персонажа". Передаёт данные в объект, а если сумма параметров больше 25 - выводит предупреждение
// и скидывает параметры до 1.
function get_character() {
    character[0] = document.getElementById('character-name').value;
    character[1] = document.getElementById('character-age').value;
    character[2] = document.querySelector('input[name="gender"]:checked').value;
    character[3] = document.querySelector('#characters-races').value;
    character[4] = document.querySelector('#characters-class').value;
    character[5] = +document.getElementById('stat1').value;
    character[6] = +document.getElementById('stat2').value;
    character[7] = +document.getElementById('stat3').value;
    character[8] = +document.getElementById('stat4').value;
    character[9] = document.getElementById('quenta').value;

    for (let k = 0; k < 9; k++) { //требует заполнить всю информацию о персонаже (кроме поля "История персонажа")
        if (character[k] == '' || character[k] <= 0) {
            alert ("Пожалуйста, заполните информацию о персонаже.");
            break;
        }
        if ((character[5] + character[6] + character[7] + character[8]) > 25) {
            count++;
            if (count == 3) { //Запускает отсчёт, выводит предупреждение, блокирует кнопку до окончания отсчёта
                alert ('Даём вам немного времени, чтобы осмыслить значение фразы "Максимальное общее значение параметров: 25!"');
                document.getElementById('get-character').disabled = true;
                interval_id = setInterval(tick, 1000);
            }
            alert ("Максимальное общее значение параметров: 25!");
            for (let i = 5; i < 9; i++) {
                character [i] = 1;
            }
            stat1.value = character [5];
            stat2.value = character [6];
            stat3.value = character [7];
            stat4.value = character [8];
            statSum();
        }
    }
}

// Функция, генерирующая раддомные параметры от 1 до 10. В сумме не менее 20 и не более 25. Кроме этого передаёт значение в окно общей суммы параметров
// и устанавливает значение ползунков на сгенерированное число
function random_stats() {
    do {
        for (let i = 5; i < 9; i++) {
            character [i] = Math.floor(Math.random() * 10) + 1;
        }
    } while ((character[5] + character[6] + character[7] + character[8]) > 25 || (character[5] + character[6] + character[7] + character[8]) < 20);
    stats_sum.innerHTML = (character[5] + character[6] + character[7] + character[8]);
        stat1.value = character [5];
        stat2.value = character [6];
        stat3.value = character [7];
        stat4.value = character [8];
}

// Функция, передающая сумму параметров в соответствующее окно. По идее копирует строчку из функции выше, но если просто засунуть туда вызов функции,
// то появляется пара интересных багов. parseInt для того, чтобы перевести значание range в число. Изначально оно строчное. Привязана к range oninput,
// которое передаёт значение в процессе перемещения ползунка.
function statSum() {
    stats_sum.innerHTML = (parseInt(stat1.value) + parseInt(stat2.value) + parseInt(stat3.value) + parseInt(stat4.value));
}

// Функция на клик кнопки "Посмотреть персонажа". Показывает в окне alert информацию о созданном персонаже.
function show_character() {
    for (let i = 0; i < 9; i++) {
        if (character[i] == undefined || character[i] == '' || character[i] <= 0) { //не даёт посмотреть персонажа, пока не создан
            alert ("Сначала создайте персонажа.");
            break;
        } else if (character[i] != undefined) {
            alert (` Имя: ${character[0]} \n Возраст: ${character[1]} \n Пол: ${character[2]} \n Раса: ${character[3]} \n Класс: ${character[4]} \n
 Сила: ${character[5]} \n Ловкость: ${character[6]} \n Выносливость: ${character[7]} \n Интеллект: ${character[8]} \n
 Краткая история: \n ${character[9]}`);
 break;
        }
    }
}

//Здесь реализовал экранирование символов и цифр в поле ввода имени персонажа через регулярные выражения. Пока использую только простые шаблоны,
//специальные символы в регулярных выражениях ещё сложноваты для понимания.
let nameReplace = document.querySelector('#character-name');
let reg = /[!@#$%^&*()_+={[}|/><.,1234567890№?'";:`\\\]~]/g;
nameReplace.oninput = function() {
    this.value = this.value.replace(reg, '');
}