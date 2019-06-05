export default {
  state: {
    guideStep: 0,
    guideLanguages: [
      {
        id: "en",
        label: "English"
      },
      {
        id: "ua",
        label: "Українська"
      },
      {
        id: "ru",
        label: "Русский"
      }
    ],
    currentGuideLanguage: "en",
    guideTexts: [
      {
        ru: `
        <h3>Начало</h3>
        <p>Добро пожаловать в Simpledrawing. Simpledrawing - это приложение для черчения, созданное энтузиастом для улучшения навыков программирования и пополнения портфолио. Проект не используется в коммерческих целях.<br><br>
        Ссылка на GitHub репозиторий: <a href="https://github.com/timur-svoboda/simpledrawing">https://github.com/timur-svoboda/simpledrawing</a><br>
        Связаться с автором по вопросам связанным с проектом: simpledrawing.qna@gmail.com<br><br>
        Вы можете пройти руководство по приложению для того, чтобы освоить его или же пропустить руководство, если вы уже знакомы с приложением.
        </p>
        `,
        en: `
        <h3>Start</h3>
        <p>Welcome to Simpledrawing. Simpledrawing is an app for drafting, which was created by an enthusiast to improve programming skills and to add a project to his portfolio. The project is not used for commercial purposes.<br><br>
        Link to GitHub repository: <a href="https://github.com/timur-svoboda/simpledrawing">https://github.com/timur-svoboda/simpledrawing</a><br>
        Contact the author for questions related to the project: simpledrawing.qna@gmail.com<br><br>
        You can go through an interactive guide to the app in order to master it or skip it if you are already familiar with the app.
        </p>
        `,
        ua: `
        <h3>Початок</h3>
        <p>Ласкаво просимо в Simpledrawing. Simpledrawing - це додаток для креслення, створений ентузіастом для поліпшення навичок програмування і поповнення портфоліо. Проект не використовується в комерційних цілях.<br><br>
        Посилання на GitHub-репозиторій: <a href="https://github.com/timur-svoboda/simpledrawing">https://github.com/timur-svoboda/simpledrawing</a><br>
        Зв'язатися з автором з питань, пов'язаних з проектом: simpledrawing.qna@gmail.com<br><br>
        Ви можете пройти посібник по додатку для того, щоб його освоїти або пропустити посібник, якщо ви вже знайомі з додатком.
        </p>
        `
      },
      {
        ru: `
        <h3>Первый шаг: Выбрать инструмент Rails.</h3>
        <p>Rails - это инструмент для создания вспомогательных прямых. На пересечении этих прямых создаются точки привязки. Чтобы выбрать инструмент Rails,</p>
        <ul>
          <li>зажмите правую кнопку мыши(далее ПКМ) в любом месте холста;</li>
          <li>наведите мышку на сектор “#” появившегося радиального меню и отпустите ПКМ.</li>
        </ul>
        `,
        en: `
        <h3>First step: Select the Rails tool.</h3>
        <p>Rails is a tool for creating helper lines. Anchor points are created at the intersection of these lines. To select the Rails tool, you should</p>
        <ul>
          <li>hold down the right mouse button(RMB) anywhere on the canvas;</li>
          <li>move the mouse on the “#” sector of the appeared radial menu and release the RMB.</li>
        </ul>
        `,
        ua: `
        <h3>Перший крок: Вибрати інструмент Rails.</h3>
        <p>Rails - це інструмент для створення допоміжних прямих. На перетині цих прямих створюються точки прив'язки. Щоб вибрати інструмент Rails,</p>
        <ul>
          <li>затисніть праву кнопку миші (далі ПКМ) в будь-якому місці полотна;</li>
          <li>наведіть мишку на сектор "#" з'явився радіального меню і відпустіть ПКМ.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Второй шаг: Нарисовать вертикальную прямую.</h3>
        <p>Чтобы нарисовать вертикальную прямую, кликните в любом месте холста.</p>
        `,
        en: `
        <h3>Second step: Draw a vertical rail.</h3>
        <p>To draw a vertical rail, left click anywhere on the canvas.</p>
        `,
        ua: `
        <h3>Другий крок: Намалювати вертикальну пряму.</h3>
        <p>Щоб намалювати вертикальну пряму, клікніть в будь-якому місці полотна</p>
        `
      },
      {
        ru: `
        <h3>Третий шаг: Нарисовать горизонтальную прямую.</h3>
        <p>Чтобы нарисовать горизонтальную прямую,</p>
        <ul>
          <li>нажмите на выпадающее меню вверху, на панеле инструмента и измените тип инструмента на Horizontal rail;</li>
          <li>нажмите левую кнопку мыши(далее ЛКМ) в любом месте холста.</li>
        </ul>
        `,
        en: `
        <h3>Third step: Draw a horizontal rail.</h3>
        <p>To draw a horizontal rail, you should</p>
        <ul>
          <li>click on the drop-down menu on the top, on the toolbar and change the tool type to Horizontal rail;</li>
          <li>left click anywhere on the canvas.</li>
        </ul>
        `,
        ua: `
        <h3>Третій крок: Намалювати горизонтальну пряму.</h3>
        <p>Щоб намалювати горизонтальну пряму,</p>
        <ul>
          <li>натисніть на меню, що випадає вгорі, на панель інструменту і змініть тип інструменту на Horizontal rail;</li>
          <li>натисніть ліву кнопку миші (далі ЛКМ) в будь-якому місці полотна.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Четвёртый шаг: Нарисовать параллельную прямую.</h3>
        <p>Чтобы нарисовать параллельную прямую,</p>
        <ul>
          <li>нажмите на выпадающее меню вверху, на панеле инструмента и измените тип инструмента на Parallel rail;</li>
          <li>кликните ЛКМ на область возле любой прямой;</li>
          <li>отведите курсор на произвольное расстояние от выделенной прямой и нажмите ЛКМ.</li>
        </ul>
        `,
        en: `
        <h3>Fourth step: Draw a parallel rail.</h3>
        <p>To draw a parallel rail, you should</p>
        <ul>
          <li>click on the drop-down menu on the top, on the toolbar and change the tool type to Parallel rail;</li>
          <li>left click on the area near any rail;</li>
          <li>move the cursor to an arbitrary distance from the highlighted rail and click the left mouse button(LMB).</li>
        </ul>
        `,
        ua: `
        <h3>Четвертий крок: Намалювати паралельну пряму.</h3>
        <p>Щоб намалювати паралельну пряму,</p>
        <ul>
          <li>натисніть на меню, що випадає вгорі, на панель інструменту і змініть тип інструменту на Parallel rail;</li>
          <li>клікніть ЛКМ на область біля будь-якої прямої;</li>
          <li>відведіть курсор на довільну відстань від виділеної прямої і натисніть ЛКМ.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Пятый шаг: Нарисовать симметричные прямые.</h3>
        <p>Чтобы нарисовать симметричные прямые,</p>
        <ul>
          <li>нажмите на выпадающее меню вверху, на панель инструмента и измените тип инструмента на Symmetrical rail;</li>
          <li>кликните ЛКМ на область возле любой прямой;</li>
          <li>отведите курсор на произвольное расстояние от выделенной прямой и нажмите ЛКМ.</li>
        </ul>
        `,
        en: `
        <h3>Fifth step: Draw symmetrical rails.</h3>
        <p>To draw symmetrical rails, you should</p>
        <ul>
          <li>click on the drop-down menu on the top, on the toolbar and change the tool type to Symmetrical rail;</li>
          <li>left click on the area near any rail;</li>
          <li>move the cursor to an arbitrary distance from the highlighted rail and click the LMB.</li>
        </ul>
        `,
        ua: `
        <h3>П'ятий крок: Намалювати симетричні прямі.</h3>
        <p>Щоб намалювати симетричні прямі,</p>
        <ul>
          <li>натисніть на меню, що випадає вгорі, на панель інструменту і змініть тип інструменту на Symmetrical rail;</li>
          <li>клікніть ЛКМ на область біля будь-якої прямої;</li>
          <li>відведіть курсор на довільну відстань від виділеної прямої і натисніть ЛКМ.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Шестой шаг: Нарисовать отрезок.</h3>
        <p>Чтобы нарисовать отрезок,</p>
        <ul>
          <li>выберите инструмент Line;</li>
          <li>нажмите ЛКМ на пересечении прямых;</li>
          <li>отведите курсор до другого пересечения прямых и нажмите ЛКМ.</li>
        </ul>
        `,
        en: `
        <h3>Sixth step: Draw a line.</h3>
        <p>To draw a line, you should</p>
        <ul>
          <li>select the Line tool;</li>
          <li>left click at the intersection of rails;</li>
          <li>move the mouse to another intersection of rails and click LMB.</li>
        </ul>
        `,
        ua: `
        <h3>Шостий крок: Намалювати відрізок.</h3>
        <p>Щоб намалювати відрізок,</p>
        <ul>
          <li>виберіть інструмент Line;</li>
          <li>натисніть ЛКМ на перетині прямих;</li>
          <li>відведіть курсор до іншого перетину прямих і натисніть ЛКМ.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Седьмой шаг: Нарисовать окружность.</h3>
        <p>Чтобы нарисовать окружность,</p>
        <ul>
          <li>выберите инструмент Arc;</li>
          <li>нажмите ЛКМ на пересечении прямых;</li>
          <li>отведите курсор до другого пересечения прямых и нажмите ЛКМ.</li>
        </ul>
        `,
        en: `
        <h3>Seventh Step: Draw a circle.</h3>
        <p>To draw a circle, you should</p>
        <ul>
          <li>select the Arc tool;</li>
          <li>left click at the intersection of rails;</li>
          <li>move the mouse to another intersection of rails and click LMB.</li>
        </ul>
        `,
        ua: `
        <h3>Сьомий крок: Намалювати коло.</h3>
        <p>Щоб намалювати коло,</p>
        <ul>
          <li>виберіть інструмент Arc;</li>
          <li>натисніть ЛКМ на перетині прямих;</li>
          <li>відведіть курсор до іншого перетину прямих і натисніть ЛКМ.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Восьмой шаг: Нарисовать дугу.</h3>
        <p>Чтобы нарисовать дугу,</p>
        <ul>
          <li>измените тип инструмента на Circular Arc;</li>
          <li>нажмите ЛКМ на пересечении прямых;</li>
          <li>отведите курсор до другого пересечения прямых и нажмите ЛКМ;</li>
          <li>водите курсором вокруг окружности, чтобы выбрать подходящую дугу, после чего нажмите ЛКМ.</li>
        </ul>
        `,
        en: `
        <h3>Eighth step: Draw an arc.</h3>
        <p>To draw an arc, you should</p>
        <ul>
          <li>change tool type to Circular Arc;</li>
          <li>left click at the intersection of rails;</li>
          <li>move the mouse to another intersection of rails and click LMB;</li>
          <li>move the cursor around the circle to select the appropriate arc, then press the LMB.</li>
        </ul>
        `,
        ua: `
        <h3>Восьмий крок: Намалювати дугу.</h3>
        <p>Щоб намалювати дугу,</p>
        <ul>
          <li>змініть тип інструменту на Circular Arc;</li>
          <li>натисніть ЛКМ на перетині прямих;</li>
          <li>відведіть курсор до іншого перетину прямих і натисніть ЛКМ;</li>
          <li>водите курсором навколо кола, щоб вибрати відповідну дугу, після чого натисніть ЛКМ.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Девятый шаг: Выделить и удалить объект.</h3>
        <p>Чтобы выделить объект,</p>
        <ul>
          <li>выберите инструмент Selection;</li>
          <li>нажмите ЛКМ на область рядом с любым объектом;</li>
          <li>попробуйте выделить другой объект;</li>
          <li>нажмите клавишу Del, чтобы удалить выделеный объект.</li>
        </ul>
        `,
        en: `
        <h3>Step Nine: Select and delete an object.</h3>
        <p>To select an object, you should</p>
        <ul>
          <li>select the Selection tool;</li>
          <li>left click on the area next to any object;</li>
          <li>try to select another object;</li>
          <li>press the Del key to delete the selected object.</li>
        </ul>
        `,
        ua: `
        <h3>Дев'ятий крок: Виділити і видалити об'єкт.</h3>
        <p>Щоб виділити об'єкт,</p>
        <ul>
          <li>виберіть інструмент Selection;</li>
          <li>натисніть ЛКМ на область поряд з будь-яким об'єктом;</li>
          <li>спробуйте виділити інший об'єкт;</li>
          <li>натисніть клавішу Del, щоб видалити виділений об'єкт.</li>
        </ul>
        `
      },
      {
        ru: `
        <h3>Десятый шаг: Продвинутое выделение.</h3>
        <p>Чтобы выделить несколько объектов, зажмите клавишу Ctrl.<br>
        Чтобы выделить все объекты, зажмите сочетание клавиш Ctrl+A.</p>
        `,
        en: `
        <h3>Tenth step: Advanced selection.</h3>
        <p>To select multiple objects, hold down the Ctrl key.<br>
        To select all objects, hold down the keyboard shortcut Ctrl + A.</p>
        `,
        ua: `
        <h3>Десятий крок: Просунуте виділення.</h3>
        <p>Щоб виділити кілька об'єктів, затисніть клавішу Ctrl.<br>
        Щоб виділити всі об'єкти, затисніть поєднання клавіш Ctrl + A.</p>
        `
      },
      {
        ru: `<h3>Вы готови приступить к черчению?</h3>`,
        en: `<h3>Are you ready to start drafting?</h3>`,
        ua: `<h3>Ви готові приступити до креслення?</h3>`
      }
    ]
  },
  getters: {
    getGuideTexts(state) {
      return state.guideTexts;
    },
    getGuideStep(state) {
      return state.guideStep;
    },
    getGuideLanguages(state) {
      return state.guideLanguages;
    },
    getCurrentGuideLanguage(state) {
      return state.currentGuideLanguage;
    }
  },
  mutations: {
    setGuideStep(state, payload) {
      state.guideStep = payload;
    },
    setCurrentGuideLanguage(state, payload) {
      state.currentGuideLanguage = payload;
    }
  }
};
