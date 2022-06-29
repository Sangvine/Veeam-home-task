# Veeam-home-task

## Практическое задание

Исходники - в этом репозитории. Live demo - https://sangvine.github.io/Veeam-home-task/

## Вопросы по Javascript

###### 1. Что выведет консоль? Аргументируйте свой ответ.

```
(function() {
f();
f = function() {
console.log(1);
}
})()
function f() {
console.log(2)
}
f();
```

Выведет сначала 2, затем 1.
Объявление функции "всплывает" наверх контекста. Когда мы заходим в анонимную функцию, то вызовется значение из области выше, выведет 2, а затем переопределит переменную f, которая при повторном вызове выдаст уже 1.

###### 2. Что выведет консоль? Аргументируйте свой ответ.

```
const obj = {
name: 'John',
getName() {
return this.name;
}
};



const name1 = obj.getName();
const getName = obj.getName;
const name2 = getName();
console.log(`${name1} ${name2}`); // ?
```

Выведет только 'John '. При объявлении name2 контекст функции теряется.

###### 3. Создайте метод у объекта String, который многократно повторяет строку (не используя метод.repeat()).
```
console.log('hello'. customRepeat(3)); // “hellohellohello”
```

Решение:

```
String.prototype.customRepeat = function(count) {
    let result = '';
    for (let i = 0; i < count; i++) result += this;
    return result;
}
```

###### 4. Есть список элементов button, на которые навешен обработчик события ‘click’
Что попадет в консоль, если пользователь нажмет первую и последнюю кнопку в списке?
Аргументируйте свой ответ.
```
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
nodes[i].addEventListener('click', function() {
console.log('You clicked element ' + i);
});
}
```

Значение в nodes.length. Из-за функциональной, а не блочной видимости, каждый раз будет браться одна и та же i, достигшая nodes.length


###### 5. Что выведет в консоль следующий код? Аргументируйте свой ответ.
```
function printme() {
console.log(1);
setTimeout(function() { console.log(2); }, 1000);
setTimeout(function() { console.log(3); }, 0);
console.log(4);
}
printme();
```

1
4
3
2

Сначала отрабатывает таска 1, затем в очередь ставятся два таймаута, выводится 4, выполняется таска 3 с задержкой 0, затем через секунду выводится 2.

###### 6. Напишите функцию isPalindrome(str), которая проверяет, является ли строка палиндромом
console.log(isPalindrome('asdsa')) // true

```
function isPalindrom(str) {
    return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
}
```

###### 7. Напишите функцию, складывающую 2 числа, которую можно вызывать следующим образом:
```
console.log(sum(2,3)); // 5
console.log(sum(2)(3)); // 5
```

```
function sum(a, b) {
    if (b !== undefined) return a + b;
    else return function(b) {
        return a + b;
    }
}
```

###### 8. Поменяйте местами значения целочисленных переменных, не используя временные переменные.
Первый вариант - используя ES6, и второй вариант – используя ES5.
```
var a = 1;
var b = 2;
// b = 1;
// a = 2;
```

```
a = a + b;
b = a - b;
a = a - b;
```

###### 9. Напишите функцию, проверяющую число на четность, используя только битовые операции

```
function bitwiseIsEven(num) {
    return !(num & 1);
}
```
