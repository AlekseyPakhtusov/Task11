'use strict';
// window.addEventListener('load'); //когда загрузится вся страница

//когда загрузится структура страницы
window.addEventListener('DOMContentLoaded', function() {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    // скрыть все tabContent начиная с индекса "a"
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }   
    
    //скрыть все tabContent, начиная со второго
    hideTabContent(1);

    //Отобразить определённый tabContent с индексом "b"
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    //обработка клика, скрытие всех tabContent и отображение одного tabContent согласно even
    info.addEventListener('click', function(even) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // timer
    let deadline = '2019-09-01';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),        
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = ("0" + t.minutes).slice(-2);
            seconds.textContent = ("0" + t.seconds).slice(-2);            

            if (t.total <= 0) {
                clearInterval(timeInterval);
                
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00"; 
            }
        }
    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // 1) Написать функцию вызова модального окна
    function showModalWindow(t) {
        overlay.style.display = 'block';
        t.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    // 2) Привязать модальное окно к кнопкам “Узнать подробнее” в табах. Код не должен дублироваться.
    let descriptionBtn = document.querySelectorAll('.description-btn');

    for (let desc of descriptionBtn) {
        desc.addEventListener('click', function () {
            showModalWindow(this);
        });
    };

}); 

