/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        // Проверяем наличие текста в инпуте. Если пустая строка - submit не сработает.
        if (newFilm) {
            // Если название фильма более 21 символа, обрезаем и ставим "..."
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            // Выводить сообщение об успешном добавлении фильма в избранное, если стоит галочка
            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            // Добавляем новый фильм в базу данных
            movieDB.movies.push(newFilm);
            // Формирование нумерованного списка фильмов на странице на основании данных из этого JS файла, отсортированных по алфавиту 
            sortArr(movieDB.movies);
            // Строим заново обновленный список фильмов
            createMovieList(movieDB.movies, movieList);
            // Очищаем форму
        }

        event.target.reset();
    });
    
    // Удаление рекламного блока в правой части страницы
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        // Изменение жанра фильма с "комедия" на "драма"
        genre.textContent = 'драма';
        
        // Изменение заднего фона постера с фильмом на изображение "bg.jpg".
        poster.style.backgroundImage = 'url("./img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        // Удаление первоначального списка фильмов
        parent.innerHTML = "";
        sortArr(films);
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        // Получаем по классу все корзины для удаления фильма из списка
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                // Удаляем родительский элемент корзины и она удалится вместе с ним
                btn.parentElement.remove();
                // Удаляем i-ый фильм из нашей базы фильмов
                movieDB.movies.splice(i, 1);

               // Пересобираем нумерацию фильмов на сайте посредством рекурсии после удаления определенного их количества
               createMovieList(films, parent); 
            });
        });

    };

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});