export default {
  state: {
    guideStep: 0,
    guideLanguages: [
      {
        id: "en",
        label: "English"
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
        Ссылка на github-репозиторий: <a href="https://github.com/timur-svoboda/simpledrawing">https://github.com/timur-svoboda/simpledrawing</a><br>
        Связаться с автором по вопросам связанным с проектом: simpledrawing.qna@gmail.com<br><br>
        Вы можете пройти интерактивное руководство по редактору для того, чтобы освоить его или же пропустить руководство, если вы уже знакомы с редактором.
        </p>
        `,
        en: `
        <h3>Start</h3>
        <p>Welcome to Simpledrawing. Simpledrawing is an app for drafting, which was created by an enthusiast to improve programming skills and to add a project to his portfolio. The project is not used for commercial purposes.<br><br>
        Link to GitHub repository: <a href="https://github.com/timur-svoboda/simpledrawing">https://github.com/timur-svoboda/simpledrawing</a><br>
        Contact the author for questions related to the project: simpledrawing.qna@gmail.com<br><br>
        You can go through an interactive guide to the editor in order to master it or skip it if you are already familiar with the editor.
        </p>
        `
      },
      {
        ru: `
        <h3>Первый шаг: Выбрать инструмент Rails.</h3>
        <p>Rails - это инструмент для создания вспомогательных прямых. На пересечении этих прямых создаются точки привязки. Чтобы выбрать инструмент Rails,</p>
        <ul>
          <li>зажмите правую кнопку мыши(далее ПКМ) в любом месте холста;</li>
          <li>наведите мыши на сектор “#” появившегося радиального меню и отпустите ПКМ.</li>
        </ul>
        `,
        en: `
        <h3>First step: Select the Rails tool.</h3>
        <p>Rails is a tool for creating helper lines. Anchor points are created at the intersection of these lines. To select the Rails tool, you should</p>
        <ul>
          <li>hold down the right mouse button(RMB) anywhere on the canvas;</li>
          <li>move the mouse on the “#” sector of the appeared radial menu and release the RMB.</li>
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
        `
      },
      {
        ru: `<h3>Вы готови приступить к черчению</h3>`,
        en: `<h3>You're ready to start drafting</h3>`
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
