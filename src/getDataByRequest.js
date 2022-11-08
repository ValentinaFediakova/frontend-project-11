import axios from 'axios';

const data = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Новые уроки на Хекслете</title>
    <description>Практические уроки по программированию</description>
    <link>https://ru.hexlet.io/</link>
    <webMaster>info@hexlet.io</webMaster>
    <item>
      <title>Введение / Ruby: Реальный Rails</title>
      <guid isPermaLink="false">3212</guid>
      <link>https://ru.hexlet.io/courses/rails-real/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Mon, 07 Nov 2022 16:51:54 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Основы разработки на Ruby on Rails</title>
      <guid isPermaLink="false">3211</guid>
      <link>https://ru.hexlet.io/courses/rails-basics/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Mon, 07 Nov 2022 16:51:05 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Основы Ruby</title>
      <guid isPermaLink="false">3209</guid>
      <link>https://ru.hexlet.io/courses/ruby-basics/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Mon, 07 Nov 2022 16:48:15 +0500</pubDate>
    </item>
    <item>
      <title>Применение математических и статистических функций / Python: Numpy массивы</title>
      <guid isPermaLink="false">3166</guid>
      <link>https://ru.hexlet.io/courses/python-numpy/lessons/math-stat-func/theory_unit</link>
      <description>Цель: Научиться применять математические и статистические функции Numpy для решения прикладных задач</description>
      <pubDate>Mon, 07 Nov 2022 11:49:20 +0500</pubDate>
    </item>
    <item>
      <title>Работа с моделями / Python: Разработка на фреймворке Django</title>
      <guid isPermaLink="false">1731</guid>
      <link>https://ru.hexlet.io/courses/python-django-basics/lessons/models/theory_unit</link>
      <description>Цель: Научиться работать с моделью в консоли.</description>
      <pubDate>Fri, 04 Nov 2022 17:43:09 +0500</pubDate>
    </item>
    <item>
      <title>Django ORM / Python: Разработка на фреймворке Django</title>
      <guid isPermaLink="false">3208</guid>
      <link>https://ru.hexlet.io/courses/python-django-basics/lessons/django-orm/theory_unit</link>
      <description>Цель: Познакомиться с миграциями и моделями.</description>
      <pubDate>Fri, 04 Nov 2022 17:43:09 +0500</pubDate>
    </item>
    <item>
      <title>Наследование шаблонов (Extends) / Python: Разработка на фреймворке Django</title>
      <guid isPermaLink="false">3193</guid>
      <link>https://ru.hexlet.io/courses/python-django-basics/lessons/templates-extends/theory_unit</link>
      <description>Цель: Научиться, наследованию шаблонов в Django.</description>
      <pubDate>Wed, 02 Nov 2022 19:59:10 +0500</pubDate>
    </item>
    <item>
      <title>Жизненный цикл ПО и этап тестирования / Жизненный цикл ПО</title>
      <guid isPermaLink="false">3138</guid>
      <link>https://ru.hexlet.io/courses/software-lifecycle/lessons/waterfall/theory_unit</link>
      <description>Цель: Познакомиться с жизненным циклом ПО, его различными моделями</description>
      <pubDate>Tue, 01 Nov 2022 22:17:19 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Жизненный цикл ПО</title>
      <guid isPermaLink="false">3137</guid>
      <link>https://ru.hexlet.io/courses/software-lifecycle/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Tue, 01 Nov 2022 22:17:19 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Java: Продвинутое использование</title>
      <guid isPermaLink="false">3185</guid>
      <link>https://ru.hexlet.io/courses/java-advanced/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Tue, 01 Nov 2022 19:13:47 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Java: Корпоративные приложения на Spring Boot</title>
      <guid isPermaLink="false">3187</guid>
      <link>https://ru.hexlet.io/courses/java-spring/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Tue, 01 Nov 2022 19:12:56 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Java: Веб-технологии</title>
      <guid isPermaLink="false">3189</guid>
      <link>https://ru.hexlet.io/courses/java-web/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Tue, 01 Nov 2022 19:12:19 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Java: Коллекции</title>
      <guid isPermaLink="false">3186</guid>
      <link>https://ru.hexlet.io/courses/java-collections/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Tue, 01 Nov 2022 19:11:42 +0500</pubDate>
    </item>
    <item>
      <title>Введение / Java: Основы ООП</title>
      <guid isPermaLink="false">3188</guid>
      <link>https://ru.hexlet.io/courses/java-oop/lessons/intro/theory_unit</link>
      <description>Цель: Познакомиться с курсом</description>
      <pubDate>Tue, 01 Nov 2022 19:10:42 +0500</pubDate>
    </item>
  </channel>
</rss>`

export const getRssData = (url) => {
  return data;

  // const a = axios(url, {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json',
  //   },
  //   withCredentials: true,
  //   credentials: 'same-origin',
  // }).then((response) => {
  //   // console.log('response', response);
  //   return response;
  // })
    // .catch((error) => {
    //   // console.log('error', error);
    // });

  // return a
};

// export default getRssData;





// import { getRssData } from './getDataByRequest.js';

// // console.log(`@@@ getRssData('https://ru.hexlet.io/lessons.rss')`, getRssData('https://ru.hexlet.io/lessons.rss'))

// const splitData = (data) => {
//   const state = {};

//   const parsData = parse(data);
//   console.log('parsData', parsData)
// }

// const rssData = getRssData('https://ru.hexlet.io/lessons.rss');
// splitData(rssData);
